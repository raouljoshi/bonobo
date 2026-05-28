import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import trainBodyImage from '../../assets/images/rings 1.JPEG';
import tinyGroupsImage from '../../assets/images/kettlebells 2.JPEG';
import joySessionImage from '../../assets/images/outdoor exercise 3.JPEG';

const valueImages = [
  {
    imageUrl: trainBodyImage,
    positionClass: 'object-[55%_65%]',
  },
  {
    imageUrl: tinyGroupsImage,
    positionClass: 'object-[55%_55%]',
  },
  {
    imageUrl: joySessionImage,
    positionClass: 'object-[55%_35%]',
  },
];

const ValueProp = () => {
  const { t } = useTranslation();
  const valuesContent = t('value_prop.values', { returnObjects: true });

  // Combine translated text with local image and style data
  const values = valuesContent.map((value, index) => ({
    ...value,
    ...valueImages[index],
  }));

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">{t('value_prop.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {t('value_prop.subtitle')}
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center">
              <img className={`h-48 w-full object-cover rounded-lg shadow-md ${value.positionClass}`} src={value.imageUrl} alt={value.title} />
              <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">{value.title}</h3>
              <p className="mt-2 text-base text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/about" className="inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-800 hover:bg-gray-100">{t('value_prop.button_philosophy')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ValueProp;
