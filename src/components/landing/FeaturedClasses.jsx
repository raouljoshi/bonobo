import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import strengthImage from '../../assets/images/resistance training.JPEG';
import movementImage from '../../assets/images/mvmt.jpg';
import allAgesImage from '../../assets/images/kids training 1.JPEG';

const classMedia = [
  { imageUrl: strengthImage, link: '/classes' },
  { imageUrl: movementImage, link: '/classes' },
  { imageUrl: allAgesImage, link: '/classes' },
];

const FeaturedClasses = () => {
  const { t } = useTranslation();
  const classesContent = t('featured_classes.classes', { returnObjects: true });

  const classes = classesContent.map((item, index) => ({
    ...item,
    ...classMedia[index],
  }));

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">{t('featured_classes.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {t('featured_classes.subtitle')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {classes.map((item) => (
            <div key={item.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img className="w-full h-64 object-cover" src={item.imageUrl} alt={item.title} />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <Link to={item.link} className="text-gray-600 hover:text-gray-800 font-semibold">
                  {t('featured_classes.learn_more')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;
