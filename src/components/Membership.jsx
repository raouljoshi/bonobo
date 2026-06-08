import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';
import SEO from './SEO';
import { buildConsultationEmailLink, SHOP_URL } from '../utils/booking';

const PassItem = ({ title, price, description, purchaseUrl, children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left text-xl font-bold"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-2xl font-bold">{price}</p>
          {description && <p className="mt-2 text-gray-600">{description}</p>}
          {children}
          <a href={purchaseUrl || SHOP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-lg bg-gray-800 px-4 py-3 text-center font-semibold text-white hover:bg-gray-900">
            {t('Buy')}
          </a>
        </div>
      )}
    </div>
  );
};

const PlanCard = ({ plan, consultation }) => (
  <article className={`relative flex flex-col rounded-lg p-6 shadow-sm ${plan.highlight ? 'border-2 border-gray-900 bg-gray-50' : 'border border-gray-200 bg-white'}`}>
    {plan.tag && (
      <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-gray-900 px-4 py-1 text-sm font-semibold text-white">
        {plan.tag}
      </div>
    )}
    <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
    <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-gray-500">{plan.audience}</p>
    <p className="mt-5 text-4xl font-bold text-gray-900">
      {plan.price} <span className="text-base font-medium text-gray-500">{plan.price_suffix}</span>
    </p>
    {plan.price_note && <p className="mt-2 text-sm text-gray-500">{plan.price_note}</p>}
    <p className="mt-5 text-gray-600">{plan.description}</p>
    <ul className="mt-6 space-y-3 text-left text-gray-700">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <span aria-hidden="true" className="text-gray-900">+</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <a
      href={buildConsultationEmailLink(`${consultation.subject_prefix}: ${plan.title}`, consultation.context)}
      className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-center font-semibold text-white hover:bg-gray-700"
    >
      {plan.button}
    </a>
  </article>
);

const Membership = () => {
  const { t } = useTranslation();
  const page = t('membership_page', { returnObjects: true });

  if (!page || !page.header || !Array.isArray(page.plans)) {
    return null;
  }

  const { header, consultation_offer, plans, other_passes, comparison_table } = page;
  const tableKeys = comparison_table.plan_keys;

  return (
    <div className="bg-white py-16">
      <SEO title={t('seo.membership.title')} description={t('seo.membership.description')} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">{header.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">{header.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-gray-900 p-6 text-center text-white">
          <h2 className="text-2xl font-bold">{consultation_offer.title}</h2>
          <p className="mt-2 text-gray-200">{consultation_offer.description}</p>
          <p className="mt-2 text-sm text-gray-300">{consultation_offer.promo}</p>
          <a
            href={buildConsultationEmailLink(consultation_offer.email_subject, consultation_offer.email_context)}
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-200"
          >
            {consultation_offer.button}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} consultation={page.consultation} />
          ))}
        </div>

        <div className="py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">{other_passes.title}</h2>
          </div>
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="space-y-4">
              {other_passes.passes.map((pass) => (
                <PassItem key={pass.title} title={pass.title} price={pass.price} description={pass.description} purchaseUrl={pass.purchaseUrl}>
                  {pass.link_text && <Link to="/classes#youth-classes" className="mt-2 inline-block text-gray-800 hover:underline">{pass.link_text}</Link>}
                </PassItem>
              ))}
            </div>
          </div>
        </div>

        <div id="membership-comparison" className="bg-gray-50 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">{comparison_table.title}</h2>
          </div>
          <div className="mt-8 space-y-4 md:hidden">
            {tableKeys.map((key, planIndex) => (
              <div key={key} className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">{comparison_table.headers[planIndex + 1]}</h3>
                <dl className="mt-4 space-y-3">
                  {comparison_table.rows.map((row) => (
                    <div key={row.feature} className="flex items-start justify-between gap-4 border-t border-gray-100 pt-3">
                      <dt className="text-sm font-medium text-gray-600">{row.feature}</dt>
                      <dd className="text-right text-sm font-semibold text-gray-900">{row[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-8 hidden md:block">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  {comparison_table.headers.map((header, index) => (
                    <th key={header} className={`px-4 py-2 font-semibold ${index === 0 ? 'text-left' : 'text-center'}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {comparison_table.rows.map((row) => (
                  <tr key={row.feature} className="border-b">
                    <td className="px-4 py-4 text-left">{row.feature}</td>
                    {tableKeys.map((key) => (
                      <td key={key} className="px-4 py-4 text-center">
                        {row[key] === 'yes' ? <span className="text-gray-800">yes</span> : row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FAQ />
      </div>
    </div>
  );
};

export default Membership;
