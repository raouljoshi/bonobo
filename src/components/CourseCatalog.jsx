import { useTranslation } from 'react-i18next';
import { useManaResource } from '../data/ManaProvider';
import { formatPrice } from '../data/mana';
import { COURSES_URL, itemLinks } from '../utils/booking';

export default function CourseCatalog() {
  const { t, i18n } = useTranslation();
  const { data, status } = useManaResource('courses');
  const date = value => new Intl.DateTimeFormat(i18n.language, { timeZone: 'Europe/Stockholm', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
  return <section className="my-12" aria-labelledby="courses-heading">
    <h2 id="courses-heading" className="text-3xl font-bold">{t('mana.courses')}</h2>
    <p className="mt-3 text-gray-600">{t('mana.courses_description')}</p>
    {status === 'loading' && !data && <p role="status" className="mt-4">{t('mana.loading')}</p>}
    {data?.length === 0 && <p className="mt-4 text-gray-600">{t('mana.no_courses')}</p>}
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {data?.map(course => <article key={course.id} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-2xl font-bold">{course.name}</h3>
        {course.startDate && <p className="mt-3 text-sm text-gray-600">{date(course.startDate)}{course.endDate && ` – ${date(course.endDate)}`}</p>}
        <p className="mt-3 text-sm text-gray-600">{t('mana.sessions', { count: course.eventCount })}</p>
        <p className="mt-3 text-2xl font-bold">{formatPrice(course.price, i18n.language)}</p>
        {course.description && <p className="mt-4 whitespace-pre-line text-gray-600">{course.description}</p>}
        <a href={itemLinks('course', course.id).details} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700">{t('mana.view_course')} ↗</a>
      </article>)}
    </div>
    <a href={COURSES_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t('mana.open_courses')} ↗</a>
  </section>;
}
