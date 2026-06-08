import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bonoboLogo from '../assets/images/bonobo logo.JPEG';
import { BOOKING_URL } from '../utils/booking';

const NAV_LINKS = [
  { label: 'Home',               to: '/' },
  { label: 'For Individuals',    to: '/for-individuals' },
  { label: 'For Teams',          to: '/for-teams' },
  { label: 'For Enterprises',    to: '/for-enterprises' },
  { label: 'About',              to: '/about' },
  { label: 'Contact',            to: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (to) => location.pathname === to;

  return (
    <nav
      className={`sticky top-0 z-50 bg-warm-white transition-shadow duration-300 ${
        scrolled ? 'shadow-sm shadow-ink/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link to="/" aria-label="Bonobo Gym home" className="flex-shrink-0">
            <img
              src={bonoboLogo}
              alt="Bonobo Gym"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`relative px-3 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  isActive(to)
                    ? 'text-amber'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-amber" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-200"
            >
              Book a consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
          >
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${
                mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block h-px bg-ink transition-all duration-300 ${
                mobileOpen ? 'w-0 opacity-0' : 'w-6'
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 origin-center ${
                mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="bg-warm-white border-t border-fog px-5 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`block px-3 py-3 font-body text-base font-medium border-b border-fog/60 last:border-0 transition-colors ${
                isActive(to) ? 'text-amber' : 'text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center px-5 py-3.5 bg-ink text-warm-white font-display font-bold text-sm tracking-wide"
          >
            Book a consultation
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
