import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import HeroSection from '../components/about/HeroSection';
import MarkStory from '../components/about/MarkStory';
import MajaStory from '../components/about/MajaStory';
import Differentiators from '../components/about/Differentiators';
import CTASection from '../components/about/CTASection';
import TeamSpotlight from '../components/about/TeamSpotlight';

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SEO title={t('seo.about.title')} description={t('seo.about.description')} />
      <HeroSection />
      <MarkStory />
      <MajaStory />
      <Differentiators />
      <TeamSpotlight />
      <CTASection />
    </div>
  );
};

export default About;
