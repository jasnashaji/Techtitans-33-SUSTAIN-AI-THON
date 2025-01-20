import React from 'react';

interface TherapyProps {
  onSchedule: () => void;
}

export default function Therapy({ onSchedule }: TherapyProps) {
  return (
    <section id="therapy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Therapy Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional therapy services tailored to student needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
              alt="Therapy session"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Individual Therapy</h3>
              <p className="text-gray-600">
                Our licensed therapists provide confidential, one-on-one sessions to help you navigate personal challenges,
                academic stress, and emotional well-being.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">What to Expect</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Initial consultation to understand your needs</li>
                <li>Personalized treatment plan</li>
                <li>Regular follow-up sessions</li>
                <li>Progress tracking and adjustment</li>
                <li>Flexible scheduling options</li>
              </ul>
            </div>
            <button 
              onClick={onSchedule}
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Schedule a Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}