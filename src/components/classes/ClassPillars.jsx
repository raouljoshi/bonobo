import { useTranslation } from 'react-i18next';
import { useManaResource } from '../../data/ManaProvider';
import { SCHEDULE_URL } from '../../utils/booking';

export default function ClassPillars() {
  const { t } = useTranslation();
  const { data, status } = useManaResource('classes');
  return <section className="bg-white py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold">{t('class_pillars.title')}</h2>
      <p className="mt-3 text-gray-600">{t('class_pillars.subtitle')}</p>
      {status === 'loading' && !data && <p role="status" className="mt-6">{t('mana.loading')}</p>}
      {status === 'error' && <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center underline">{t('mana.open_schedule')} ↗</a>}
      <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data?.map(item => <details key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <summary className="min-h-11 cursor-pointer py-2 text-lg font-semibold">{item.name}</summary>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">{item.description || t('mana.check_schedule')}</p>
          <a href="#schedule" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t('mana.schedule_link')} ↑</a>
        </details>)}
      </div>
    </div>
  </section>;
}
