import React from 'react';
import { FaTiktok, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'; // Import icons
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="#" aria-label="TikTok"><FaTiktok /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="YouTube"><FaYoutube /></a>
      </div>
    </footer>
  );
}

export default Footer;
