import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';
import SEO from './SEO';
import { SHOP_URL } from '../utils/booking';

const PassItem = ({ title, price, description, purchaseUrl, children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left font-bold text-xl"
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
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

const Membership = () => {
  const { t } = useTranslation();

  const page = t('membership_page', { returnObjects: true });

  if (!page || !page.header) {
    return null; // Or a loading spinner
  }

  const { header, trail_offer, pricing_cards, other_passes } = page;
  const { gold } = pricing_cards;

  return (
    <div className="bg-white py-16">
      <SEO title={t('seo.membership.title')} description={t('seo.membership.description')} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">{header.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">{header.subtitle}</p>
        </div>

        {/* Bonobo Trail Offer */}
        <div className="mt-12 max-w-lg mx-auto bg-gray-900 text-white rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold">{trail_offer.title}</h3>
          <p className="mt-2">{trail_offer.description}</p>
          <p className="text-sm mt-2">{trail_offer.promo}</p>
          <a href={trail_offer.purchaseUrl || SHOP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-200">{trail_offer.button}</a>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="border rounded-lg p-8 flex flex-col">
            <h3 className="text-3xl font-bold text-gray-900">{gold.title}</h3>
            <p className="mt-6 text-4xl font-bold">{gold.price} <span className="text-lg font-medium text-gray-500">{gold.price_suffix}</span></p>
            <ul className="mt-6 space-y-4 text-left mb-8">
              {gold.features.map((feature, index) => (
                <li key={index} className="flex items-start"><span className="text-gray-800 mr-2">✓</span>{feature}</li>
              ))}
            </ul>
            <div className="mt-auto">
              <a href={gold.purchaseUrl || SHOP_URL} target="_blank" rel="noopener noreferrer" className="block w-full rounded-lg bg-gray-800 py-4 text-center font-semibold text-white hover:bg-gray-900">{gold.button}</a>
              <p className="mt-6 text-center text-sm text-gray-500">{gold.annual_link ? (<a href={gold.annual_link} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">{gold.annual_note}</a>) : gold.annual_note}</p>
            </div>
          </div>
        </div>

        {/* Other Passes */}
        <div className="py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold">{other_passes.title}</h2>
            </div>
            <div className="mt-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                    {other_passes.passes.map((pass, index) => (
                        <PassItem key={index} title={pass.title} price={pass.price} description={pass.description} purchaseUrl={pass.purchaseUrl}>
                        </PassItem>
                    ))}
                </div>
            </div>
        </div>

        <FAQ />

      </div>
    </div>
  );
};

export default Membership;
