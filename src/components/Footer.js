import React from 'react';
import './Footer.css';  // Ensure you create a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} KJSIT Virtual Lab. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
