import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import resistImg from '../assets/images/resistance training.JPEG';
import boxImg    from '../assets/images/box.JPEG';
import { BOOKING_URL, SHOP_URL } from '../utils/booking';

/* ── Helpers ────────────────────────────────────────── */
const MonoLabel = ({ children, light = false }) => (
  <span className={`label-mono ${light ? 'text-warm-white/40' : 'text-ink-muted'}`}>{children}</span>
);
const AmberRule = () => <span className="block w-8 h-0.5 bg-amber" />;

/* ──────────────────────────────────────────────────────
   INLINE CLASS SCHEDULE
   ─────────────────────────────────────────────────── */
const CLASS_COLORS = {
  'Strength & Conditioning': { dot: 'bg-amber',        label: 'text-amber'        },
  'Movement':                { dot: 'bg-teal-500',      label: 'text-teal-600'     },
  'Strong Mama':             { dot: 'bg-rose-500',      label: 'text-rose-600'     },
  'Plus Power':              { dot: 'bg-violet-500',    label: 'text-violet-600'   },
  'Youth Class':             { dot: 'bg-orange-400',    label: 'text-orange-500'   },
  'Funky Monkeys':           { dot: 'bg-orange-400',    label: 'text-orange-500'   },
};

const SCHEDULE = [
  { day: 'Monday',    classes: [
    { name: 'Strong Mama',             time: '10:30–11:30' },
    { name: 'Strength & Conditioning', time: '12:00–13:00' },
    { name: 'Strength & Conditioning', time: '17:30–18:30' },
  ]},
  { day: 'Tuesday',   classes: [
    { name: 'Strength & Conditioning', time: '06:30–07:15' },
    { name: 'Plus Power',              time: '10:00–11:00' },
    { name: 'Strength & Conditioning', time: '12:00–13:00' },
    { name: 'Youth Class',             time: '16:00–16:50' },
    { name: 'Strength & Conditioning', time: '17:30–18:30' },
  ]},
  { day: 'Wednesday', classes: [
    { name: 'Strength & Conditioning', time: '12:00–13:00' },
    { name: 'Strength & Conditioning', time: '17:30–18:30' },
  ]},
  { day: 'Thursday',  classes: [
    { name: 'Strength & Conditioning', time: '06:30–07:15' },
    { name: 'Plus Power',              time: '10:00–11:00' },
    { name: 'Strength & Conditioning', time: '12:00–13:00' },
    { name: 'Youth Class',             time: '16:00–16:50' },
    { name: 'Strength & Conditioning', time: '17:30–18:30' },
  ]},
  { day: 'Friday',    classes: [
    { name: 'Strength & Conditioning', time: '11:30–12:15' },
    { name: 'Strength & Conditioning', time: '12:15–13:00' },
  ]},
  { day: 'Saturday',  classes: [
    { name: 'Strength & Conditioning', time: '10:00–11:00' },
    { name: 'Strength & Conditioning', time: '11:00–12:00' },
  ]},
  { day: 'Sunday',    classes: [
    { name: 'Funky Monkeys',           time: '10:00–10:50' },
  ]},
];

const ClassRow = ({ name, time }) => {
  const style = CLASS_COLORS[name] || { dot: 'bg-fog', label: 'text-ink-muted' };
  return (
    <div className="flex items-center gap-4 py-3 border-b border-fog last:border-0">
      <span className={`flex-shrink-0 w-2 h-2 rounded-full ${style.dot}`} />
      <span className="font-mono text-xs text-ink-muted w-24 flex-shrink-0">{time}</span>
      <span className={`font-display font-semibold text-sm ${style.label}`}>{name}</span>
    </div>
  );
};

const DayRow = ({ day, classes, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-fog last:border-0">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-bone/50 transition-colors">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-ink text-sm w-24 text-left">{day}</span>
          <span className="text-xs text-ink-muted">{classes.length} class{classes.length !== 1 ? 'es' : ''}</span>
        </div>
        <span className="text-amber font-mono text-sm">{open ? '−' : '+'}</span>
      </button>
      <div className="overflow-hidden transition-all duration-300 bg-warm-white"
        style={{ maxHeight: open ? `${classes.length * 56 + 16}px` : '0' }}>
        <div className="px-6 pb-2">
          {classes.map((c) => <ClassRow key={`${c.name}-${c.time}`} {...c} />)}
        </div>
      </div>
    </div>
  );
};

