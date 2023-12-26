import './ShowTicket.css';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar';
import TicketTabs from '../components/Ticket';

function ShowTicket() {
  return (
    <div className="ticket-page-container">
      <Navbar  />
      <div className="ticket-background-image"></div>
      <div className="ticket-card-container">
        <div className="ticket-card">
          <TicketTabs />
          {/* Add other payment-related components */}
        </div>
      </div>
      <Footer  />
    </div>
  );
}

export default ShowTicket;
