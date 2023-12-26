import React from "react";
import './Footer.css';
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";


const Footer = () => {
    return (
        <div className="footer">
            <div className="sb_footer section_padding">
            <div className="sb_footer-links">
                <div className="sb_footer-links_div">
                    <h4>About Us</h4>
                    <a href="/contqct">
                        <p>Privacy Policy</p>
                    </a>
                    <a href="/privacy">
                        <p>Security and Cookies</p>
                    </a>
                    <a href="/t&c">
                        <p>Terms and Condition</p>
                    </a>
                </div>

                <div className="sb_footer-links_div">
                <h4>Need Help?</h4>
                    <a href="/employer">
                        <p>Contact Support</p>
                    </a>
                    <a href="/employer">
                        <p>FAQ</p>
                    </a>
                    <a href="/employer">
                        <p>Resend Booking Information</p>
                    </a>
                </div>

                <div className="sb_footer-links_div">
                <h4>Follow us on: </h4>
                    <div className="socialmedia">
                    <Facebook style={{ fontSize: '30px', color: 'white' }} />
                    <Instagram style={{ fontSize: '30px', color: 'white' }} />
                    <Twitter style={{ fontSize: '30px', color: 'white' }} />
                    <LinkedIn style={{ fontSize: '30px', color: 'white' }} />
                    </div>
                </div>
            </div>
            
            <hr className="footer-hr" /> {/* Here's the horizontal line */}

            <div className="sb_footer-below">
                <div className="sb_footer-copyright">
                    <p>
                        @{new Date().getFullYear()} TicketWave. All right reserved
                    </p>
                </div>
            </div>

            </div>
        </div>

    )
}

export default Footer;