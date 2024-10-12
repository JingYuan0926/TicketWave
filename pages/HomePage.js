import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import ConcertCard from '../components/ConcertCard';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Slider />
      <ConcertCard />
      <Footer/>
    </div>
  );
}
