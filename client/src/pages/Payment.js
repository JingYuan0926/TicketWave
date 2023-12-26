
// Payment.js
import React, { useEffect } from "react";

import BasicTabs from '../components/Tabs.tsx';
import './Payment.css';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.tsx';

function Payment() {
    useEffect(() => {
      // Scroll to the top of the page when the component mounts
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="payment-container">
      <Navbar  />
      <div className="background-image"></div>
      <div className="card-container">
        <div className="card">
          <BasicTabs />
          {/* Add other payment-related components */}
        </div>
      </div>
      <Footer  />
    </div>
  );
}

export default Payment;
