import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ManaEmbed from '../ManaEmbed';
import { useManaResource } from '../../data/ManaProvider';
import { COURSES_URL, BOOKINGS_URL, SCHEDULE_URL, itemLinks } from '../../utils/booking';

export default function ClassSchedule() {
  const { t, i18n } = useTranslation();
  const { data, status } = useManaResource('schedule');
  const [filter, setFilter] = useState('all');
  const timezone = data?.timezone || 'Europe/Stockholm';
  const dateFormat = new Intl.DateTimeFormat(i18n.language, { timeZone: timezone, weekday: 'long', day: 'numeric', month: 'long' });
  const timeFormat = new Intl.DateTimeFormat(i18n.language, { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false });
  const filters = useMemo(() => [...new Set(data?.events.map(event => event.title) || [])], [data]);
  const activeFilter = filters.includes(filter) ? filter : 'all';
  const days = new Map();
  for (const event of data?.events || []) {
    if (activeFilter !== 'all' && event.title !== activeFilter) continue;
    const day = dateFormat.format(new Date(event.startDate));
    if (!days.has(day)) days.set(day, []);
    days.get(day).push(event);
  }
  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="scroll-mt-20 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 id="schedule-heading" className="text-3xl font-extrabold text-gray-900">{t('class_schedule.title')}</h2>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">{t('class_schedule.subtitle')}</p>
          </div>
          <a href={BOOKINGS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700">{t('mana.manage_bookings')}</a>
        </div>
        {status === 'error' ? <ManaEmbed type="schedule" /> : <>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
              {t('mana.filter_classes')}
              <select value={activeFilter} onChange={event => setFilter(event.target.value)} className="min-h-12 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base font-normal sm:min-w-72">
                <option value="all">{t('mana.all_classes')}</option>
                {filters.map(title => <option key={title} value={title}>{title}</option>)}
              </select>
            </label>
            <div className="text-sm text-gray-600"><p role="status">{t(status === 'loading' ? 'mana.loading' : 'mana.schedule_window')}</p><p>{t('mana.timezone', { timezone })}</p></div>
          </div>
          {status === 'ready' && days.size === 0 && <p className="rounded-xl bg-white p-6">{t('mana.no_classes')}</p>}
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {[...days].map(([day, events]) => <section key={day} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <h3 className="border-b border-gray-200 bg-gray-100 px-5 py-4 text-lg font-bold capitalize">{day}</h3>
              <ul className="divide-y divide-gray-100">{events.map(event => {
                const course = event.kind === 'course';
                const full = !course && event.maxSlots != null && event.bookedSlots >= event.maxSlots;
                const duration = Math.round((new Date(event.endDate) - new Date(event.startDate)) / 60000);
                return <li key={`${event.kind}-${event.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-3 p-5">
                  <div className="w-14 shrink-0 self-start"><time dateTime={event.startDate} className="text-lg font-bold">{timeFormat.format(new Date(event.startDate))}</time><p className="mt-1 text-xs text-gray-500">{duration} min</p></div>
                  <div className="min-w-0 flex-1 basis-36"><h4 className="font-semibold text-gray-900">{event.title}</h4><p className="mt-1 text-sm text-gray-600">{course ? t('mana.course_session') : full ? t('mana.full') : event.maxSlots != null ? t('mana.spots', { count: Math.max(0, event.maxSlots - event.bookedSlots) }) : t('mana.check_availability')}</p></div>
                  <a href={itemLinks(event.kind, course ? event.courseId : event.id).details} target="_blank" rel="noopener noreferrer" aria-label={`${course ? t('mana.view_course') : full ? t('mana.view_class') : t('mana.book')}: ${event.title}, ${day} ${timeFormat.format(new Date(event.startDate))}`} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">{course ? t('mana.view_course') : full ? t('mana.view_class') : t('mana.book')} ↗</a>
                </li>;
              })}</ul>
            </section>)}
          </div>
          <p className="mt-4 text-sm text-gray-600">{t('mana.availability_note')}</p>
          <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t('mana.open_schedule')} ↗</a>
        </>}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-xl font-bold">{t('mana.courses')}</h3>
          <p className="mt-2 text-gray-600">{t('mana.courses_description')}</p>
          <a href={COURSES_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t('mana.open_courses')} ↗</a>
        </div>
      </div>
    </section>
  );
}
