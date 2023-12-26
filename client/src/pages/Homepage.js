
import React, { useEffect } from "react";
import EventCard from "../components/EventCard";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.jsx";


function Homepage() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <Slider />
      <EventCard />
      <Footer />
    </div>
  );
}

export default Homepage;
