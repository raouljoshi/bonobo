import { render, screen } from '@testing-library/react';
import SEO from './components/SEO';
import ClassSchedule from './components/classes/ClassSchedule';
import Labs from './pages/Labs';
import { BOOKING_URL, openBookingUrl } from './utils/booking';
import { buildLabsEmailLink } from './utils/labs';
import englishTranslations from '../public/locales/en/translation.json';
import swedishTranslations from '../public/locales/sv/translation.json';

const mockTranslations = vi.hoisted(() => ({
  class_schedule: {
    title: 'Our Weekly Class Schedule',
    subtitle: 'Find a time that works for you.',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    class_names: {
      'Strength & Conditioning': 'Strength & Conditioning',
      'Strength & Conditioning_short': 'S&C',
      Movement: 'Movement',
      'Strong Mama': 'Strong Mama (CarMa Training)',
      'Funky Monkeys': 'Funky Monkeys',
      'Youth Class': 'Youth Class',
      'Plus Power': 'Plus Power',
    },
  },
  labs_page: {
    email: { subject_prefix: 'Bonobo Movement Lab enquiry' },
    media: {
      credit: 'Media courtesy/source: VALD HumanTrak.',
      video_fallback: 'Open the VALD video',
    },
    hero: {
      eyebrow: 'Bonobo Movement Lab',
      title: 'Measure how you move.',
      subtitle: 'Objective movement profiles for individuals, teams and workplaces.',
      primary_cta: 'For individuals',
      secondary_cta: 'For teams & clubs',
      image_alt: 'VALD HumanTrak product visual',
    },
    segment_nav: { label: 'Bonobo Labs audience paths' },
    measure: {
      eyebrow: 'Powered by VALD HumanTrak',
      title: 'One platform, three practical use cases.',
      description: 'HumanTrak supports coaching.',
      source_intro: 'Based on official VALD information:',
      source_product: 'HumanTrak overview',
      source_tests: 'test library',
      items: [
        { title: 'Mobility', description: 'Range-of-motion tests.' },
        { title: 'Balance', description: 'Balance and control tests.' },
      ],
    },
    process: {
      title: 'How the Lab works',
      description: 'Measure, choose priorities, train, then retest.',
      steps: [
        { title: 'Baseline', description: 'Run a test battery.' },
        { title: 'Three priorities', description: 'Choose focus areas.' },
        { title: 'Training plan', description: 'Connect the result to training.' },
        { title: 'Retest', description: 'Repeat the same tests.' },
      ],
    },
    segments_intro: {
      eyebrow: 'Choose your path',
      title: 'Built for three primary audiences',
      description: 'The offer changes by audience.',
    },
    segments: [
      {
        id: 'individuals',
        nav_label: 'Individuals',
        eyebrow: 'Individuals',
        title: 'For individuals',
        description: 'Get a clear movement baseline.',
        media_title: 'Individual HumanTrak video',
        media_caption: 'Official VALD video.',
        email_context: 'Goal or context:',
        button: 'Enquire by email',
        highlights: ['Clear baseline'],
        offers: [
          {
            title: 'Bonobo Movement Profile',
            duration: '55-60 minutes',
            price: '1,290 SEK member / 1,490-1,590 SEK non-member',
            description: 'The core paid assessment.',
            includes: ['VALD report'],
          },
        ],
      },
      {
        id: 'teams-clubs',
        nav_label: 'Teams & clubs',
        eyebrow: 'Teams & clubs',
        title: 'For teams & clubs',
        description: 'Screen a squad.',
        media_title: 'Group testing video',
        media_caption: 'Official VALD video.',
        email_context: 'Team, sport, squad size and preferred dates:',
        button: 'Enquire for team pricing',
        highlights: ['Group testing'],
        offers: [
          {
            title: 'Team / Club Screening',
            duration: '10-15 athletes',
            price_note: 'Enquire for team pricing',
            description: 'Group screening.',
            includes: ['Coach summary'],
          },
        ],
      },
      {
        id: 'enterprises',
        nav_label: 'Enterprises',
        eyebrow: 'Enterprises',
        title: 'For enterprises',
        description: 'Movement engagement for companies.',
        media_title: 'Workplace-relevant video',
        media_caption: 'Official VALD video.',
        email_context: 'Company, team size, location and preferred dates:',
        button: 'Enquire for company pricing',
        highlights: ['Half-day movement event'],
        offers: [
          {
            title: 'Corporate Movement Day',
            duration: 'Half-day',
            price_note: 'Enquire for company pricing',
            description: 'Movement screens and education.',
            includes: ['Mini-screens'],
          },
        ],
      },
    ],
    boundary: {
      title: 'Clear fitness scope',
      description: 'Medical professionals diagnose and treat medical conditions.',
      image_alt: 'VALD HumanTrak in use',
      reliability_link: 'Read VALD reliability context.',
      items: ['Not medical diagnosis', 'Not gait analysis'],
    },
    final_cta: {
      title: 'Ready to train from a better baseline?',
      description: 'Tell us which path fits you best.',
      button: 'Email Mark about Labs',
      email_context: 'I am interested in:',
    },
    references: {
      title: 'VALD sources used for this page',
      description: 'Based on official VALD material.',
      links: [
        'HumanTrak product page',
        'Markerless motion capture article',
        'HumanTrak test types',
        'What HumanTrak measures',
        'HumanTrak reliability note',
        'Individual HumanTrak video',
        'Group testing video',
        'Box-lift testing video',
      ],
    },
  },
  seo: {
    labs: {
      title: 'Bonobo Labs',
      description: 'Movement profiles.',
    },
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'Time') return 'Time';

      return key.split('.').reduce((value, part) => value?.[part], mockTranslations) || key;
    },
  }),
}));

