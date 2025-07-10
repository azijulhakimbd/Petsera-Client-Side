import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-3">Petsera 🐾</h2>
          <p className="text-sm">
            Petsera connects loving humans with pets in need. Adopt, donate, or help us build a better world—one paw at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-600 transition">Home</Link></li>
            <li><Link to="/adopt" className="hover:text-pink-600 transition">Adopt a Pet</Link></li>
            <li><Link to="/donate" className="hover:text-pink-600 transition">Donate</Link></li>
            <li><Link to="/about" className="hover:text-pink-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500" />
              Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-pink-500" />
              +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" />
              support@petsera.org
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://www.facebook.com/azijulhakimbd" className="text-blue-600 hover:text-blue-800"><FaFacebookF /></a>
            <a href="https://www.instagram.com/azijulhakimbd" className="text-pink-600 hover:text-pink-800"><FaInstagram /></a>
            <a href="https://www.x.com/azijulhakimbd" className="text-sky-500 hover:text-sky-700"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Petsera. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
