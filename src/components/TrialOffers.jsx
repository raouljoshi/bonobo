import { useTranslation } from 'react-i18next';
import { useManaResource } from '../data/ManaProvider';
import { formatPrice } from '../data/mana';
import { TRIAL_URL, trialLink } from '../utils/booking';

export default function TrialOffers() {
  const { t, i18n } = useTranslation();
  const { data, status } = useManaResource('trials');
  if (status === 'ready' && data?.length === 0) return null;
  return <section aria-labelledby="trial-heading" className="my-10 rounded-2xl bg-gray-900 p-6 text-white sm:p-8">
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div className="max-w-xl">
        <h2 id="trial-heading" className="text-2xl font-bold">{t('membership_page.trial.title')}</h2>
        <p className="mt-2 text-gray-300">{t('membership_page.trial.description')}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {data?.map(offer => <a key={offer.offering} href={trialLink(offer.offering)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 flex-col items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-200">
          <span>{offer.name}</span><span className="mt-1 text-xl">{formatPrice(offer.price, i18n.language)}</span>
        </a>)}
        {!data?.length && <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-lg bg-white px-6 py-3 font-semibold text-gray-900">{t('navbar.try_us')}</a>}
      </div>
    </div>
    <p className="mt-5 text-xs text-gray-300">{t('mana.trial_terms')}</p>
  </section>;
}
