import React from 'react';
import { useTranslation } from 'react-i18next';
import markInstructorImage from '../../assets/images/Mark instructor.jpg';
import majaImage from '../../assets/images/maja.jpg';

const teamImageUrls = [
  markInstructorImage,
  majaImage, // Maja headshot
  'https://via.placeholder.com/150', // Placeholder for Christian
];

const TeamSpotlight = () => {
  const { t } = useTranslation();
  const teamMembersContent = t('team_spotlight.members', { returnObjects: true });

  const teamMembers = teamMembersContent.map((member, index) => ({
    ...member,
    imageUrl: member.imageUrl || teamImageUrls[index],
  }));

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('team_spotlight.title')}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('team_spotlight.subtitle')}
          </p>
        </div>
        <ul
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {teamMembers.map((person) => {
            const hasUrl = !!person.url;
            const PersonCard = (
              <>
                <img className="mx-auto h-24 w-24 rounded-full object-cover" src={person.imageUrl} alt={person.alt || person.name} />
                <h3 className={`mt-6 text-base font-semibold leading-7 tracking-tight ${hasUrl ? 'text-blue-600 group-hover:text-blue-800' : 'text-gray-900'}`}>{person.name}</h3>
                <p className={`text-sm leading-6 ${hasUrl ? 'text-blue-600 group-hover:text-blue-800' : 'text-gray-600'}`}>{person.role}</p>
              </>
            );

            return (
              <li key={person.name}>
                {hasUrl ? (
                  <a href={person.url} target="_blank" rel="noopener noreferrer" className="group transition-colors">
                    {PersonCard}
                  </a>
                ) : (
                  PersonCard
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TeamSpotlight;
