import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ctaImage from '../../assets/images/kettlebells 3.JPEG';
import { buildConsultationEmailLink } from '../../utils/booking';

const FinalCTA = () => {
  const { t } = useTranslation();

  return (
    <div 
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${ctaImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">{t('final_cta.title')}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-200">
          {t('final_cta.subtitle')}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/membership" className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-base font-medium text-white hover:bg-gray-900">
              {t('final_cta.button_join')}
            </Link>
            <a href={buildConsultationEmailLink(t('consultation.email_subject'), t('consultation.email_context'))} className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-200 px-5 py-3 text-base font-medium text-gray-800 hover:bg-gray-300">
              {t('final_cta.button_trial')}
            </a>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
