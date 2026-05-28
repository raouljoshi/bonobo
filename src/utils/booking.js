export const BOOKING_URL = 'https://bonobogym.gymsystem.se';
export const SHOP_URL = `${BOOKING_URL}/shoppa`;

export const openBookingUrl = (url = BOOKING_URL) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
