export const BOOKING_URL = 'https://bonobogym.gymsystem.se';
export const SHOP_URL = `${BOOKING_URL}/shoppa`;
export const CONTACT_EMAIL = 'mark@bonobogym.com';

export const buildConsultationEmailLink = (subjectPrefix = 'Bonobo consultation enquiry', context = 'Interest area:') => {
  const body = [
    'Hi Mark,',
    '',
    'I would like to book a consultation.',
    '',
    'Name:',
    'Preferred time:',
    'Goal:',
    context,
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectPrefix)}&body=${encodeURIComponent(body)}`;
};

export const openBookingUrl = (url = BOOKING_URL) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
