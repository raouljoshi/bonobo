import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaChevronDown, FaTimes } from 'react-icons/fa';
import bonoboLogo from '../assets/images/bonobo logo.JPEG';
import RedirectModal from './RedirectModal';
import useOutsideClick from '../hooks/useOutsideClick';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnouncementDropdownOpen, setAnnouncementDropdownOpen] = useState(false);
  const [isAnnouncementBannerVisible, setAnnouncementBannerVisible] = useState(true);
  const announcementDropdownRef = useRef(null);



  // Close announcement dropdown when clicking outside
  useOutsideClick([announcementDropdownRef], () => {
    if (isAnnouncementDropdownOpen) {
      setAnnouncementDropdownOpen(false);
    }
  });

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

  const externalBookingUrl = 'https://bonobogym.gymsystem.se';

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCloseAnnouncementBanner = () => {
    setAnnouncementBannerVisible(false);
    localStorage.setItem('announcementBannerDismissed', 'true');
  };



  const handleConfirmRedirect = () => {
    window.open(externalBookingUrl, '_blank');
    handleCloseModal();
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };



  const showAnnouncementBanner = isAnnouncementBannerVisible && activeAnnouncements.length > 0;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
      {/* Announcement Banner */}
      {showAnnouncementBanner && (
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center flex-1 relative" ref={announcementDropdownRef}>
                <button
                  onClick={() => setAnnouncementDropdownOpen(!isAnnouncementDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
                >
                  <FaChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 text-blue-500 ${
                      isAnnouncementDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                  <span>
                    {activeAnnouncements.length === 1 
                      ? t('announcement_banner.new_announcement_single')
                      : t('announcement_banner.new_announcements_multiple', { count: activeAnnouncements.length })}
                  </span>
                </button>

                {/* Dropdown content */}
                {isAnnouncementDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-screen max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">{t('announcement_banner.announcements_title')}</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {activeAnnouncements.map((announcement, index) => (
                        <div key={announcement.id} className={`p-3 ${index !== activeAnnouncements.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <Link
                            to={announcement.link || '/membership'}
                            className="block text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            onClick={() => setAnnouncementDropdownOpen(false)}
                          >
                            {announcement.message}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={handleCloseAnnouncementBanner}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                aria-label="Close announcement banner"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
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
            <Link to="/membership" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.memberships')}</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.about')}</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">{t('navbar.contact')}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
                <FaGlobe className="h-5 w-5" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                  <button onClick={() => changeLanguage('sv')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Svenska</button>
                </div>
              )}
            </div>

            <button onClick={handleOpenModal} className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">{t('navbar.book_class')}</button>
          </div>

          {/* Mobile right-side icons */}
          <div className="-mr-2 flex items-center space-x-2 md:hidden">
            {/* Language selector for mobile */}
            <div className="relative">
              <button onClick={() => setLangDropdownOpen(!isLangDropdownOpen)} className="text-gray-600 hover:text-gray-800 p-2 rounded-md">
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
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
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
          <Link to="/membership" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.memberships')}</Link>
          <Link to="/about" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.about')}</Link>
          <Link to="/contact" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">{t('navbar.contact')}</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="mt-3 px-2 space-y-1">
            <button onClick={() => { handleOpenModal(); handleLinkClick(); }} className="block w-full text-center bg-gray-800 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-gray-700">{t('navbar.book_class')}</button>
          </div>
        </div>
      </div>
      <RedirectModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmRedirect} />
    </nav>
  );
};

export default Navbar;
