import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Bell, Quote } from 'lucide-react';
import Chatbot from './Chatbot';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuote, setIsQuote] = useState(true);

  const quotes = [
    {
      text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    },
    {
      text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
      author: "Noam Shpancer"
    },
    {
      text: "You don't have to control your thoughts. You just have to stop letting them control you.",
      author: "Dan Millman"
    }
  ];

  const reminders = [
    "Take a 5-minute break to practice deep breathing",
    "Remember to stay hydrated throughout the day",
    "Step outside for some fresh air and sunshine",
    "Check in with a friend or family member today"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsQuote((prev) => !prev);
      setCurrentIndex((prev) => {
        const maxLength = isQuote ? reminders.length : quotes.length;
        return (prev + 1) % maxLength;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isQuote]);

  return (
    <section id="home" className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Supporting students through their academic journey with comprehensive mental wellness resources and professional support.
          </p>
          <a
            href="#contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Get Support Now
          </a>
        </div>

        {/* Daily Reminders and Quotes Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
            <div className="min-h-[120px] flex items-center justify-center">
              <div
                className={`transform transition-all duration-500 ${
                  isQuote ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`}
              >
                {isQuote && (
                  <div className="flex flex-col items-center space-y-4">
                    <Quote className="h-8 w-8 text-purple-600" />
                    <p className="text-lg text-gray-800 italic">
                      {quotes[currentIndex % quotes.length].text}
                    </p>
                    <p className="text-sm text-gray-600">
                      — {quotes[currentIndex % quotes.length].author}
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ${
                  !isQuote ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {!isQuote && (
                  <div className="flex flex-col items-center space-y-4">
                    <Bell className="h-8 w-8 text-purple-600" />
                    <p className="text-lg text-gray-800">
                      {reminders[currentIndex % reminders.length]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <Heart className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emotional Support</h3>
            <p className="text-gray-600">Access to caring professionals who understand student challenges.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <Shield className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe Space</h3>
            <p className="text-gray-600">Confidential environment to share your thoughts and feelings.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Peer Support</h3>
            <p className="text-gray-600">Connect with others who understand what you're going through.</p>
          </div>
        </div>
      </div>
      <Chatbot />
    </section>
  );
}