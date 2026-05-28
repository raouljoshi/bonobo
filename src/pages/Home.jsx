import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
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
      <ValueProp />
      <FeaturedClasses />
      <CommunityTestimonials />
      <FinalCTA />
      <InstagramFeed />
    </>
  );
};

export default Home;
