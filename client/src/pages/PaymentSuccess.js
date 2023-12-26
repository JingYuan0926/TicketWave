import React, { useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.jsx";
import Success from "../components/Success.jsx";
import './Payment.css';

function PaymentSuccess() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className= "payment-container">
      <Navbar />
      <div className="background-image"></div>
        <div>
      <Success />
      </div>
      <Footer />
    </div>
  );
}

export default PaymentSuccess;
