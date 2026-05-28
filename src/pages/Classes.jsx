import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import ClassesHero from '../components/classes/ClassesHero';
import ClassPillars from '../components/classes/ClassPillars';
import ClassSchedule from '../components/classes/ClassSchedule';
import BookingCTA from '../components/classes/BookingCTA';
import ClassesFAQ from '../components/classes/ClassesFAQ';

const Classes = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SEO title={t('seo.classes.title')} description={t('seo.classes.description')} />
      <ClassesHero />
      <ClassPillars />
      <ClassSchedule />
      <BookingCTA />
      <ClassesFAQ />
    </div>
  );
};

export default Classes;
