import { useTranslation } from 'react-i18next';
import { useManaResource } from '../data/ManaProvider';
import { FAQ_URL } from '../utils/booking';

export default function ManaFAQ() {
  const { t } = useTranslation();
  const { data } = useManaResource('faq');
  return <section className="my-12 rounded-xl bg-gray-50 p-6 sm:p-8">
    <h2 className="text-2xl font-bold">{t('mana.faq')}</h2>
    <div className="mt-5 divide-y divide-gray-200">
      {data?.map(item => <details key={item.id} className="py-3">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold">{item.question}</summary>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-gray-600">{item.answer}</p>
      </details>)}
    </div>
    <a href={FAQ_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t('mana.read_faq')} ↗</a>
  </section>;
}
