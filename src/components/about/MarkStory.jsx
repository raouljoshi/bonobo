import React from 'react';
import { useTranslation } from 'react-i18next';
import markInstructorImage from '../../assets/images/Mark instructor.jpg';

const MarkStory = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('mark_story.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('mark_story.paragraph1')}
            </p>
            <p className="mt-4 text-lg text-gray-500">
              {t('mark_story.paragraph2')}
            </p>

          </div>
          <div className="mt-10 lg:mt-0">
            <img
              className="rounded-lg shadow-lg"
              src={markInstructorImage}
              alt={t('mark_story.image_alt')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkStory;
