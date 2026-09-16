import { useTranslation } from 'react-i18next';
import { useManaResource } from '../data/ManaProvider';
import { formatPrice } from '../data/mana';
import { itemLinks, MANA_STUDIO_URL } from '../utils/booking';
import ManaEmbed from './ManaEmbed';

export default function ManaCatalog({ type }) {
  const { t, i18n } = useTranslation();
  const { data, status } = useManaResource(type);
  if (status === 'error') return <ManaEmbed type={type} />;
  return <div>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
      <p role="status">{t(status === 'loading' ? 'mana.loading' : 'mana.live')}</p>
      <a href={`${MANA_STUDIO_URL}/${type}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-gray-900 underline underline-offset-4">{t(`mana.open_${type}`)} ↗</a>
    </div>
    {data?.length === 0 && <p className="rounded-xl bg-gray-50 p-6">{t('mana.empty_catalog')}</p>}
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {data?.map(item => {
        const links = itemLinks(type, item.id);
        const price = formatPrice(item.price, i18n.language);
        return <article key={item.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
          {price && <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900">{price}{type === 'memberships' && <span className="ml-1 text-base font-normal text-gray-500">{t('mana.per_month')}</span>}</p>}
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
            {type === 'credits' && <span className="rounded-full bg-gray-100 px-3 py-1">{t('mana.credits_count', { count: item.credits })}</span>}
            {type === 'memberships' && <>
              {item.creditsPerPeriod != null && <span className="rounded-full bg-gray-100 px-3 py-1">{t(item.creditPeriod === 'week' ? 'mana.credits_week' : 'mana.credits_month', { count: item.creditsPerPeriod })}</span>}
              <span className="rounded-full bg-gray-100 px-3 py-1">{item.commitmentMonths ? t('mana.commitment', { count: item.commitmentMonths }) : t('mana.no_commitment')}</span>
            </>}
          </div>
          {item.description && <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-600">{item.description}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
            <a href={links.buy} target="_blank" rel="noopener noreferrer" aria-label={`${t('mana.buy')} ${item.name}`} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700">{t('mana.buy')}</a>
            <a href={links.details} target="_blank" rel="noopener noreferrer" aria-label={`${t('mana.learn_more')}: ${item.name}`} className="inline-flex min-h-12 items-center text-sm font-semibold underline underline-offset-4">{t('mana.learn_more')} ↗</a>
          </div>
        </article>;
      })}
    </div>
  </div>;
}
