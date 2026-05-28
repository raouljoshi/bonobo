import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope } from 'react-icons/fa';
import SEO from '../components/SEO';

const Contact = () => {
  const { t } = useTranslation();
  const page = t('contact_page', { returnObjects: true });

  if (!page || !page.header) {
    return null; // Or a loading spinner
  }

  const { header, email_section } = page;

  return (
    <div className="bg-gray-50">
      <SEO title={t('seo.contact.title')} description={t('seo.contact.description')} />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-gray-600 tracking-wide uppercase">{header.pre_title}</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {header.title}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {header.subtitle}
          </p>
        </div>
        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {email_section.title}
              </h3>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                {email_section.description}
              </p>
              <a
                href={`mailto:${email_section.button_text}`}
                className="mt-8 bg-gray-800 border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-white hover:bg-gray-900"
              >
                <FaEnvelope className="-ml-1 mr-3 h-5 w-5" />
                {email_section.button_text}
              </a>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
             {/* Placeholder for a map - you can embed a Google Map here */}
            <iframe title="Google Maps Location of Bonobo Gym"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.492289122823!2d18.13419171607294!3d59.31714108169739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f83c5b0e952d5%3A0xbd4f2c406a106c00!2sBonobo%20Gym!5e0!3m2!1sen!2sse!4v1678886734561!5m2!1sen!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md object-cover"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
