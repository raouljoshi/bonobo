import { render, screen } from '@testing-library/react';
import SEO from './components/SEO';
import ClassSchedule from './components/classes/ClassSchedule';
import { BOOKING_URL, openBookingUrl } from './utils/booking';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'class_schedule') {
        return {
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
        };
      }

      if (key === 'Time') {
        return 'Time';
      }

      return key;
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
