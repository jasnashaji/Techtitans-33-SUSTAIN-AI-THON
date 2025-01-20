import React from 'react';
import { BookOpen, MessageCircle, Users, Calendar } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <MessageCircle className="h-12 w-12 text-purple-600" />,
      title: "Individual Counseling",
      description: "One-on-one sessions with licensed therapists who specialize in student mental health."
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: "Group Therapy",
      description: "Supportive group sessions focusing on common challenges faced by students."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-purple-600" />,
      title: "Workshops",
      description: "Educational sessions on stress management, anxiety, and other relevant topics."
    },
    {
      icon: <Calendar className="h-12 w-12 text-purple-600" />,
      title: "Crisis Support",
      description: "24/7 emergency mental health support for urgent situations."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive mental health support designed specifically for students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}