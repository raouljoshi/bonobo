import React from 'react';

const testimonials = [
  {
    quote: 'The Strength & Conditioning classes here are incredible. I\'ve never felt stronger, and Mark always pushes me just enough.',
    name: 'Johan S.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    quote: 'Maya\'s Movement class has completely changed my flexibility and awareness. It\'s challenging but so rewarding!',
    name: 'Sofia K.',
    imageUrl: 'https://via.placeholder.com/100',
  },
  {
    quote: 'As a new mom, Mama Bootcamp was a lifesaver. Being able to bring my baby while getting a fantastic workout made all the difference.',
    name: 'Elin P.',
    imageUrl: 'https://via.placeholder.com/100',
  },
];

const ClassTestimonials = () => {
  return (
    <div className="bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Hear From Our Members</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-700 p-8 rounded-lg shadow-lg text-center">
              <img className="mx-auto h-20 w-20 rounded-full object-cover" src={testimonial.imageUrl} alt={testimonial.name} />
              <blockquote className="mt-6 text-white">
                <p className="text-lg italic">"{testimonial.quote}"</p>
              </blockquote>
              <cite className="mt-4 block font-semibold text-gray-300 not-italic">- {testimonial.name}</cite>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassTestimonials;
