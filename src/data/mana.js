import { MANA_ORIGIN, MANA_STUDIO_ID } from '../utils/booking';

const API = `${MANA_ORIGIN}/api/v1/studios/${MANA_STUDIO_ID}`;
const paginated = new Set(['class-credit-bundles', 'classes']);

// Public GET endpoints only. Never attach credentials or an Authorization header.
async function read(path, locale, params = {}) {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API}${path ? `/${path}` : ''}?${query}`, {
    headers: { Accept: 'application/json', 'Accept-Language': locale },
    credentials: 'omit',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Mana request failed (${response.status})`);
  const result = await response.json();
  if (result.error || !result.data) throw new Error('Mana returned an invalid response');
  return result;
}

async function list(path, locale, params = {}) {
  let pageIndex = 0;
  const items = [];
  while (true) {
    const result = await read(path, locale, {
      ...params,
      ...(paginated.has(path) ? { pageSize: 200, pageIndex } : {}),
    });
    if (!Array.isArray(result.data.items)) throw new Error('Mana list is unavailable');
    items.push(...result.data.items);
    if (!result.meta?.hasMore) return items;
    if (!paginated.has(path) || ++pageIndex > 20) throw new Error('Mana list was incomplete');
  }
}

export async function fetchManaResource(resource, locale = 'en', now = new Date()) {
  if (resource === 'studio') return (await read('', locale)).data;
  if (resource === 'memberships') return list('memberships', locale);
  if (resource === 'credits') return list('class-credit-bundles', locale);
  if (resource === 'courses') return list('courses', locale);
  if (resource === 'classes') return list('classes', locale);
  if (resource === 'faq') return list('faq', locale);
  if (resource === 'trials') {
    const { data } = await read('trial-offers', locale);
    if (!Array.isArray(data.offers)) throw new Error('Mana offers are unavailable');
    return data.offers.flatMap(offer => Object.values(offer)).filter(offer => offer?.offering && offer?.price);
  }
  if (resource === 'schedule') {
    const from = now.toISOString();
    const to = new Date(now.getTime() + 14 * 86400000).toISOString();
    const [classes, courses, studio] = await Promise.all([
      list('class-events', locale, { from, to }),
      list('courses', locale, { from, to }),
      read('', locale),
    ]);
    // A course's date range is not its timetable. Fetch its actual occurrences.
    const courseEvents = await Promise.all(courses.map(async course => {
      const sessions = await list('course-events', locale, { courseId: course.id });
      return sessions.map(event => ({ ...event, kind: 'course', courseId: course.id, title: course.name }));
    }));
    const events = [
      ...classes.map(event => ({ ...event, kind: 'class', title: event.class?.title, classId: event.class?.id })),
      ...courseEvents.flat(),
    ].filter(event => event.title && Date.parse(event.startDate) >= Date.parse(from) && Date.parse(event.startDate) < Date.parse(to))
      .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id));
    return { events, timezone: studio.data.timezone || 'Europe/Stockholm', from, to };
  }
  throw new Error('Unknown Mana resource');
}

export function formatPrice(price, locale = 'en') {
  if (!price || !Number.isFinite(price.amount) || !price.currency) return null;
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: price.currency });
  const digits = formatter.resolvedOptions().maximumFractionDigits;
  return formatter.format(price.amount / 10 ** digits);
}
