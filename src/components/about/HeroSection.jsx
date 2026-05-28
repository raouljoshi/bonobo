import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        {/* Placeholder for hero image */}
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1975&q=80"
          alt="Bonobo Gym"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t('about_hero.title')}
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          {t('about_hero.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