const ClassScheduleInline = () => (
  <div className="border border-fog bg-warm-white">
    <div className="px-6 py-4 border-b border-fog flex flex-wrap items-center justify-between gap-3">
      <p className="font-display font-bold text-ink text-sm">Weekly schedule</p>
      <div className="flex flex-wrap gap-3">
        {[
          { key: 'S&C',        dot: 'bg-amber' },
          { key: 'Movement',   dot: 'bg-teal-500' },
          { key: 'Mama',       dot: 'bg-rose-500' },
          { key: 'Plus Power', dot: 'bg-violet-500' },
          { key: 'Youth',      dot: 'bg-orange-400' },
        ].map(({ key, dot }) => (
          <span key={key} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />{key}
          </span>
        ))}
      </div>
    </div>
    {SCHEDULE.map((d, i) => (
      <DayRow key={d.day} day={d.day} classes={d.classes} defaultOpen={i < 2} />
    ))}
  </div>
);

/* ── Plan card ──────────────────────────────────────── */
const PlanCard = ({ name, price, priceSuffix, tag, description, features, cta, ctaHref, highlight = false }) => (
  <div className={`flex flex-col p-8 border transition-all duration-300 ${
    highlight ? 'bg-ink text-warm-white border-amber' : 'bg-warm-white text-ink border-fog hover:border-amber/50'
  }`}>
    {tag && (
      <div className="mb-4">
        <span className={`label-mono px-2 py-1 text-[10px] ${highlight ? 'bg-amber text-ink' : 'bg-amber-pale text-amber-deep'}`}>{tag}</span>
      </div>
    )}
    <h3 className={`font-display font-bold text-2xl ${highlight ? 'text-amber' : 'text-ink'}`}>{name}</h3>
    <p className={`mt-4 text-sm leading-relaxed ${highlight ? 'text-warm-white/60' : 'text-ink-muted'}`}>{description}</p>
    <div className="mt-6 py-6 border-t border-b border-current/10">
      <span className={`font-display font-bold text-4xl ${highlight ? 'text-warm-white' : 'text-ink'}`}>{price}</span>
      <span className={`ml-1 text-sm ${highlight ? 'text-warm-white/50' : 'text-ink-muted'}`}>{priceSuffix}</span>
    </div>
    <ul className="mt-6 flex-grow space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm">
          <span className="text-amber mt-0.5 flex-shrink-0">✓</span>
          <span className={highlight ? 'text-warm-white/80' : 'text-ink-soft'}>{f}</span>
        </li>
      ))}
    </ul>
    <a href={ctaHref || SHOP_URL} target="_blank" rel="noopener noreferrer"
      className={`mt-8 block text-center px-5 py-3.5 font-display font-bold text-sm tracking-wide transition-colors duration-200 ${
        highlight ? 'bg-amber text-ink hover:bg-scan' : 'bg-ink text-warm-white hover:bg-amber'
      }`}>
      {cta}
    </a>
  </div>
);

