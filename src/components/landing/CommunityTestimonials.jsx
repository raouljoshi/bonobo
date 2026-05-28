import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommunityTestimonials = () => {
  const { t } = useTranslation();
  const testimonials = t('community_testimonials.testimonials', { returnObjects: true });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">{t('community_testimonials.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            {t('community_testimonials.subtitle')}
          </p>
        </div>
        <div className="mt-10 space-y-4 md:hidden">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <article key={index} className="rounded-lg bg-white p-5 text-center shadow-md">
              <div className="mb-3 flex justify-center text-gray-800">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-base italic text-gray-600">"{testimonial.quote}"</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-600">- {testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.source}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 hidden md:block">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4">
                <div className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center text-gray-800 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-lg text-gray-600 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-gray-600">- {testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CommunityTestimonials;
