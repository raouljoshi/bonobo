import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BOOKING_URL } from '../../utils/booking';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">{t('about_cta.title')}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          {t('about_cta.subtitle')}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/classes"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-base font-medium text-gray-800 hover:bg-gray-200"
          >
            {t('about_cta.button_schedule')}
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-600 px-5 py-3 text-base font-medium text-white hover:bg-gray-700"
          >
            {t('about_cta.button_trial')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
