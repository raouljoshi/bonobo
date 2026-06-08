import React from 'react';
import outdoorImg from '../assets/images/outdoor exercise 3.JPEG';
import { BOOKING_URL } from '../utils/booking';

const AmberRule = ({ light = false }) => (
  <span className={`block w-8 h-0.5 ${light ? 'bg-amber' : 'bg-amber'}`} />
);
const MonoLabel = ({ children, light = false }) => (
  <span className={`label-mono ${light ? 'text-warm-white/40' : 'text-ink-muted'}`}>
    {children}
  </span>
);

/* ── Problem card ────────────────────────────────────── */
const ProblemCard = ({ icon, headline, detail }) => (
  <div className="p-6 bg-warm-white border border-fog hover:border-amber/40 transition-colors duration-300">
    <span className="text-2xl block mb-3">{icon}</span>
    <p className="font-display font-bold text-ink mb-2">{headline}</p>
    <p className="text-sm text-ink-muted leading-relaxed">{detail}</p>
  </div>
);

/* ── Offer block ─────────────────────────────────────── */
const OfferBlock = ({ number, title, description, includes }) => (
  <div className="grid lg:grid-cols-3 gap-8 py-10 border-b border-fog last:border-0">
    <div>
      <span className="font-mono text-amber/50 text-xs tracking-widest">{number}</span>
      <h3 className="font-display font-bold text-2xl text-ink mt-2">{title}</h3>
      <p className="text-ink-muted text-sm leading-relaxed mt-3">{description}</p>
    </div>
    <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
      {includes.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
          <span className="text-amber mt-0.5 flex-shrink-0">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* ── Page ─────────────────────────────────────────────── */
const ForEnterprises = () => (
  <div>

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative bg-ink overflow-hidden">
      <img
        src={outdoorImg}
        alt="Enterprise wellbeing with Bonobo"
        className="absolute inset-0 w-full h-full object-cover opacity-55 select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-40">
        <div className="flex items-center gap-3 mb-8">
          <AmberRule light />
          <MonoLabel light>For Enterprises</MonoLabel>
        </div>
        <h1 className="font-display font-extrabold text-warm-white text-4xl sm:text-6xl lg:text-7xl leading-tight max-w-2xl">
          A movement programme your team will actually use.
        </h1>
        <p className="mt-6 text-warm-white/60 text-lg max-w-lg leading-relaxed">
          More concrete than a wellness talk. More memorable than a yoga morning. Bonobo Corporate Movement programmes are built on objective VALD HumanTrak data and delivered by a professional coach.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:mark@bonobogym.com?subject=Corporate movement day enquiry`}
            className="inline-flex items-center gap-2 px-6 py-4 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
          >
            Enquire for company pricing →
          </a>
        </div>
      </div>
    </section>

    {/* ── WORKPLACE PROBLEM ────────────────────────────── */}
    <section className="bg-warm-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-4 text-balance">
          The problem in most workplaces.
        </h2>
        <p className="text-ink-muted max-w-xl mb-12 leading-relaxed">
          Desk-heavy work, hybrid schedules, and sedentary habits produce predictable patterns: restricted range, asymmetric load, poor energy. Most wellbeing interventions talk about this. Bonobo measures it and shows people what's actually happening in their body.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fog">
          <ProblemCard
            icon="🖥️"
            headline="Desk-heavy work"
            detail="Hours of sitting compress the hip flexors, round the thoracic spine, and reduce overall range of motion."
          />
          <ProblemCard
            icon="⚡"
            headline="Low movement quality"
            detail="People move less, not just less often. Quality declines without objective measurement and feedback."
          />
          <ProblemCard
            icon="🔋"
            headline="Energy and recovery"
            detail="Physical restriction feeds into fatigue, concentration, and resilience — not just injury risk."
          />
          <ProblemCard
            icon="📊"
            headline="No baseline"
            detail="Without a movement baseline, it's impossible to know what's improving and what's getting worse."
          />
        </div>
      </div>
    </section>

    {/* ── HUMANTRAK — ENTERPRISES ─────────────────────── */}
    <section className="bg-ink py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <AmberRule light />
              <MonoLabel light>VALD HumanTrak</MonoLabel>
            </div>
            <h2 className="mt-4 font-display font-bold text-3xl lg:text-5xl text-warm-white leading-tight">
              Movement data for your workforce.
            </h2>
            <p className="mt-6 text-warm-white/60 leading-relaxed">
              HumanTrak is a markerless 3D motion-capture system that measures how joints translate and rotate during movement. No wearables. No lab. Set up in minutes — in your office, a meeting room, or at Bonobo in Nacka.
            </p>
            <p className="mt-4 text-warm-white/60 leading-relaxed">
              For companies, it transforms a wellness day from a talk and a stretch into an objective, individual assessment. Each employee leaves with real data — not a general recommendation — and a clear understanding of what their body needs.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-warm-white/10">
              {[
                { title: 'No setup overhead',         body: 'Single camera, deploys anywhere. No wearables, no markers, no prep time per person.' },
                { title: 'Individual reports',         body: 'Every participant receives their own one-page report with three movement priorities.' },
                { title: 'Team-level summary',         body: 'Aggregated findings for HR or wellbeing leads — written for non-specialists.' },
                { title: 'Retest to show ROI',         body: 'A follow-up screen 8–12 weeks later demonstrates what has actually changed.' },
              ].map(({ title, body }) => (
                <div key={title} className="bg-warm-white/5 p-5">
                  <p className="font-display font-bold text-sm text-warm-white mb-1">{title}</p>
                  <p className="text-warm-white/50 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <a href="https://valdperformance.com/products/humantrak" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-amber font-display font-bold text-sm hover:underline">
              About VALD HumanTrak →
            </a>
          </div>
          {/* Right: image */}
          <div>
            <img
              src="https://images.ctfassets.net/98s79sqwuajy/5jYuLIejrNSJNMyCEzxaIX/05e2cd290d2c28030b14a62275f948f3/Brodie_HT_Updated.png"
              alt="VALD HumanTrak movement analysis"
              className="w-full object-cover"
            />
            <p className="mt-2 text-xs text-warm-white/25">
              Image: VALD Performance ·{' '}
              <a href="https://valdperformance.com/products/humantrak" target="_blank" rel="noopener noreferrer"
                className="hover:text-amber/60 underline underline-offset-2">
                valdperformance.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── BONOBO OFFER ─────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-t border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-4">
          What Bonobo offers companies
        </h2>
        <p className="text-ink-muted max-w-xl mb-12 leading-relaxed">
          Three formats, all enquiry-led. We'll propose the right scope based on your team size, goals, and budget.
        </p>
        <div>
          <OfferBlock
            number="01"
            title="Corporate Movement Day"
            description="A half-day or full-day event for your team — combining movement education, hands-on assessments, and practical takeaways."
            includes={[
              'HumanTrak mini-screen for each participant',
              'Team-level movement themes and findings',
              'Practical movement habits session',
              'Individual one-page summary reports',
              'Q&A with Mark',
              'On-site at your office or at Bonobo in Nacka',
            ]}
          />
          <OfferBlock
            number="02"
            title="Leadership & Team Screening"
            description="A focused screening session for a smaller leadership group or team — each person leaves with a clear personal baseline."
            includes={[
              'Full HumanTrak test battery per person',
              '3D joint analysis',
              'Three personal movement priorities',
              'Individual reports',
              'Optional follow-up PT or coaching',
              'Typically 2–8 participants',
            ]}
          />
          <OfferBlock
            number="03"
            title="Ongoing Workplace Movement Programme"
            description="A structured programme across multiple sessions — baseline screening, coaching blocks, and retests to track progress."
            includes={[
              'Initial group screening',
              'Monthly or quarterly coaching sessions',
              'Retest to track change over time',
              'Updated priorities each cycle',
              'Reporting for HR or wellbeing leads',
              'Flexible format: on-site or at Bonobo',
            ]}
          />
        </div>
      </div>
    </section>

    {/* ── WHAT COMPANY GETS ────────────────────────────── */}
    <section className="bg-ink py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <AmberRule light />
            <MonoLabel light>Deliverables</MonoLabel>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-warm-white mb-8 text-balance">
            What your company takes away.
          </h2>
          <div className="space-y-0 divide-y divide-warm-white/10">
            {[
              {
                label: 'Tailored mini-screen',
                detail: '3–5 HumanTrak tests selected based on the team\'s typical movement patterns and work context.',
              },
              {
                label: 'Team-level movement themes',
                detail: 'A summary of the most common restrictions and patterns across the group — written so a non-specialist can understand it.',
              },
              {
                label: 'Practical movement habits',
                detail: 'Concrete adjustments employees can make at their desk, in meetings, or between calls — specific to what the screening finds.',
              },
              {
                label: 'Individual reports',
                detail: 'Each participant receives their own one-page report with three priorities. Confidential and owned by the individual.',
              },
              {
                label: 'Optional follow-up',
                detail: 'Individual Movement Profiles or PT sessions for employees who want to go deeper after the group day.',
              },
            ].map(({ label, detail }) => (
              <div key={label} className="flex items-start gap-6 py-6">
                <span className="text-amber font-mono mt-0.5 flex-shrink-0">→</span>
                <div>
                  <p className="font-display font-semibold text-warm-white">{label}</p>
                  <p className="text-warm-white/50 text-sm mt-1 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boundaries + CTA */}
        <div className="flex flex-col gap-8">
          {/* Boundaries */}
          <div className="border border-warm-white/10 p-8">
            <p className="label-mono text-warm-white/30 mb-4">What this is not</p>
            <p className="text-warm-white/60 leading-relaxed mb-4">
              Bonobo's corporate movement programme is not a medical service. We do not diagnose injury, predict clinical risk, or provide treatment.
            </p>
            <ul className="space-y-2">
              {[
                'Not a medical diagnosis',
                'Not an injury prediction service',
                'Not a replacement for physiotherapy or clinical care',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-warm-white/40">
                  <span className="text-warm-white/20 mt-0.5">×</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-warm-white/40 text-sm leading-relaxed">
              It is an objective movement baseline that gives individuals and teams concrete information about how they move — and practical priorities for improving it.
            </p>
          </div>

          {/* Pricing panel */}
          <div className="border border-amber/30 p-8 bg-warm-white/5">
            <p className="label-mono text-warm-white/30 mb-4">Pricing</p>
            <h3 className="font-display font-bold text-xl text-warm-white mb-3">Enquiry-led</h3>
            <p className="text-warm-white/60 text-sm leading-relaxed mb-6">
              Corporate pricing depends on team size, format (half-day/full-day/programme), and whether we travel to your site or host at Bonobo.
            </p>
            <a
              href={`mailto:mark@bonobogym.com?subject=Corporate movement day enquiry`}
              className="block text-center px-6 py-4 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
            >
              Enquire for company pricing →
            </a>
            <p className="mt-3 text-xs text-warm-white/20 text-center">
              Response within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── QUOTE ────────────────────────────────────────── */}
    <section className="bg-amber py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <p className="font-display font-bold text-ink text-2xl lg:text-3xl max-w-3xl mx-auto text-balance">
          "A practical wellbeing investment that's more concrete than a generic wellness talk — your team leaves knowing exactly what to work on."
        </p>
        <p className="mt-4 text-ink/60 label-mono">Bonobo Corporate Movement</p>
      </div>
    </section>

    {/* ── FINAL CTA ────────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-t border-fog">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-6 text-balance">
          Ready to invest in your team's movement?
        </h2>
        <p className="text-ink-muted leading-relaxed mb-10">
          Email Mark with your company name, approximate group size, and a brief outline of what you're looking for. He'll respond with a clear proposal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`mailto:mark@bonobogym.com?subject=Corporate movement day enquiry`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-200"
          >
            Enquire for company pricing →
          </a>
          <a
            href={`tel:+46736426292`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-fog text-ink font-display font-bold text-sm tracking-wide hover:border-amber hover:text-amber transition-colors duration-200"
          >
            Call Mark directly
          </a>
        </div>
      </div>
    </section>

  </div>
);

export default ForEnterprises;
