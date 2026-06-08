import React from 'react';
import { Link } from 'react-router-dom';
import plankImg      from '../assets/images/plank.jpg';
import kettleImg     from '../assets/images/kettlebells.JPEG';
import ringsImg      from '../assets/images/rings 1.JPEG';
import markImg       from '../assets/images/Mark instructor.jpg';
import outdoorImg    from '../assets/images/outdoor exercise 1.JPEG';
import { BOOKING_URL } from '../utils/booking';

/* ── Small reusable pieces ──────────────────────────── */

const MonoLabel = ({ children, light = false }) => (
  <span className={`label-mono ${light ? 'text-warm-white/40' : 'text-ink-muted'}`}>
    {children}
  </span>
);

const AmberRule = ({ light = false }) => (
  <span className={`block w-8 h-0.5 ${light ? 'bg-amber' : 'bg-amber'}`} />
);

/* ── HumanTrak scan SVG graphic ─────────────────────── */
const ScanGraphic = () => (
  <div className="relative w-full h-72 lg:h-96 flex items-center justify-center select-none">
    {/* Outer ring */}
    <svg
      viewBox="0 0 320 320"
      className="absolute inset-0 w-full h-full opacity-20"
      fill="none"
      stroke="#D97706"
      strokeWidth="0.5"
    >
      <circle cx="160" cy="160" r="140" />
      <circle cx="160" cy="160" r="100" />
      <circle cx="160" cy="160" r="60" />
      <line x1="20"  y1="160" x2="300" y2="160" />
      <line x1="160" y1="20"  x2="160" y2="300" />
      <line x1="60"  y1="60"  x2="260" y2="260" strokeDasharray="4 6" />
      <line x1="260" y1="60"  x2="60"  y2="260" strokeDasharray="4 6" />
    </svg>

    {/* Scan-line animation */}
    <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber to-transparent animate-scan opacity-70" />

    {/* Centre data */}
    <div className="relative z-10 text-center">
      <p className="font-mono text-amber text-3xl font-bold tracking-wider">3D</p>
      <p className="label-mono text-warm-white/60 mt-1">Joint analysis</p>
      <p className="font-mono text-warm-white/30 text-xs mt-4 leading-relaxed">
        MARKERLESS · REAL-TIME<br />VALD HUMANTRAK
      </p>
    </div>

    {/* Corner brackets */}
    {[['top-8 left-8', 'border-t border-l'], ['top-8 right-8', 'border-t border-r'],
      ['bottom-8 left-8', 'border-b border-l'], ['bottom-8 right-8', 'border-b border-r']].map(
      ([pos, border]) => (
        <span
          key={pos}
          className={`absolute ${pos} w-6 h-6 ${border} border-amber/60`}
        />
      )
    )}
  </div>
);

/* ── Audience path card ──────────────────────────────── */
const PathCard = ({ number, title, subtitle, description, to, tag }) => (
  <Link
    to={to}
    className="group flex flex-col p-8 border border-fog hover:border-amber/60 bg-warm-white hover:bg-bone transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-6">
      <span className="font-mono text-amber/60 text-xs tracking-widest">{number}</span>
      {tag && (
        <span className="label-mono bg-amber-pale text-amber-deep px-2 py-1">{tag}</span>
      )}
    </div>
    <p className="font-display font-bold text-2xl lg:text-3xl text-ink leading-tight mb-3 group-hover:text-amber transition-colors duration-300">
      {title}
    </p>
    <p className="text-amber font-display font-semibold text-sm mb-4">{subtitle}</p>
    <p className="text-ink-muted text-sm leading-relaxed flex-grow">{description}</p>
    <div className="mt-8 flex items-center gap-2 font-display font-bold text-sm text-ink group-hover:text-amber transition-colors duration-300">
      <span>Find your path</span>
      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
    </div>
  </Link>
);

/* ── Testimonial ──────────────────────────────────────── */
const Testimonial = ({ quote, author, detail }) => (
  <figure className="border-l-2 border-amber pl-6 py-1">
    <blockquote className="text-ink text-base leading-relaxed italic">"{quote}"</blockquote>
    <figcaption className="mt-4 text-ink-muted text-sm">
      <span className="font-semibold text-ink">{author}</span>
      {detail && <span className="text-ink-muted"> · {detail}</span>}
    </figcaption>
  </figure>
);

