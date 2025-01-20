import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import Therapy from './components/Therapy';
import About from './components/About';
import Contact from './components/Contact';
import Schedule from './components/Schedule';

function App() {
  const [showSchedule, setShowSchedule] = useState(false);

  if (showSchedule) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <Schedule />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Home />
      <Services />
      <Therapy onSchedule={() => setShowSchedule(true)} />
      <About />
      <Contact />
    </div>
  );
}

export default App;