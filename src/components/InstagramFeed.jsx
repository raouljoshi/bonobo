import React from 'react';
import { useTranslation } from 'react-i18next';

const InstagramFeed = () => {
  const { t } = useTranslation();
  const images = [
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a href="https://www.instagram.com/bonobogym/" target="_blank" rel="noopener noreferrer">
          <h2 className="text-3xl font-bold text-gray-800 hover:text-gray-900 transition-colors">{t('instagram_feed.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 hover:text-gray-700 transition-colors">{t('instagram_feed.handle')}</p>
        </a>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <a key={index} href="https://www.instagram.com/bonobogym/" target="_blank" rel="noopener noreferrer">
              <img src={src} alt={`${t('instagram_feed.alt_text')} ${index + 1}`} className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
