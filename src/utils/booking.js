// Mana owns all live prices, availability, offers, and purchase terms.
export const MANA_ORIGIN = 'https://www.getmana.app';
export const MANA_STUDIO_URL = `${MANA_ORIGIN}/s/bonobogym`;
export const SCHEDULE_URL = `${MANA_STUDIO_URL}/schedule`;
export const MEMBERSHIPS_URL = `${MANA_STUDIO_URL}/memberships`;
export const CREDITS_URL = `${MANA_STUDIO_URL}/credits`;
export const LOGIN_URL = `${MANA_STUDIO_URL}/sign-in`;
export const TRIAL_URL = `${MANA_STUDIO_URL}/start-here`;
export const COURSES_URL = `${MANA_STUDIO_URL}/courses`;
export const SERVICES_URL = `${MANA_STUDIO_URL}/services`;
export const FAQ_URL = `${MANA_STUDIO_URL}/faq`;
export const TERMS_URL = `${MANA_STUDIO_URL}/terms`;
export const ACCOUNT_URL = `${MANA_STUDIO_URL}/account`;
export const BOOKINGS_URL = `${MANA_STUDIO_URL}/bookings`;
export const MANA_STUDIO_ID = '6f9f4080-7fd2-48bb-8eea-c8b0500006f6';

export function itemLinks(type, id) {
  const encodedId = encodeURIComponent(id);
  if (type === 'memberships') return {
    details: `${MEMBERSHIPS_URL}/${encodedId}`,
    buy: `${MANA_STUDIO_URL}/checkout/membership?membershipId=${encodedId}`,
  };
  if (type === 'credits') return {
    details: `${CREDITS_URL}/${encodedId}`,
    buy: `${MANA_STUDIO_URL}/checkout/credits?bundleId=${encodedId}`,
  };
  if (type === 'course') return { details: `${COURSES_URL}/${encodedId}` };
  return { details: `${SCHEDULE_URL}?class=${encodedId}` };
}

export function trialLink(offering) {
  return ['trial_offer_1_credit', 'trial_offer_3_credits'].includes(offering)
    ? `${MANA_STUDIO_URL}/checkout/trial-offers?offering=${offering}`
    : SCHEDULE_URL;
}

// Session packs have no public API. Link from the studio integration guide,
// verified 2026-09-16; price and terms remain in Mana checkout.
export const PT_PACK_URL = `${MANA_STUDIO_URL}/checkout/specialist-bundle?bundleId=7d761b0a-316a-4e53-8504-1c7ce5487b00`;
