import React, { useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.jsx";
import Successbnpl from "../components/Successbnpl.jsx";
import './Payment.css';

function PaymentSuccessbnpl() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className= "payment-container">
      <Navbar />
      <div className="background-image"></div>
        <div>
      <Successbnpl />
      </div>
      <Footer />
    </div>
  );
}

export default PaymentSuccessbnpl;
