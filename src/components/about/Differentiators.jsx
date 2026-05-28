import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUsers, FaChild, FaHeartbeat } from 'react-icons/fa';

const featureIcons = [FaUsers, FaChild, FaHeartbeat];

const Differentiators = () => {
  const { t } = useTranslation();
  const featuresContent = t('differentiators.features', { returnObjects: true });

  const features = featuresContent.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index],
  }));

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">{t('differentiators.pre_title')}</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            {t('differentiators.title')}
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Differentiators;
