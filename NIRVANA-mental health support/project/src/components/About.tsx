import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About MindfulCampus</h2>
            <p className="text-lg text-gray-600 mb-6">
              MindfulCampus was founded with a simple mission: to make mental health support accessible,
              affordable, and tailored to the unique needs of students. We understand the pressures of
              academic life and are here to help you thrive.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team consists of licensed therapists, counselors, and mental health professionals who
              specialize in student mental health. We're committed to creating a safe, inclusive space
              where every student feels heard and supported.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="text-4xl font-bold text-purple-600">1000+</h4>
                <p className="text-gray-600">Students Supported</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-purple-600">20+</h4>
                <p className="text-gray-600">Professional Therapists</p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Our team"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}