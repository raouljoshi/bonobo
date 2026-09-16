import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FAQ from './FAQ';
import ManaFAQ from './ManaFAQ';
import SEO from './SEO';
import ManaCatalog from './ManaCatalog';
import TrialOffers from './TrialOffers';
import CourseCatalog from './CourseCatalog';
import { SERVICES_URL, COURSES_URL, PT_PACK_URL, FAQ_URL, TERMS_URL } from '../utils/booking';

export default function Membership() {
  const { t } = useTranslation();
  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO title={t('seo.membership.title')} description={t('seo.membership.description')} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">Bonobo Gym · Kvarnholmen</p>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{t('membership_page.header.title')}</h1>
          <p className="mt-4 text-lg text-gray-600">{t('membership_page.header.subtitle')}</p>
        </header>
        <TrialOffers />
        <nav aria-label={t('membership_page.options')} className="mb-10 flex flex-wrap gap-3">
          {['memberships', 'credits', 'more'].map(section => (
            <a key={section} href={`#${section}`} className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-5 py-2 font-medium text-gray-800 hover:bg-gray-100">{t(`membership_page.${section}`)}</a>
          ))}
        </nav>
        <section id="memberships" aria-labelledby="memberships-heading" className="scroll-mt-24">
          <h2 id="memberships-heading" className="mb-3 text-3xl font-bold">{t('membership_page.memberships')}</h2>
          <ManaCatalog type="memberships" />
        </section>
        <section id="credits" aria-labelledby="credits-heading" className="mt-12 scroll-mt-24 border-t border-gray-200 pt-10">
          <h2 id="credits-heading" className="mb-3 text-3xl font-bold">{t('membership_page.credits')}</h2>
          <ManaCatalog type="credits" />
        </section>
        <section id="more" aria-label={t('membership_page.more')} className="my-12 grid scroll-mt-24 gap-6 md:grid-cols-2">
          {[['services', SERVICES_URL], ['courses', COURSES_URL]].map(([key, url]) => (
            <div key={key} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-2xl font-bold">{t(`mana.${key}`)}</h2>
              <p className="mt-3 text-gray-600">{t(`mana.${key}_description`)}</p>
              {key === 'services' && <a href={PT_PACK_URL} target="_blank" rel="noopener noreferrer" className="mr-5 mt-4 inline-flex min-h-12 items-center rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700">{t('mana.pt_checkout')} ↗</a>}
              <a href={url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{t(`mana.open_${key}`)} ↗</a>
            </div>
          ))}
        </section>
        <CourseCatalog />
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href={FAQ_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">{t('mana.faq')}</a>
          <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">{t('mana.terms')}</a>
          <Link to="/contact" className="inline-flex min-h-11 items-center underline">{t('mana.help')}</Link>
        </div>
        <ManaFAQ />
        <FAQ />
      </div>
    </div>
  );
}
