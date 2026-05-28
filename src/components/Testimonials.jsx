import React from 'react';

const testimonials = [
  {
    name: 'Jessica P.',
    quote: 'Bonobo Gym has completely changed my perspective on fitness. The small group classes are amazing and the trainers are so supportive!'
  },
  {
    name: 'Mark T.',
    quote: 'I\'ve been a member for over a year and I\'ve never felt stronger or healthier. The community here is fantastic.'
  },
  {
    name: 'Sarah L.',
    quote: 'The personalized attention you get here is unparalleled. I\'ve achieved goals I never thought were possible.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What Our Members Say</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
