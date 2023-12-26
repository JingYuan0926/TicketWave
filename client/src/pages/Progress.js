import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.jsx';
import SegmentedProgressBar from '../components/Progressbar.tsx';
import './Progress.css';

function Progress() {
    return (
      <div className="progress-page-container">
        <Navbar />
        <div className="progress-background-image"></div> {/* Background image */}
        <div className="progress-card-container">
        <div className="progress-card">
          <SegmentedProgressBar segmentCount={4} value={25} max={50} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Progress;
