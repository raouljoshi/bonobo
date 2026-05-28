import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaDumbbell, FaChild, FaHeartbeat, FaBaby, FaRunning } from 'react-icons/fa';
import { GiBodyBalance } from 'react-icons/gi';

const pillarIconMap = {
  strength_conditioning: FaDumbbell,
  movement: GiBodyBalance,
  funky_monkeys: FaChild,
  youth_class: FaRunning,
  plus_power: FaHeartbeat,
  strong_mama: FaBaby,
  workshops: FaDumbbell, // Default icon for workshops
};

const ExpandableCard = ({ pillar, details, icon: Icon, isOpen, onClick }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <button
      onClick={onClick}
      className="w-full p-6 text-left flex flex-col items-center focus:outline-none"
    >
      <Icon className="h-12 w-12 text-gray-600" />
      <h3 className="mt-5 text-xl font-semibold text-gray-900">{pillar.title}</h3>
      <p className="mt-2 text-base text-gray-600 text-center">{pillar.description}</p>
      <span className={`mt-4 text-gray-600 font-semibold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
    {isOpen && (
      <div className="px-6 pb-6 border-t border-gray-200">
        <p className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: details.description }} />
        <h4 className="mt-4 font-bold text-gray-800">{details.experience_title}</h4>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          {details.experience_list.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <p className="mt-4"><span className="font-bold text-gray-800">{details.who_for_label}</span> {details.who_for_text}</p>
      </div>
    )}
  </div>
);

const ClassPillars = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);

  const pillarsContent = t('class_pillars.pillars', { returnObjects: true });
  const classDetailsContent = t('class_details', { returnObjects: true });

  if (!Array.isArray(pillarsContent) || !Array.isArray(classDetailsContent)) {
    return null;
  }

  // Create a map for efficient lookups
  const detailsMap = classDetailsContent.reduce((acc, detail) => {
    acc[detail.id] = detail;
    return acc;
  }, {});

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">{t('class_pillars.title')}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {t('class_pillars.subtitle')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillarsContent.map((pillar) => {
            const details = detailsMap[pillar.id];
            const Icon = pillarIconMap[pillar.id] || FaDumbbell;

            if (!details) {
              return null; // Don't render card if no details found
            }

            return (
              <ExpandableCard
                key={pillar.id}
                pillar={pillar}
                details={details}
                icon={Icon}
                isOpen={openId === pillar.id}
                onClick={() => handleToggle(pillar.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassPillars;
