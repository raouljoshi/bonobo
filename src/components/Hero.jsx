import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import bonoboLogo from '../assets/images/bonobo logo.JPEG';
import heroImage from '../assets/images/plank.jpg';
import { buildConsultationEmailLink } from '../utils/booking';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center overflow-hidden bg-cover bg-center px-4 py-20 text-center text-white sm:min-h-screen"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/20"></div>
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <img src={bonoboLogo} alt="Bonobo Gym logo" className="h-24 w-auto rounded-md bg-white/90 p-2 shadow-2xl sm:h-32" />
        <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
          {t('hero.title')}
          <span className="mt-3 block text-xl font-semibold sm:text-2xl md:text-3xl">{t('hero.subtitle')}</span>
        </h1>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <a href={buildConsultationEmailLink(t('consultation.email_subject'), t('consultation.email_context'))} className="w-full rounded-full bg-gray-800 px-8 py-3 font-bold text-white shadow-lg transition duration-300 hover:bg-gray-900 sm:w-auto">
            {t('hero.button_trial')}
          </a>
          <Link to="/membership" className="w-full rounded-full border-2 border-white bg-transparent px-8 py-3 font-bold transition duration-300 hover:bg-white hover:text-gray-800 sm:w-auto">
            {t('hero.button_membership')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
