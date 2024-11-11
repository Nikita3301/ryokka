import React from 'react'
import { NavLink } from 'react-router-dom';
import LogoImg from "/logo.svg"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-3">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center font-semibold">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img
              src={LogoImg}
              alt="Your Logo"
              className="w-10 h-10"
            />
            <NavLink to="/home" className="hover:text-gray-300">
            Ryokka
          </NavLink>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <a href="/home" className="hover:text-gray-400">Dashboard</a>
            <a href="/services" className="hover:text-gray-400">Services</a>
            <a href="/contacts" className="hover:text-gray-400">Contact</a>
          </div>

          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400">
              <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-2 text-center text-sm">
          &copy; {new Date().getFullYear()} Ryokka. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

