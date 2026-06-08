import React from 'react';
import outdoorImg from '../assets/images/outdoor exercise 2.JPEG';
import { BOOKING_URL } from '../utils/booking';

const AmberRule = ({ light = false }) => (
  <span className={`block w-8 h-0.5 ${light ? 'bg-amber' : 'bg-amber'}`} />
);
const MonoLabel = ({ children, light = false }) => (
  <span className={`label-mono ${light ? 'text-warm-white/40' : 'text-ink-muted'}`}>
    {children}
  </span>
);

/* ── Offer card ─────────────────────────────────────── */
const OfferCard = ({ title, description, includes, icon }) => (
  <div className="bg-warm-white border border-fog p-8 flex flex-col hover:border-amber/50 transition-colors duration-300">
    <span className="text-3xl mb-4">{icon}</span>
    <h3 className="font-display font-bold text-xl text-ink mb-3">{title}</h3>
    <p className="text-ink-muted text-sm leading-relaxed mb-6">{description}</p>
    <ul className="mt-auto space-y-2">
      {includes.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
          <span className="text-amber mt-0.5 flex-shrink-0">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* ── Deliverable row ─────────────────────────────────── */
const Deliverable = ({ label, detail }) => (
  <div className="flex items-start gap-6 py-5 border-b border-fog last:border-0">
    <span className="text-amber font-mono text-lg flex-shrink-0 mt-0.5">→</span>
    <div>
      <p className="font-display font-semibold text-ink">{label}</p>
      {detail && <p className="text-sm text-ink-muted mt-1">{detail}</p>}
    </div>
  </div>
);

/* ── Page ─────────────────────────────────────────────── */
const ForTeams = () => (
  <div>

    {/* ── HERO ─────────────────────────────────────────── */}
    <section className="relative bg-ink overflow-hidden">
      <img
        src={outdoorImg}
        alt="Team training at Bonobo"
        className="absolute inset-0 w-full h-full object-cover opacity-55 select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-40">
        <div className="flex items-center gap-3 mb-8">
          <AmberRule light />
          <MonoLabel light>For Teams</MonoLabel>
        </div>
        <h1 className="font-display font-extrabold text-warm-white text-4xl sm:text-6xl lg:text-7xl leading-tight max-w-2xl">
          Screen your squad. Give every player a clear baseline.
        </h1>
        <p className="mt-6 text-warm-white/60 text-lg max-w-lg leading-relaxed">
          Group movement screening using VALD HumanTrak — individual reports, a coach summary, and optional follow-up coaching for teams and clubs of any size.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:mark@bonobogym.com?subject=Team screening enquiry`}
            className="inline-flex items-center gap-2 px-6 py-4 bg-amber text-ink font-display font-bold text-sm tracking-wide hover:bg-scan transition-colors duration-200"
          >
            Enquire for team pricing →
          </a>
        </div>
      </div>
    </section>

    {/* ── YOUTUBE VIDEOS ──────────────────────────────── */}
    <section className="bg-ink">
      <div className="grid lg:grid-cols-2 gap-px bg-ink-soft/30">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/HnuNrtOa6rE"
            title="VALD HumanTrak team screening video 1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/xll8FIV-waM"
            title="VALD HumanTrak team screening video 2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </section>

    {/* ── GROUP NEED FRAMING ────────────────────────────── */}
    <section className="bg-warm-white py-16 lg:py-20 border-b border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <AmberRule />
          <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink text-balance">
            Why screen the whole team?
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Most training programs are built on assumption. A team screening answers the questions most coaches never get time to ask individually: who is restricted? Who is asymmetric? Who is ready for higher load, and who needs to build a foundation first?
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            HumanTrak gives every athlete their own report and three clear priorities — in less than an hour of group time. The coach gets a summary they can actually use to structure the next training block.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-fog">
          {[
            { stat: '< 1 hr',    label: 'Group screening time for a team of 10' },
            { stat: '3D',        label: 'Joint analysis across all movement planes' },
            { stat: 'Real-time', label: 'Feedback visible on-screen during testing' },
            { stat: '1 report',  label: 'Per athlete, delivered the same day' },
          ].map(({ stat, label }) => (
            <div key={stat} className="bg-warm-white p-8">
              <p className="font-display font-bold text-3xl text-amber">{stat}</p>
              <p className="mt-2 text-sm text-ink-muted leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── HUMANTRAK — TEAMS ────────────────────────────── */}
    <section className="bg-ink py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AmberRule light />
            <MonoLabel light>VALD HumanTrak</MonoLabel>
          </div>
          <h2 className="mt-4 font-display font-bold text-3xl lg:text-5xl text-warm-white leading-tight">
            Objective data. For every athlete.
          </h2>
          <p className="mt-6 text-warm-white/60 leading-relaxed">
            HumanTrak captures 3D joint motion using a single depth-sensing camera — no wearables, no lab setup, no specialist interpretation required during testing. Deploy it anywhere, get results immediately.
          </p>
          <p className="mt-4 text-warm-white/60 leading-relaxed">
            For teams, it closes the gap between what a coach observes and what is actually happening in each athlete's movement. The coach summary shows the most common restrictions across the squad — so programming can respond to real data, not informed guesswork.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-px bg-warm-white/10">
            {[
              { title: 'No wearables or markers',  body: 'Athletes show up and move. The camera captures everything in real time.' },
              { title: 'Per-athlete report',        body: 'Each player leaves with their own report and three priorities on paper.' },
              { title: 'Coach summary document',    body: 'Team-level movement themes, structured for training program decisions.' },
              { title: 'Retest in 8–12 weeks',      body: 'Follow-up screenings show exactly what changed and by how much.' },
            ].map(({ title, body }) => (
              <div key={title} className="flex items-start gap-5 p-5 bg-warm-white/5 hover:bg-warm-white/10 transition-colors">
                <span className="text-amber mt-0.5 flex-shrink-0">→</span>
                <div>
                  <p className="font-display font-semibold text-warm-white text-sm">{title}</p>
                  <p className="text-warm-white/50 text-xs leading-relaxed mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="https://valdperformance.com/products/humantrak" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-amber font-display font-bold text-sm hover:underline">
            Learn more about VALD HumanTrak →
          </a>
        </div>
        {/* Right: image */}
        <div className="relative">
          <img
            src="https://images.ctfassets.net/98s79sqwuajy/5jYuLIejrNSJNMyCEzxaIX/05e2cd290d2c28030b14a62275f948f3/Brodie_HT_Updated.png"
            alt="VALD HumanTrak movement analysis for teams"
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
    </section>

    {/* ── OFFERS ───────────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-4">
          What we offer for teams
        </h2>
        <p className="text-ink-muted max-w-xl mb-12 leading-relaxed">
          Three core formats. All enquiry-led — pricing is agreed based on group size, location, and scope.
        </p>
        <div className="grid md:grid-cols-3 gap-px bg-fog">
          <OfferCard
            icon="🎯"
            title="Team Screening"
            description="A full HumanTrak screening session for your squad. Every athlete is tested and leaves with their own report and three priorities."
            includes={[
              'Group test battery (3–5 tests per athlete)',
              'Individual result reports',
              'Coach summary with team-level themes',
              'Three priorities per athlete',
              'Optional: on-site at Bonobo or at your facility',
            ]}
          />
          <OfferCard
            icon="💪"
            title="Small-Group Coaching Block"
            description="A structured training block following the screening — built around the team's collective priorities and coached by Mark."
            includes={[
              'Designed from screening results',
              '4–12 week coaching block',
              'Small-group sessions (max 8)',
              'Progress tracked across the block',
              'Optional mid-block retest',
            ]}
          />
          <OfferCard
            icon="🔄"
            title="Retest Block"
            description="A follow-up screening 8–12 weeks after the initial test. Shows exactly how each athlete has progressed since their baseline."
            includes={[
              'Same test battery as initial screening',
              'Side-by-side comparison report',
              'Updated priorities for each athlete',
              'Coach summary of team progress',
              'Recommended for every coaching block',
            ]}
          />
        </div>
      </div>
    </section>

    {/* ── WHAT THE GROUP GETS ───────────────────────────── */}
    <section className="bg-warm-white py-20 lg:py-28 border-t border-fog">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16">
        <div>
          <AmberRule />
          <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-10 text-balance">
            What your team leaves with.
          </h2>
          <div>
            <Deliverable
              label="Group test battery"
              detail="3–5 HumanTrak tests per athlete, measuring joint angles, range of motion, and movement quality."
            />
            <Deliverable
              label="Individual reports"
              detail="Each athlete receives a written report with their results and three concrete training priorities."
            />
            <Deliverable
              label="Coach summary"
              detail="A team-level document showing the most common movement themes across the squad — structured so a coach can act on it immediately."
            />
            <Deliverable
              label="Retest option"
              detail="8–12 weeks later, a follow-up screening shows exactly how athletes have responded to training."
            />
            <Deliverable
              label="Optional PT or group coaching"
              detail="For teams wanting more hands-on support, a coaching block can follow the screening."
            />
          </div>
        </div>

        {/* Pricing panel */}
        <div className="flex flex-col justify-center">
          <div className="border border-fog p-10 bg-bone">
            <p className="label-mono text-ink-muted mb-6">Pricing</p>
            <h3 className="font-display font-bold text-2xl text-ink mb-4">Enquiry-led</h3>
            <p className="text-ink-muted leading-relaxed mb-6">
              Team screening pricing depends on group size, location, and whether you want on-site testing or to come to Bonobo in Nacka. Retest blocks and coaching packages are quoted separately.
            </p>
            <p className="text-ink-muted leading-relaxed mb-10">
              Email Mark with your group size and a brief outline of what you're working on. He'll come back with a clear proposal within 48 hours.
            </p>
            <a
              href={`mailto:mark@bonobogym.com?subject=Team screening enquiry`}
              className="block text-center px-6 py-4 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-200"
            >
              Enquire for team pricing →
            </a>
            <p className="mt-4 text-xs text-ink-muted text-center">
              mark@bonobogym.com · 073 642 62 92
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── SOCIAL PROOF / CONTEXT ───────────────────────── */}
    <section className="bg-amber py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <p className="font-display font-bold text-ink text-2xl lg:text-3xl max-w-2xl mx-auto text-balance">
          "Screen a squad or small group, give each person clear priorities, and give the coach a usable summary."
        </p>
        <p className="mt-4 text-ink/60 label-mono">The Bonobo Team approach</p>
      </div>
    </section>

    {/* ── CTA ─────────────────────────────────────────── */}
    <section className="bg-bone py-20 lg:py-28 border-t border-fog">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <AmberRule />
        <h2 className="mt-6 font-display font-bold text-3xl lg:text-4xl text-ink mb-6 text-balance">
          Ready to build a movement baseline for your team?
        </h2>
        <p className="text-ink-muted leading-relaxed mb-10">
          Get in touch with Mark. Tell him your sport, your group size, and what you're trying to improve. He'll propose the right format within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`mailto:mark@bonobogym.com?subject=Team screening enquiry`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink text-warm-white font-display font-bold text-sm tracking-wide hover:bg-amber transition-colors duration-200"
          >
            Enquire for team pricing →
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

export default ForTeams;
