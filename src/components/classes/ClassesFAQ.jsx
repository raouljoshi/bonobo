import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-6 text-left text-lg font-medium"
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="pb-4 px-6 text-gray-600">{children}</div>}
    </div>
  );
};

const ClassesFAQ = () => {
  const { t } = useTranslation();
  const faq = t('classes_faq', { returnObjects: true });

  if (!faq || !Array.isArray(faq.questions)) {
    return null; // Or a loading indicator
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">{faq.title}</h2>
        <div className="rounded-lg shadow-md overflow-hidden">
            {faq.questions.map(item => (
                <AccordionItem key={item.question} title={item.question}>
                    <p>{item.answer}</p>
                </AccordionItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesFAQ;
