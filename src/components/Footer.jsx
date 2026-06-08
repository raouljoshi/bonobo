import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { BOOKING_URL } from '../utils/booking';

const Footer = () => (
  <footer className="bg-ink text-warm-white">
    {/* Top strip */}
    <div className="border-b border-warm-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <p className="font-display font-bold text-xl tracking-tight">Bonobo Gym</p>
          <p className="mt-3 text-warm-white/50 text-sm leading-relaxed">
            Improvement by Movement.<br />
            Small-group coaching, personal training,<br />
            and VALD HumanTrak movement analysis.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.instagram.com/bonobogym/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-warm-white/40 hover:text-amber transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/bonobogym/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-warm-white/40 hover:text-amber transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        </div>

        {/* Paths */}
        <div>
          <p className="label-mono text-warm-white/30 mb-4">Paths</p>
          <ul className="space-y-2.5">
            {[
              { label: 'For Individuals',    to: '/for-individuals' },
              { label: 'For Teams',  to: '/for-teams' },
              { label: 'For Enterprises',    to: '/for-enterprises' },
              { label: 'About',              to: '/about' },
              { label: 'Contact',            to: '/contact' },
            ].map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-warm-white/60 hover:text-amber transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <p className="label-mono text-warm-white/30 mb-4">Hours</p>
          <ul className="space-y-2 text-sm text-warm-white/60">
            <li>Mon – Fri: 06:00 – 20:00</li>
            <li>Saturday: 09:00 – 14:00</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label-mono text-warm-white/30 mb-4">Find us</p>
          <address className="not-italic text-sm text-warm-white/60 space-y-2">
            <p>Kvarnholmsvägen 77<br />131 31 Nacka<br />Stockholm, Sweden</p>
            <p>
              <a href="mailto:mark@bonobogym.com" className="hover:text-amber transition-colors">
                mark@bonobogym.com
              </a>
            </p>
            <p>
              <a href="tel:+46736426292" className="hover:text-amber transition-colors">
                073 642 62 92
              </a>
            </p>
          </address>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-5 py-3 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
          >
            Book a consultation
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
      <p className="text-xs text-warm-white/30">
        © {new Date().getFullYear()} Bonobo Gym. Kvarnholmen, Nacka · Stockholm.
      </p>
      <p className="text-xs text-warm-white/20 font-mono">
        Powered by VALD HumanTrak
      </p>
    </div>
  </footer>
);

export default Footer;
