import React from "react";
import { Link } from "@nextui-org/react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0F0F1A] text-white py-8 px-4 md:px-12 lg:px-24">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">About Us</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="text-white">Privacy Policy</Link></li>
                            <li><Link href="/security-and-cookies" className="text-white">Security and Cookies</Link></li>
                            <li><Link href="/terms-and-conditions" className="text-white">Terms and Condition</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Need Help?</h4>
                        <ul className="space-y-2">
                            <li><Link href="/contact-support" className="text-white">Contact Support</Link></li>
                            <li><Link href="/faq" className="text-white">FAQ</Link></li>
                            <li><Link href="/resend-booking" className="text-white">Resend Booking Information</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Follow us on:</h4>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="text-white"><FaFacebook size={24} /></Link>
                            <Link href="https://instagram.com" className="text-white"><FaInstagram size={24} /></Link>
                            <Link href="https://twitter.com" className="text-white"><FaTwitter size={24} /></Link>
                            <Link href="https://linkedin.com" className="text-white"><FaLinkedin size={24} /></Link>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-gray-700" />
                <div className="text-center text-white">
                    <p>&copy; {new Date().getFullYear()} TicketWave. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
