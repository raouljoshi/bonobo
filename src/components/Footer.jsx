import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_URL, TERMS_URL, FAQ_URL } from '../utils/booking';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Bonobo Gym Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Bonobo Gym</h3>
            <p className="text-gray-400">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <a aria-label="Bonobo Gym Instagram" href="https://www.instagram.com/bonobogym/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">{t('footer.quick_links')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/classes" className="text-gray-400 hover:text-white">{t('footer.links.classes')}</Link></li>
              <li><Link to="/membership" className="text-gray-400 hover:text-white">{t('footer.links.memberships')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">{t('footer.links.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold">{t('mana.hours')}</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>{t('mana.hours_description')}</li>
              <li><Link to="/classes#schedule" className="inline-flex min-h-11 items-center underline hover:text-white">{t('mana.schedule_link')}</Link></li>
              <li><a href={ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline hover:text-white">{t('mana.account')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">{t('footer.contact_title')}</h3>
            <address className="mt-4 not-italic text-gray-400 space-y-2">
              <p>Kvarnholmsvägen 77<br />131 31 Nacka<br />Stockholm, Sweden</p>
              <p>mark@bonobogym.com</p>
              <p>0736 426 292</p>
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <h3 className="text-lg font-bold">{t('footer.service_area_title')}</h3>
          <p className="mt-2 text-gray-400 max-w-3xl mx-auto">
            {t('footer.service_area_content')}
          </p>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <div className="mb-4 flex flex-wrap justify-center gap-x-6">
            <a href={FAQ_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-gray-400 underline hover:text-white">{t('mana.faq')}</a>
            <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-gray-400 underline hover:text-white">{t('mana.terms')}</a>
          </div>
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
