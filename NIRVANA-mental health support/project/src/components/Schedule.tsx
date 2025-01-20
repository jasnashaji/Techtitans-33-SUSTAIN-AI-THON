import React, { useState } from 'react';
import { Calendar, Clock, User, MessageSquare, Mail, Video, Mic, MessageCircle, Check, X, Menu, Bot as Lotus } from 'lucide-react';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [concerns, setConcerns] = useState('');
  const [sessionMode, setSessionMode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Generate available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const sessionModes = [
    { id: 'video', label: 'Video Call', icon: Video },
    { id: 'audio', label: 'Audio Call', icon: Mic },
    { id: 'chat', label: 'Live Chat', icon: MessageCircle }
  ];

  const navLinks = ['Home', 'Services', 'Therapy', 'About', 'Contact'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = {
      name,
      email,
      date: selectedDate,
      time: selectedTime,
      mode: sessionMode,
      concerns
    };
    setBookingDetails(details);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setName('');
    setEmail('');
    setConcerns('');
    setSessionMode('');
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
          <button
            onClick={closeConfirmation}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Session Booked Successfully!</h2>
            <p className="text-gray-600 mt-2">Your therapy session has been scheduled.</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Session Details:</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Name: {bookingDetails.name}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email: {bookingDetails.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date: {new Date(bookingDetails.date).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Time: {bookingDetails.time}</span>
                </p>
                <p className="flex items-center gap-2">
                  {bookingDetails.mode === 'video' && <Video className="h-4 w-4" />}
                  {bookingDetails.mode === 'audio' && <Mic className="h-4 w-4" />}
                  {bookingDetails.mode === 'chat' && <MessageCircle className="h-4 w-4" />}
                  <span>Mode: {bookingDetails.mode.charAt(0).toUpperCase() + bookingDetails.mode.slice(1)} Session</span>
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Next Steps:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>A confirmation email has been sent to {bookingDetails.email}</li>
                <li>You'll receive session access details 30 minutes before the appointment</li>
                <li>Please join the session 5 minutes early</li>
              </ul>
            </div>
          </div>

          <button
            onClick={closeConfirmation}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Responsive Navigation Bar */}
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <a href="#home" className="flex items-center space-x-2">
                <Lotus className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-gray-800">
                  NIRVANA
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-purple-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-20 pb-16 bg-purple-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Therapy Session
            </h1>
            <p className="text-xl text-gray-600">
              Choose your preferred date, time, and mode for the session
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Mode Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Session Mode
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sessionModes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSessionMode(id)}
                      className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                        sessionMode === id
                          ? 'border-purple-600 bg-purple-50 text-purple-600'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </div>
                {sessionMode && (
                  <p className="mt-2 text-sm text-gray-600">
                    {sessionMode === 'video' && '• High-quality video call with screen sharing capability'}
                    {sessionMode === 'audio' && '• Clear audio call for focused conversation'}
                    {sessionMode === 'chat' && '• Real-time text chat with file sharing support'}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Full Name</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>Email Address</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Primary Concerns</span>
                      </div>
                    </label>
                    <textarea
                      rows={4}
                      value={concerns}
                      onChange={(e) => setConcerns(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Briefly describe your concerns"
                    ></textarea>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Select Date</span>
                      </div>
                    </label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Select Time</span>
                      </div>
                    </label>
                    <select
                      required
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Session Details:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 50-minute session</li>
                      <li>• One-on-one with a licensed therapist</li>
                      <li>• {sessionMode ? `${sessionMode.charAt(0).toUpperCase() + sessionMode.slice(1)} consultation` : 'Choose your preferred mode'}</li>
                      <li>• Free initial consultation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={!sessionMode}
                  className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
                    sessionMode
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}