import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EventCard from "./components/EventCard";
import Payment from "./pages/Payment"; // Import your Payment component
import Homepage from "./pages/Homepage"; // Import your Homepage component

import PaymentSuccess from './pages/PaymentSuccess';
import Progress from "./pages/Progress";
import PaymentSuccessbnpl from "./pages/PaymentSuccessbnpl";
import ShowTicket from "./pages/ShowTicket";


const PgRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/events" element={<EventCard />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/progress" element={<Progress />} />

      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/paymentsuccessbnpl" element={<PaymentSuccessbnpl />} />

      <Route path="/ticket" element={<ShowTicket />} />
      {/* Add more routes for other pages if needed */}
    </Routes>
  );
}

export default PgRoutes;
