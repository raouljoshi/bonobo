import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BOOKING_URL } from '../../utils/booking';

const BookingCTA = () => {
  const { t } = useTranslation();
  const cta = t('booking_cta', { returnObjects: true });

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {cta.title}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {cta.subtitle}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-base font-medium text-white hover:bg-gray-900"> {cta.trial_button} </a>
          <Link to="/membership" className="inline-flex min-h-12 items-center justify-center rounded-md border border-transparent bg-gray-200 px-5 py-3 text-base font-medium text-gray-800 hover:bg-gray-300"> {cta.membership_button} </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCTA;