/* ── Assessment card ────────────────────────────────── */
const AssessmentCard = ({ name, duration, includes, memberPrice, nonMemberPrice, ctaLabel, highlight = false }) => (
  <div className={`border p-8 flex flex-col ${highlight ? 'border-amber bg-warm-white/10' : 'border-fog bg-warm-white'}`}>
    <div className="flex items-start justify-between gap-4 mb-2">
      <h4 className={`font-display font-bold text-xl ${highlight ? 'text-warm-white' : 'text-ink'}`}>{name}</h4>
      {highlight && <span className="label-mono bg-amber text-ink px-2 py-1 text-[10px]">Most booked</span>}
    </div>
    <p className={`label-mono mb-6 ${highlight ? 'text-warm-white/50' : 'text-ink-muted'}`}>{duration}</p>
    <ul className="flex-grow space-y-2 mb-8">
      {includes.map((item) => (
        <li key={item} className={`flex items-start gap-2 text-sm ${highlight ? 'text-warm-white/75' : 'text-ink-soft'}`}>
          <span className="text-amber mt-0.5">–</span>{item}
        </li>
      ))}
    </ul>
    <div className={`grid grid-cols-2 gap-4 mb-6 p-4 ${highlight ? 'bg-warm-white/10' : 'bg-bone'}`}>
      <div>
        <p className={`label-mono mb-1 ${highlight ? 'text-warm-white/40' : 'text-ink-muted'}`}>Member</p>
        <p className={`font-display font-bold text-lg ${highlight ? 'text-warm-white' : 'text-ink'}`}>{memberPrice}</p>
      </div>
      <div>
        <p className={`label-mono mb-1 ${highlight ? 'text-warm-white/40' : 'text-ink-muted'}`}>Non-member</p>
        <p className={`font-display font-bold text-lg ${highlight ? 'text-warm-white' : 'text-ink'}`}>{nonMemberPrice}</p>
      </div>
    </div>
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
      className={`block text-center px-5 py-3.5 font-display font-bold text-sm tracking-wide transition-colors duration-200 ${
        highlight ? 'bg-amber text-ink hover:bg-scan' : 'bg-ink text-warm-white hover:bg-amber'
      }`}>
      {ctaLabel}
    </a>
  </div>
);

/* ── Pack card ──────────────────────────────────────── */
const PackCard = ({ sessions, useCase, price, pricePerSession }) => (
  <div className="border border-fog p-6 bg-warm-white hover:border-amber/60 transition-colors duration-300">
    <div className="flex items-center justify-between mb-4">
      <span className="font-display font-bold text-3xl text-ink">{sessions}</span>
      <span className="label-mono text-ink-muted">sessions</span>
    </div>
    <p className="text-sm text-ink-muted leading-relaxed mb-6">{useCase}</p>
    <div className="pt-4 border-t border-fog">
      <p className="font-display font-bold text-2xl text-ink">{price}</p>
      <p className="text-xs text-ink-muted mt-1">{pricePerSession} per session</p>
    </div>
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
      className="mt-4 block text-center py-3 border border-ink text-ink font-display font-bold text-sm hover:bg-ink hover:text-warm-white transition-colors duration-200">
      Enquire
    </a>
  </div>
);