/* ── Stat block ───────────────────────────────────────── */
const Stat = ({ value, label }) => (
  <div>
    <p className="font-display font-bold text-4xl lg:text-5xl text-amber">{value}</p>
    <p className="mt-1 text-sm text-ink-muted leading-snug">{label}</p>
  </div>
);

/* ── Page ─────────────────────────────────────────────── */
const Home = () => (
  <div>

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-ink">
      {/* Background photo */}
      <img
        src={plankImg}
        alt="Training at Bonobo Gym"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60 select-none"
      />
      {/* Gradient — dark at bottom (text zone), lighter toward top so photo is visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 lg:pb-28 pt-32">
        {/* Location tag */}
        <div className="flex items-center gap-3 mb-10 animate-fade-up">
          <AmberRule light />
          <MonoLabel light>Nacka · Stockholm</MonoLabel>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-warm-white leading-[0.88] tracking-tight text-balance animate-fade-up animate-fade-up-delay-1">
          <span className="block text-5xl sm:text-7xl lg:text-[7.5rem]">Improvement</span>
          <span className="block text-5xl sm:text-7xl lg:text-[7.5rem] text-amber">by Movement.</span>
        </h1>

        {/* Sub-copy */}
        <p className="mt-8 text-warm-white/70 text-lg lg:text-xl max-w-xl leading-relaxed animate-fade-up animate-fade-up-delay-2">
          Small-group coaching, personal training, and VALD HumanTrak movement analysis — for individuals, teams, and workplaces.
        </p>

        {/* Path CTAs */}
        <div className="mt-10 flex flex-wrap gap-3 animate-fade-up animate-fade-up-delay-3">
          <Link
            to="/for-individuals"
            className="inline-flex items-center gap-3 bg-warm-white text-ink px-6 py-4 font-display font-bold text-sm tracking-wide hover:bg-amber hover:text-warm-white transition-all duration-300"
          >
            For Individuals <span>→</span>
          </Link>
          <Link
            to="/for-teams"
            className="inline-flex items-center gap-3 border border-warm-white/25 text-warm-white/80 px-6 py-4 font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-all duration-300"
          >
            For Teams <span>→</span>
          </Link>
          <Link
            to="/for-enterprises"
            className="inline-flex items-center gap-3 border border-warm-white/25 text-warm-white/80 px-6 py-4 font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-all duration-300"
          >
            For Enterprises <span>→</span>
          </Link>
        </div>
      </div>
    </section>

    {/* ── INTRO STATEMENT ─────────────────────────────── */}
    <section className="bg-warm-white border-b border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <AmberRule />
          <h2 className="mt-6 font-display font-bold text-3xl lg:text-5xl text-ink leading-tight text-balance">
            Not just a gym.<br />A coaching system.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Bonobo is built around one idea: that training gets better when you know exactly where you stand. Mark and the Bonobo team combine small-group classes, one-to-one personal training, and objective VALD HumanTrak movement analysis — so every session builds on real data, not guesswork.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <Stat value="Max 14" label="per class — coaching, not crowds" />
            <Stat value="100%"   label="recommendation rate on Facebook" />
            <Stat value="VALD"   label="HumanTrak movement analysis" />
          </div>
        </div>
        <div className="relative">
          <img
            src={ringsImg}
            alt="Training rings at Bonobo"
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber flex items-center justify-center">
            <span className="font-display font-bold text-ink text-center text-xs leading-tight uppercase tracking-wide">
              Improvement<br/>by Movement
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* ── THREE PATHS ──────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4 mb-4">
          <AmberRule />
          <MonoLabel>Choose your path</MonoLabel>
        </div>
        <h2 className="font-display font-bold text-3xl lg:text-4xl text-ink mb-12 text-balance">
          Every offer is built around<br className="hidden lg:block" /> how you arrive.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-fog">
          <PathCard
            number="01"
            title="For Individuals"
            subtitle="Train, measure, improve."
            description="Classes, memberships, personal training, and HumanTrak movement assessments — structured around your goals and schedule."
            to="/for-individuals"
            tag="Most popular"
          />
          <PathCard
            number="02"
            title="For Teams"
            subtitle="Screen your squad."
            description="Group movement screening, individual reports, and a coach summary your staff can actually use. Enquiry-led pricing."
            to="/for-teams"
          />
          <PathCard
            number="03"
            title="For Enterprises"
            subtitle="Invest in your people."
            description="Corporate Movement Days, leadership screening, and evidence-based workplace wellbeing — more concrete than a wellness talk."
            to="/for-enterprises"
          />
        </div>
      </div>
    </section>

    {/* ── HUMANTRAK SECTION ────────────────────────────── */}
    <section className="bg-ink py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: graphic */}
        <div className="order-2 lg:order-1">
          <ScanGraphic />
        </div>

        {/* Right: copy */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-6">
            <AmberRule light />
            <MonoLabel light>VALD HumanTrak</MonoLabel>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-5xl text-warm-white leading-tight text-balance">
            The science<br />behind every session.
          </h2>
          <p className="mt-6 text-warm-white/60 leading-relaxed">
            HumanTrak is a markerless 3D motion-capture system that measures how your joints translate and rotate during movement. No sensors. No markers. Set up in minutes, ready to test immediately.
          </p>
          <p className="mt-4 text-warm-white/60 leading-relaxed">
            At Bonobo, we use it to give you a Movement Snapshot or full Movement Profile — a clear, objective baseline that makes your training priorities obvious rather than estimated.
          </p>

          {/* Capability grid */}
          <div className="mt-10 grid grid-cols-2 gap-px bg-warm-white/10">
            {[
              { title: '3D joint analysis',       body: 'Peak angles, range of motion, and displacement measured in real time.' },
              { title: 'Markerless capture',       body: 'Single depth-sensing camera. No wearables, no lab setup.' },
              { title: 'Instant report',           body: 'Results and three clear priorities delivered after each session.' },
              { title: 'Track progress over time', body: 'Each retest shows exactly how you\'ve moved since your baseline.' },
            ].map(({ title, body }) => (
              <div key={title} className="bg-ink p-6 border border-warm-white/8">
                <p className="font-display font-bold text-sm text-amber mb-2">{title}</p>
                <p className="text-warm-white/50 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/for-individuals"
              className="inline-flex items-center gap-2 bg-amber text-ink px-6 py-3 font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
            >
              Book a Movement Assessment →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── COMMUNITY / SOCIAL PROOF ─────────────────────── */}
    <section className="bg-warm-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

        {/* Photo */}
        <div className="lg:col-span-2 relative">
          <img
            src={outdoorImg}
            alt="Bonobo community training outdoors"
            className="w-full aspect-[3/4] object-cover"
          />
          <div className="absolute top-6 right-6 bg-ink/90 text-warm-white px-4 py-3 text-center">
            <p className="font-display font-bold text-2xl text-amber">100%</p>
            <p className="label-mono text-warm-white/60 text-[10px] mt-1">Recommendation rate</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-2">
          <AmberRule />
          <h2 className="mt-4 font-display font-bold text-3xl lg:text-4xl text-ink text-balance">
            What members say about training here.
          </h2>
          <p className="mt-4 text-ink-muted leading-relaxed max-w-lg">
            Bonobo is built on a maximum of 10 people per class, where every session is led by an instructor who actually knows your name, your history, and your goals.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            <Testimonial
              quote="Classes are among the most intense I've done — the instructor explains everything extremely well and adapts to every level."
              author="ClassPass member"
              detail="Nacka"
            />
            <Testimonial
              quote="They provide all the equipment and the atmosphere makes you want to push harder. Unlike any other gym in Stockholm."
              author="Facebook review"
              detail="100% recommended"
            />
          </div>

          <div className="mt-10">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-300"
            >
              Try your first session →
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── MARK SECTION ────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-t border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <AmberRule />
          <h2 className="mt-6 font-display font-bold text-3xl lg:text-5xl text-ink leading-tight text-balance">
            Not sure where to start?
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            A consultation with Mark takes 20–30 minutes. Tell him what you want to improve and he'll recommend the right combination — membership, assessment, PT, or class. No pressure, no script.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            If you want a more concrete starting point, the Movement Start package combines a HumanTrak assessment with a follow-up PT session — so you leave with a clear baseline and a plan in hand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
            >
              Book a consultation
            </a>
            <Link
              to="/for-individuals"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-fog text-ink font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-colors duration-200"
            >
              View all individual offers
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={markImg}
            alt="Mark, head coach at Bonobo"
            className="w-full aspect-square object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bone to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="font-display font-bold text-ink text-lg">Mark</p>
            <p className="label-mono text-ink-muted">Head Coach & Founder</p>
          </div>
        </div>
      </div>
    </section>

  </div>
);

export default Home;
