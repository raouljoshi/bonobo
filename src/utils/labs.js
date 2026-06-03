export const CONTACT_EMAIL = 'mark@bonobogym.com';

export const buildLabsEmailLink = (
  offerTitle,
  subjectPrefix = 'Bonobo Movement Lab enquiry',
  context = 'Goal or context:'
) => {
  const subject = `${subjectPrefix}: ${offerTitle}`;
  const body = [
    `Hi Mark,`,
    '',
    `I would like to know more about ${offerTitle}.`,
    '',
    `Name:`,
    `Preferred time:`,
    context,
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const VALD_SOURCES = {
  humantrak: 'https://valdperformance.com/products/humantrak',
  markerless: 'https://valdhealth.com/news/understanding-markerless-motion-capture-with-humantrak',
  testTypes: 'https://support.vald.com/hc/en-au/articles/5001637315225-HumanTrak-test-types',
  measures: 'https://support.vald.com/hc/en-au/articles/5001513298457-What-HumanTrak-measures',
  reliability: 'https://valdhealth.com/news/validity-and-reliability-of-movement-analysis-methods-used-in-humantrak',
  individualsVideo: 'https://www.youtube.com/watch?v=1fYycDOJ4S8',
  teamsVideo: 'https://www.youtube.com/watch?v=6q5FojdrH8c',
  enterprisesVideo: 'https://www.youtube.com/watch?v=BjqOcezvLxM',
};

export const VALD_MEDIA = {
  heroImage: 'https://images.ctfassets.net/98s79sqwuajy/2rK5GLQWtwnv70JApIbzoY/b1400a688c52cc74c0c393c43da63b03/VPHumanTrak-thumb.jpg',
  productImage: 'https://images.ctfassets.net/98s79sqwuajy/2LVXBOkNca3wYyHtuJWcj/e6773cf5be62c6adafcd06604d9280fe/ht_hero-min.png',
  reportImage: 'https://images.ctfassets.net/98s79sqwuajy/5jYuLIejrNSJNMyCEzxaIX/05e2cd290d2c28030b14a62275f948f3/Brodie_HT_Updated.png',
  contextImage: 'https://images.ctfassets.net/98s79sqwuajy/4bGfdq1iuWHINfKtImjV1V/b394508c33a27c3f813ced425cf24eb4/vp-humantrak-in-action.png',
  productVideo: 'https://player.vimeo.com/video/1165854511?h=353f78e496&badge=0&autopause=0&player_id=0&app_id=58479',
  segmentVideos: {
    individuals: 'https://www.youtube.com/embed/1fYycDOJ4S8',
    'teams-clubs': 'https://www.youtube.com/embed/6q5FojdrH8c',
    enterprises: 'https://www.youtube.com/embed/BjqOcezvLxM',
  },
  segmentSources: {
    individuals: 'https://www.youtube.com/watch?v=1fYycDOJ4S8',
    'teams-clubs': 'https://www.youtube.com/watch?v=6q5FojdrH8c',
    enterprises: 'https://www.youtube.com/watch?v=BjqOcezvLxM',
  },
};
