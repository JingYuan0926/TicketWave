import React from "react";
import { Link } from "@nextui-org/react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0F0F1A] text-white py-8 px-4 md:px-12 lg:px-24">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4">About Us</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" color="foreground">Privacy Policy</Link></li>
                            <li><Link href="/security-and-cookies" color="foreground">Security and Cookies</Link></li>
                            <li><Link href="/terms-and-conditions" color="foreground">Terms and Condition</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Need Help?</h4>
                        <ul className="space-y-2">
                            <li><Link href="/contact-support" color="foreground">Contact Support</Link></li>
                            <li><Link href="/faq" color="foreground">FAQ</Link></li>
                            <li><Link href="/resend-booking" color="foreground">Resend Booking Information</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Follow us on:</h4>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" color="foreground"><FaFacebook size={24} /></Link>
                            <Link href="https://instagram.com" color="foreground"><FaInstagram size={24} /></Link>
                            <Link href="https://twitter.com" color="foreground"><FaTwitter size={24} /></Link>
                            <Link href="https://linkedin.com" color="foreground"><FaLinkedin size={24} /></Link>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-gray-700" />
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} TicketWave. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;