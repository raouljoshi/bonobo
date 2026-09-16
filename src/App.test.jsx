import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import translations from '../public/locales/en/translation.json';
import swedish from '../public/locales/sv/translation.json';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import ClassSchedule from './components/classes/ClassSchedule';
import ManaCatalog from './components/ManaCatalog';
import ManaEmbed from './components/ManaEmbed';
import TrialOffers from './components/TrialOffers';
import { ManaProvider } from './data/ManaProvider';
import { fetchManaResource, formatPrice } from './data/mana';
import { MANA_ORIGIN, MANA_STUDIO_URL, ACCOUNT_URL, TRIAL_URL, itemLinks, trialLink } from './utils/booking';

let i18n;
beforeEach(async () => {
  i18n = createInstance();
  await i18n.init({ lng: 'en', resources: { en: { translation: translations }, sv: { translation: swedish } }, interpolation: { escapeValue: false } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });
const renderUI = node => render(<I18nextProvider i18n={i18n}><MemoryRouter><ManaProvider>{node}</ManaProvider></MemoryRouter></I18nextProvider>);
const response = (data, meta) => ({ ok: true, json: async () => ({ data, ...(meta ? { meta } : {}) }) });

test('updates document title and description metadata', () => {
  renderUI(<SEO title="Bonobo Gym" description="Small-group training on Kvarnholmen." />);
  expect(document.title).toBe('Bonobo Gym');
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Small-group training on Kvarnholmen.');
});

test('fetches the entire public catalogue without visitor credentials or secrets', async () => {
  const fetch = vi.fn().mockResolvedValueOnce(response({ items: [{ id: 'one' }] }, { hasMore: true })).mockResolvedValueOnce(response({ items: [{ id: 'two' }] }, { hasMore: false }));
  vi.stubGlobal('fetch', fetch);
  expect(await fetchManaResource('credits', 'sv')).toEqual([{ id: 'one' }, { id: 'two' }]);
  expect(fetch.mock.calls[1][0]).toContain('pageIndex=1');
  for (const [, options] of fetch.mock.calls) {
    expect(options.credentials).toBe('omit');
    expect(options.headers).toEqual({ Accept: 'application/json', 'Accept-Language': 'sv' });
  }
});

test('combines class occurrences with actual course sessions, filtering and sorting by time', async () => {
  vi.stubGlobal('fetch', vi.fn(async url => {
    if (url.includes('/class-events')) return response({ items: [{ id: 'class-event', class: { id: 'class-template', title: 'Strength' }, startDate: '2026-09-17T10:00:00Z', endDate: '2026-09-17T11:00:00Z' }] });
    if (url.includes('/course-events')) return response({ items: [
      { id: 'session-two', startDate: '2026-09-22T08:30:00Z', endDate: '2026-09-22T09:30:00Z' },
      { id: 'session-one', startDate: '2026-09-17T08:30:00Z', endDate: '2026-09-17T09:30:00Z' },
      { id: 'old', startDate: '2026-09-01T08:30:00Z' },
      { id: 'later', startDate: '2026-10-22T08:30:00Z' },
    ] });
    if (url.includes('/courses')) return response({ items: [{ id: 'course', name: 'Mamma Boot Camp' }] });
    return response({ timezone: 'Europe/Stockholm' });
  }));
  const schedule = await fetchManaResource('schedule', 'en', new Date('2026-09-16T00:00:00Z'));
  expect(schedule.events.map(event => event.id)).toEqual(['session-one', 'class-event', 'session-two']);
  expect(schedule.events[0].courseId).toBe('course');
  expect(itemLinks('class', schedule.events[1].id).details).toBe(`${MANA_STUDIO_URL}/schedule?class=class-event`);
});

test('formats minor currency units and constructs separate detail and checkout links', () => {
  expect(formatPrice({ amount: 119900, currency: 'SEK' }, 'en')).toBe('SEK 1,199.00');
  expect(formatPrice({ amount: 12000, currency: 'SEK' }, 'sv')).toContain('120');
  expect(itemLinks('memberships', 'member-id').buy).toBe(`${MANA_STUDIO_URL}/checkout/membership?membershipId=member-id`);
  expect(itemLinks('credits', 'bundle-id').details).toBe(`${MANA_STUDIO_URL}/credits/bundle-id`);
  expect(trialLink('trial_offer_3_credits')).toBe(`${MANA_STUDIO_URL}/checkout/trial-offers?offering=trial_offer_3_credits`);
  expect(trialLink('trial_offer_single_class')).toBe(`${MANA_STUDIO_URL}/schedule`);
});

test('renders live catalogue updates and falls back to Mana on a failed refresh', async () => {
  const fetch = vi.fn().mockResolvedValue(response({ items: [{ id: 'gold', name: 'Gold', price: { amount: 123400, currency: 'SEK' }, commitmentMonths: null }] }));
  vi.stubGlobal('fetch', fetch);
  renderUI(<ManaCatalog type="memberships" />);
  expect(await screen.findByRole('heading', { name: 'Gold' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Buy Gold' })).toHaveAttribute('href', itemLinks('memberships', 'gold').buy);
  fetch.mockResolvedValueOnce(response({ items: [{ id: 'gold', name: 'Gold updated', price: { amount: 130000, currency: 'SEK' }, commitmentMonths: null }] }));
  fireEvent(window, new Event('focus'));
  expect(await screen.findByRole('heading', { name: 'Gold updated' })).toBeInTheDocument();
  fetch.mockRejectedValueOnce(new Error('offline'));
  fireEvent(window, new Event('focus'));
  expect(await screen.findByTitle('Bonobo Gym memberships and prices in Mana')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Gold updated' })).not.toBeInTheDocument();
});

test('an empty trial catalogue does not advertise an unavailable offer', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ offers: [], eligible: true })));
  renderUI(<TrialOffers />);
  await waitFor(() => expect(screen.queryByRole('heading', { name: 'New to Bonobo?' })).not.toBeInTheDocument());
});

test('mobile navigation exposes account and trial, closes on Escape and switches language', async () => {
  renderUI(<Navbar />);
  expect(screen.getByRole('link', { name: 'My account' })).toHaveAttribute('href', ACCOUNT_URL);
  const menu = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(menu);
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getAllByRole('link', { name: 'Try us' }).every(link => link.href === TRIAL_URL)).toBe(true);
  fireEvent.keyDown(menu, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(screen.getByRole('button', { name: 'Choose language' }));
  fireEvent.click(screen.getByRole('button', { name: 'Svenska' }));
  expect(await screen.findByRole('link', { name: 'Mitt konto' })).toBeInTheDocument();
});

test('blocked iframe offers direct access and ignores unrelated readiness messages', () => {
  vi.useFakeTimers();
  renderUI(<ManaEmbed type="schedule" />);
  const frame = screen.getByTitle('Bonobo Gym live schedule and booking in Mana');
  const ready = { scheduleIframeHeight: 800 };
  act(() => window.dispatchEvent(new MessageEvent('message', { origin: 'https://example.com', source: frame.contentWindow, data: ready })));
  expect(screen.getByRole('status')).toHaveTextContent('Loading from Mana');
  act(() => vi.advanceTimersByTime(15000));
  expect(screen.getByRole('status')).toHaveTextContent('Taking a while to load');
  expect(frame).not.toBeVisible();
  expect(screen.getByRole('link')).toHaveAttribute('href', `${MANA_STUDIO_URL}/schedule`);
  act(() => window.dispatchEvent(new MessageEvent('message', { origin: MANA_ORIGIN, source: frame.contentWindow, data: ready })));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(frame).toBeVisible();
});

test('schedule displays Stockholm time, filters classes, and links full classes without promising a place', async () => {
  vi.stubGlobal('fetch', vi.fn(async url => {
    if (url.includes('/class-events')) return response({ items: [{ id: 'event-1', class: { title: 'Dawn patrol' }, startDate: '2026-09-17T04:30:00Z', endDate: '2026-09-17T05:15:00Z', maxSlots: 12, bookedSlots: 12 }] });
    if (url.includes('/courses')) return response({ items: [] });
    return response({ timezone: 'Europe/Stockholm' });
  }));
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-09-16T00:00:00Z'));
  renderUI(<ClassSchedule />);
  expect(await screen.findByText('06:30')).toBeInTheDocument();
  expect(screen.getByText('Full · check options in Mana')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Dawn patrol' } });
  expect(screen.getByRole('link', { name: /View class: Dawn patrol/ })).toHaveAttribute('href', `${MANA_STUDIO_URL}/schedule?class=event-1`);
});
