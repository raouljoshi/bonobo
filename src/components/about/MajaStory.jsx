import React from 'react';
import { useTranslation } from 'react-i18next';
import majaInstructorImage from '../../assets/images/maja.jpg';

const MajaStory = () => {
  const { t } = useTranslation();
  const storyParts = t('maja_story.story', { returnObjects: true }) || [];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('maja_story.title')}
            </h2>
            {storyParts.map((paragraph, index) => (
              <p key={index} className="mt-4 text-lg text-gray-500">
                {paragraph}
              </p>
            ))}
            
          </div>
          <div className="mt-10 lg:mt-0 lg:order-1">
            <img
              className="rounded-lg shadow-lg"
              src={majaInstructorImage} // Using placeholder
              alt={t('maja_story.title')} // Using title as alt text for now
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajaStory;
