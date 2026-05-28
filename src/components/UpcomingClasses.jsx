import React from 'react';

const classes = [
  {
    name: 'Morning Yoga',
    time: 'Mon, Wed, Fri at 8:00 AM',
    description: 'Start your day with an energizing yoga session.'
  },
  {
    name: 'HIIT',
    time: 'Tue, Thu at 6:00 PM',
    description: 'High-intensity interval training to push your limits.'
  },
  {
    name: 'Strength Training',
    time: 'Mon, Wed, Fri at 7:00 PM',
    description: 'Build muscle and increase your strength with our expert trainers.'
  }
];

const UpcomingClasses = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Upcoming Classes</h2>
        <p className="mt-4 text-lg text-gray-600">
          Join us for our next classes. Book your spot now to ensure your place in our small group sessions.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {classes.map((item, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <p className="mt-2 text-gray-600">{item.time}</p>
              <p className="mt-4 text-gray-500">{item.description}</p>
              <button className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingClasses;
