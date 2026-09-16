import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrialOffers from '../components/TrialOffers';
import ValueProp from '../components/landing/ValueProp';
import FeaturedClasses from '../components/landing/FeaturedClasses';
import CommunityTestimonials from '../components/landing/CommunityTestimonials';
import FinalCTA from '../components/landing/FinalCTA';
import InstagramFeed from '../components/InstagramFeed';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('seo.home.title')} description={t('seo.home.description')} />
      <Hero />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><TrialOffers /></div>
      <ValueProp />
      <FeaturedClasses />
      <CommunityTestimonials />
      <FinalCTA />
      <InstagramFeed />
    </>
  );
};

export default Home;
