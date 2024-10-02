import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo and Company Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">YourShop</h1>
          <p className="text-sm">&copy; 2024 YourShop. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-6 md:mb-0 text-center md:text-left">
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-300 text-lg">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 transition-colors duration-300 text-lg">About Us</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition-colors duration-300 text-lg">Contact Us</Link>
          <Link to="/privacy" className="hover:text-yellow-400 transition-colors duration-300 text-lg">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-yellow-400 transition-colors duration-300 text-lg">Terms of Service</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mb-6 md:mb-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300 text-2xl">
            <FaFacebookF />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300 text-2xl">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300 text-2xl">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300 text-2xl">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center md:text-right ml-7 ">
          <h2 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h2>
          <form className="flex flex-col md:flex-row justify-center md:justify-end items-center md:items-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2 md:mb-0 md:mr-2"
            />
            <button
              type="submit"
              className="bg-yellow-500 p-3 rounded-md text-gray-800 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