test('updates document title and description metadata', () => {
  render(<SEO title="Bonobo Gym" description="Small-group training on Kvarnholmen." />);

  expect(document.title).toBe('Bonobo Gym');
  expect(screen.queryByText(/learn react/i)).not.toBeInTheDocument();
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    'content',
    'Small-group training on Kvarnholmen.'
  );
});

test('renders a mobile-friendly class agenda alongside the desktop schedule', () => {
  render(<ClassSchedule />);

  expect(screen.getByRole('heading', { name: 'Our Weekly Class Schedule' })).toBeInTheDocument();
  expect(screen.getByText('10:30-11:30')).toBeInTheDocument();
  expect(screen.getAllByText('Strong Mama (CarMa Training)').length).toBeGreaterThan(0);
});

test('opens booking links directly in a new tab', () => {
  const open = vi.spyOn(window, 'open').mockImplementation(() => null);

  openBookingUrl();

  expect(open).toHaveBeenCalledWith(BOOKING_URL, '_blank', 'noopener,noreferrer');
  open.mockRestore();
});

test('builds prefilled Bonobo Labs email enquiry links', () => {
  const link = buildLabsEmailLink('Bonobo Movement Profile');

  expect(link).toContain('mailto:mark@bonobogym.com');
  expect(decodeURIComponent(link)).toContain('Bonobo Movement Lab enquiry: Bonobo Movement Profile');
  expect(decodeURIComponent(link)).toContain('Goal or context:');
});

test('renders Bonobo Labs segment anchors and enquiry-only team/company offers', () => {
  render(<Labs />);

  expect(screen.getByRole('navigation', { name: 'Bonobo Labs audience paths' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Individuals' })).toHaveAttribute('href', '#individuals');
  expect(screen.getByRole('link', { name: 'Teams & clubs' })).toHaveAttribute('href', '#teams-clubs');
  expect(screen.getByRole('link', { name: 'Enterprises' })).toHaveAttribute('href', '#enterprises');
  expect(screen.getAllByText('Enquire for team pricing').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Enquire for company pricing').length).toBeGreaterThan(0);
  expect(screen.queryByText('8,900-14,900 SEK')).not.toBeInTheDocument();
  expect(screen.queryByText('12,000-18,000 SEK')).not.toBeInTheDocument();
});

test('keeps public Labs prices limited to individual offers in locale content', () => {
  [englishTranslations, swedishTranslations].forEach((translations) => {
    const segments = translations.labs_page.segments;

    expect(segments.map((segment) => segment.id)).toEqual(['individuals', 'teams-clubs', 'enterprises']);
    expect(segments[0].offers.every((offer) => offer.price)).toBe(true);
    expect(segments.slice(1).flatMap((segment) => segment.offers).every((offer) => !offer.price && offer.price_note)).toBe(true);
  });
});
