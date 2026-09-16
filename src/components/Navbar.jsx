import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import bonoboLogo from '../assets/images/bonobo logo.JPEG';
import useOutsideClick from '../hooks/useOutsideClick';
import { ACCOUNT_URL, TRIAL_URL } from '../utils/booking';

const links = [['/', 'home'], ['/classes', 'classes'], ['/membership', 'memberships'], ['/about', 'about'], ['/contact', 'contact']];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef(null);
  const menuButtonRef = useRef(null);
  useOutsideClick([languageRef], () => setLanguageOpen(false));

  useEffect(() => { setMenuOpen(false); setLanguageOpen(false); }, [pathname]);
  const closeOnEscape = (event) => {
    if (event.key === 'Escape') {
      setLanguageOpen(false);
      if (menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
    }
  };
  const navClass = ({ isActive }) => `inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-100 text-gray-950' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`;

  return (
    <nav aria-label={t('navbar.navigation')} onKeyDown={closeOnEscape} className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Bonobo Gym" onClick={() => setMenuOpen(false)} className="shrink-0"><img src={bonoboLogo} alt="Bonobo Gym" className="h-12" /></Link>
        <div className="hidden items-center lg:flex">
          {links.map(([url, key]) => <NavLink key={url} to={url} className={navClass}>{t(`navbar.${key}`)}</NavLink>)}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div ref={languageRef} className="relative">
            <button onClick={() => setLanguageOpen(!languageOpen)} aria-label={t('navbar.language')} aria-expanded={languageOpen} aria-controls="language-menu" className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"><FaGlobe aria-hidden="true" /></button>
            {languageOpen && <div id="language-menu" className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
              {['en', 'sv'].map(lng => <button key={lng} lang={lng} onClick={() => { i18n.changeLanguage(lng); setLanguageOpen(false); }} className="block min-h-11 w-full rounded-md px-4 text-left hover:bg-gray-100">{lng === 'en' ? 'English' : 'Svenska'}</button>)}
            </div>}
          </div>
          <a href={ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100">{t('mana.my_account')}</a>
          <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 lg:inline-flex">{t('navbar.try_us')}</a>
          <button ref={menuButtonRef} onClick={() => { setMenuOpen(!menuOpen); setLanguageOpen(false); }} aria-label={t(menuOpen ? 'navbar.close_menu' : 'navbar.open_menu')} aria-controls="mobile-menu" aria-expanded={menuOpen} className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 lg:hidden">{menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}</button>
        </div>
      </div>
      {menuOpen && <div id="mobile-menu" className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-gray-100 bg-white p-4 lg:hidden">
        <div className="flex flex-col gap-1">{links.map(([url, key]) => <NavLink key={url} to={url} onClick={() => setMenuOpen(false)} className={navClass}>{t(`navbar.${key}`)}</NavLink>)}</div>
        <a href={TRIAL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="mt-4 flex min-h-12 items-center justify-center rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white">{t('navbar.try_us')}</a>
      </div>}
    </nav>
  );
}
