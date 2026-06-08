import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaTimes } from 'react-icons/fa';
import bonoboLogo from '../assets/images/bonobo logo.JPEG';
import { openBookingUrl } from '../utils/booking';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnouncementBannerVisible, setAnnouncementBannerVisible] = useState(true);

  // Get announcements data
  const announcements = t('announcements', { returnObjects: true });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeAnnouncements = announcements.filter(announcement => {
    const endDate = new Date(announcement.endDate);
    return endDate >= today;
  });

  // Check if banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementBannerDismissed');
    if (dismissed === 'true') {
      setAnnouncementBannerVisible(false);
    }
  }, []);

  const handleCloseAnnouncementBanner = () => {
    setAnnouncementBannerVisible(false);
    localStorage.setItem('announcementBannerDismissed', 'true');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };



  const showAnnouncementBanner = isAnnouncementBannerVisible && activeAnnouncements.length > 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      {/* Announcement Banner */}
      {showAnnouncementBanner && (
        <div className="bg-brand">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <p className="flex-1 text-center text-sm font-medium text-white">
              {activeAnnouncements[0].message}
              {activeAnnouncements[0].link && (
                <Link
                  to={activeAnnouncements[0].link}
                  className="ml-2 underline underline-offset-2 hover:no-underline"
                  onClick={handleLinkClick}
                >
                  {t('announcement_banner.view_details')}
                </Link>
              )}
            </p>
            <button
              onClick={handleCloseAnnouncementBanner}
              className="shrink-0 text-white/70 transition-colors hover:text-white"
              aria-label="Close announcement"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLinkClick} className="text-2xl font-bold text-gray-800">
              <img src={bonoboLogo} alt="Bonobo Gym logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.home')}</Link>
            <Link to="/classes" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.classes')}</Link>
            <Link to="/labs" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.labs')}</Link>
            <Link to="/membership" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.memberships')}</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.about')}</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.contact')}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
                className="min-h-11 min-w-11 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                aria-label="Choose language"
                aria-expanded={isLangDropdownOpen}
              >
                <FaGlobe className="h-5 w-5" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                  <button onClick={() => changeLanguage('sv')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Svenska</button>
                </div>
              )}
            </div>

            <button onClick={() => openBookingUrl()} className="min-h-11 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">{t('navbar.book_class')}</button>
          </div>

          {/* Mobile right-side icons */}
          <div className="-mr-2 flex items-center space-x-2 md:hidden">
            {/* Language selector for mobile */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
                className="min-h-11 min-w-11 rounded-md p-2 text-gray-600 hover:text-gray-800"
                aria-label="Choose language"
                aria-expanded={isLangDropdownOpen}
              >
                <FaGlobe className="h-5 w-5" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button onClick={() => { changeLanguage('en'); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                  <button onClick={() => { changeLanguage('sv'); handleLinkClick(); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Svenska</button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.home')}</Link>
          <Link to="/classes" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.classes')}</Link>
          <Link to="/labs" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.labs')}</Link>
          <Link to="/membership" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.memberships')}</Link>
          <Link to="/about" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.about')}</Link>
          <Link to="/contact" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.contact')}</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="mt-3 px-2 space-y-1">
            <button onClick={() => { openBookingUrl(); handleLinkClick(); }} className="block min-h-12 w-full rounded-md bg-brand px-4 py-3 text-center text-base font-medium text-white hover:bg-brand-dark">{t('navbar.book_class')}</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