/* ── Accordion ──────────────────────────────────────── */
const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-fog last:border-0">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex justify-between items-start py-5 text-left gap-6">
        <span className="font-display font-semibold text-ink">{q}</span>
        <span className="text-amber text-xl flex-shrink-0 mt-0.5">{open ? '−' : '+'}</span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '500px' : '0' }}>
        <p className="text-ink-muted leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const ForIndividuals = () => (
  <div>

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative bg-ink overflow-hidden">
      <img src={resistImg} alt="Individual training at Bonobo"
        className="absolute inset-0 w-full h-full object-cover opacity-55 select-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-40">
        <div className="flex items-center gap-3 mb-8">
          <AmberRule />
          <MonoLabel light>For Individuals</MonoLabel>
        </div>
        <h1 className="font-display font-extrabold text-warm-white text-4xl sm:text-6xl lg:text-7xl leading-tight max-w-2xl">
          Find the training path that fits you.
        </h1>
        <p className="mt-6 text-warm-white/60 text-lg max-w-lg leading-relaxed">
          Whether you're new to training, returning after time off, or looking for measurable progress — Bonobo has a clear path for you.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200">
            Book a consultation →
          </a>
          <a href="#memberships"
            className="inline-flex items-center gap-2 px-6 py-4 border border-warm-white/25 text-warm-white/80 font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-all duration-200">
            View memberships
          </a>
        </div>
      </div>
    </section>

    {/* ── INTRODUCTORY CONSULTATION (compact strip) ────── */}
    <section className="bg-amber">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div>
            <p className="label-mono text-ink/50">New to Bonobo? Start here</p>
            <p className="font-display font-bold text-ink text-base lg:text-lg mt-0.5">
              Introductory Consultation — Movement Snapshot + first PT session
            </p>
            <p className="text-ink/60 text-xs mt-0.5">Snapshot cost credited toward your first month if you join.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 flex-shrink-0">
          <span className="font-display font-bold text-ink text-2xl">1 790 kr</span>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-ink-soft transition-colors duration-200 whitespace-nowrap">
            Book →
          </a>
        </div>
      </div>
    </section>

    {/* ── CLASSES ──────────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-b border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <AmberRule />
          <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink">Classes</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">
            All adult classes are coached by Mark or Maja. Maximum 14 people per session — small enough for coaching attention, large enough for energy. Every class is instructor-led with attention to each person's ability and goals.
          </p>
          <ul className="mt-8 space-y-0 divide-y divide-fog">
            {[
              { name: 'Strength & Conditioning', detail: 'The core adult class. Functional strength with progressive weekly programming.', dot: 'bg-amber' },
              { name: 'Movement',                detail: 'Mobility, flexibility, and movement quality. Pairs well with S&C.',             dot: 'bg-teal-500' },
              { name: 'Plus Power',              detail: 'Adapted training for all abilities. Inclusive and purposeful.',                 dot: 'bg-violet-500' },
              { name: 'Strong Mama',             detail: 'Pre- and post-natal coaching with Maja.',                                      dot: 'bg-rose-500' },
              { name: 'Youth & Funky Kids',      detail: 'Ages 6–17. Movement, play, and confidence-building.',                         dot: 'bg-orange-400' },
            ].map(({ name, detail, dot }) => (
              <li key={name} className="flex items-start gap-4 py-4">
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${dot} mt-2`} />
                <div>
                  <p className="font-display font-semibold text-ink">{name}</p>
                  <p className="text-sm text-ink-muted mt-0.5">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono text-ink-muted mb-4">Weekly schedule</p>
          <ClassScheduleInline />
          <p className="mt-4 text-xs text-ink-muted">
            Times are in local Stockholm time. Schedule subject to change — check{' '}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-amber underline underline-offset-2">
              the booking system
            </a>{' '}
            for live availability.
          </p>
        </div>
      </div>
    </section>

    {/* ── HUMANTRAK — INDIVIDUALS ──────────────────────── */}
    <section className="bg-warm-white py-20 lg:py-28 border-b border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: photo */}
        <div className="relative">
          <img
            src="https://images.ctfassets.net/98s79sqwuajy/5jYuLIejrNSJNMyCEzxaIX/05e2cd290d2c28030b14a62275f948f3/Brodie_HT_Updated.png"
            alt="VALD HumanTrak movement analysis in use"
            className="w-full object-cover"
          />
          <p className="mt-2 text-xs text-ink-muted">
            Image: VALD Performance ·{' '}
            <a href="https://valdperformance.com/products/humantrak" target="_blank" rel="noopener noreferrer" className="hover:text-amber underline underline-offset-2">
              valdperformance.com/products/humantrak
            </a>
          </p>
        </div>
        {/* Right: copy */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AmberRule />
            <MonoLabel>VALD HumanTrak</MonoLabel>
          </div>
          <h2 className="mt-4 font-display font-bold text-3xl lg:text-5xl text-ink leading-tight">
            Intuitive and powerful.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            HumanTrak is a markerless 3D motion-capture system that measures how your joints translate and rotate during movement. A single depth-sensing camera. No wearables, no lab. Set up in minutes.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            At Bonobo, we use it to give you an objective movement baseline — three clear training priorities derived from real data, not a trainer's impression of how you move.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px bg-fog">
            {[
              { title: 'Markerless capture',       body: 'No sensors or wearables. Show up and move normally.' },
              { title: 'Real-time feedback',        body: 'See your joint angles and range on screen during the test.' },
              { title: 'Three clear priorities',    body: 'Every assessment ends with three things to act on — not a long list.' },
              { title: 'Retest and compare',        body: 'Each follow-up scan shows exactly what changed since your baseline.' },
            ].map(({ title, body }) => (
              <div key={title} className="bg-bone p-5">
                <p className="font-display font-bold text-sm text-ink mb-1">{title}</p>
                <p className="text-ink-muted text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-200">
              Book a Movement Assessment →
            </a>
            <a href="https://valdperformance.com/products/humantrak" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-fog text-ink font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-colors duration-200">
              About HumanTrak →
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── MEMBERSHIPS ─────────────────────────────────── */}
    <section id="memberships" className="bg-bone py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-5xl text-ink mb-4">Memberships</h2>
        <p className="text-ink-muted max-w-xl mb-14 leading-relaxed">
          Three tiers — pick the one that matches how closely you want Mark involved.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-fog">
          <PlanCard
            name="Core"
            price="1 190 kr"
            priceSuffix="/ month"
            description="The clean base membership. Everything you need to train consistently in a small, coached group."
            features={[
              'Unlimited adult group classes',
              'Small-group coaching (max 14)',
              'Weekly programming',
              'Access to all gym equipment',
              'Member pricing on HumanTrak assessments',
              'Member pricing on PT sessions',
            ]}
            cta="Discuss Core"
            ctaHref={BOOKING_URL}
          />
          <PlanCard
            name="Longevity"
            price="1 590 kr"
            priceSuffix="/ month"
            tag="Recommended"
            description="Train with quarterly measurement and review. Four scans + four review sessions per year — concrete and trackable."
            features={[
              'Everything in Core',
              '4 × HumanTrak scans per year',
              '4 × PT or movement review sessions per year',
              '4 × updated priority plans per year',
              'One-page report after each scan',
              'Retest after 8–12 weeks',
              'Member pricing on extra PT',
            ]}
            cta="Discuss Longevity"
            ctaHref={BOOKING_URL}
            highlight
          />
          <PlanCard
            name="Coaching"
            price="1 990 kr"
            priceSuffix="/ month"
            description="Train with regular Mark accountability. Monthly PT sessions plus full Longevity benefits."
            features={[
              'Everything in Longevity',
              'Monthly PT sessions',
              'Quarterly HumanTrak scan',
              'Online training program',
              'Weekly message check-in',
              'Priority scheduling',
            ]}
            cta="Discuss Coaching"
            ctaHref={BOOKING_URL}
          />
        </div>
        <p className="mt-6 text-center text-sm text-ink-muted">
          New to Bonobo? Start with the{' '}
          <a href="#intro-consultation" className="text-amber underline underline-offset-2">
            Introductory Consultation
          </a>{' '}
          (Movement Snapshot + first PT · 1 790 kr) — Snapshot cost credited toward your first month.
        </p>
      </div>
    </section>

    {/* ── HUMANTRAK ASSESSMENTS ─────────────────────────── */}
    <section className="bg-ink py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <AmberRule />
          <MonoLabel light>Movement Assessments</MonoLabel>
        </div>
        <h2 className="font-display font-bold text-3xl lg:text-5xl text-warm-white mb-4 text-balance">
          No membership required.
        </h2>
        <p className="text-warm-white/50 max-w-xl mb-16 leading-relaxed">
          Book a standalone HumanTrak assessment at any time. Members receive discounted pricing on all assessments.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-warm-white/10">
          <AssessmentCard
            name="Movement Snapshot"
            duration="3–5 tests · 30 min"
            includes={[
              '3–5 targeted movement tests',
              'Real-time visual feedback',
              'Short post-test explanation',
              'One-page summary report',
            ]}
            memberPrice="690 kr"
            nonMemberPrice="890 kr"
            ctaLabel="Book Snapshot"
          />
          <AssessmentCard
            name="Movement Profile"
            duration="Full battery · 60 min"
            includes={[
              'Full VALD test battery',
              '3D joint analysis — all planes',
              'Three training priorities',
              'Full VALD report',
              'Training recommendation',
            ]}
            memberPrice="1 190 kr"
            nonMemberPrice="1 490 kr"
            ctaLabel="Book Profile"
            highlight
          />
          <AssessmentCard
            name="Profile + PT"
            duration="Full profile + 1 PT · 90 min"
            includes={[
              'Full Movement Profile',
              'Mark reviews your results',
              '45-minute follow-up PT session',
              'Training priorities reinforced in person',
            ]}
            memberPrice="1 990 kr"
            nonMemberPrice="2 390 kr"
            ctaLabel="Book Profile + PT"
          />
        </div>
        <div className="mt-10 p-7 border border-amber/20 bg-warm-white/5">
          <h4 className="font-display font-bold text-warm-white mb-2">Not sure which assessment to book?</h4>
          <p className="text-warm-white/50 text-sm leading-relaxed mb-4">
            If you're new to Bonobo, the <strong className="text-warm-white">Introductory Consultation</strong> (Movement Snapshot + first PT · 1 790 kr) is the right starting point — Snapshot cost credited toward membership.
            If you want the full picture, the <strong className="text-warm-white">Movement Profile</strong> covers all joints across all planes.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber font-display font-bold text-sm hover:underline">
            Ask Mark about this assessment →
          </a>
        </div>
      </div>
    </section>

    {/* ── PT & PACKS ───────────────────────────────────── */}
    <section className="bg-warm-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-4">Personal Training & Packs</h2>
        <p className="text-ink-muted max-w-xl mb-12 leading-relaxed">
          Single sessions or packs — each sized around a clear training purpose, not just a discount.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fog">
          <PackCard sessions="1"  useCase="A focused session to address one priority from your assessment." price="1 190 kr"  pricePerSession="1 190 kr" />
          <PackCard sessions="5"  useCase="Fix a specific weakness. Five sessions to address a concrete priority." price="4 790 kr"  pricePerSession="958 kr" />
          <PackCard sessions="10" useCase="Build a training phase. Ten sessions to complete a structured block."  price="7 690 kr"  pricePerSession="769 kr" />
          <PackCard sessions="20" useCase="A longer-term coaching commitment. Two full training phases."            price="12 190 kr" pricePerSession="609 kr" />
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          All PT sessions are 45–60 minutes with Mark.{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-amber underline underline-offset-2">Enquire about scheduling</a>.
        </p>
      </div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-t border-fog">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl text-ink mb-10">Common questions</h2>
        {[
          { q: 'Do I need a membership to book a HumanTrak assessment?',
            a: 'No. The Movement Snapshot and Movement Profile are available to non-members. Non-member prices are listed on each card. If you join after your assessment, the cost can be credited toward your first month — ask Mark when you book.' },
          { q: 'What\'s the difference between the Snapshot and the full Profile?',
            a: 'The Snapshot is 3–5 targeted tests — quick and useful if you have a specific concern. The full Profile covers your whole movement system: all joints, all planes, three priorities, and a full VALD report. The Introductory Consultation uses the Snapshot format and pairs it with a first PT session for 1 790 kr.' },
          { q: 'Can I upgrade from Core to Longevity later?',
            a: 'Yes. You can change your membership tier at any time. Mark will walk you through the transition and pro-rate accordingly.' },
          { q: 'Are there clip cards if I just want to drop in occasionally?',
            a: 'Yes. 10-class clip cards are available — the right option if you\'re not ready for a monthly membership.' },
          { q: 'How many people are in each class?',
            a: 'Maximum 14 per session. Small enough that the instructor knows your name, your movement history, and can adapt the session to what you need that day.' },
        ].map(({ q, a }) => <Accordion key={q} q={q} a={a} />)}
      </div>
    </section>

    {/* ── FINAL CTA ────────────────────────────────────── */}
    <section className="bg-ink py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <h2 className="font-display font-bold text-3xl lg:text-5xl text-warm-white mb-6 text-balance">
          Ready to find your baseline?
        </h2>
        <p className="text-warm-white/50 max-w-lg mx-auto leading-relaxed mb-10">
          Book the Introductory Consultation — a Movement Snapshot and first PT session for 1 790 kr. Leave with a clear plan.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-5 bg-amber text-ink font-display font-bold text-base tracking-wide hover:bg-scan transition-colors duration-200">
          Book Introductory Consultation →
        </a>
      </div>
    </section>

  </div>
);

export default ForIndividuals;
