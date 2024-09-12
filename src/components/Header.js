import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Ensure you create a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>KJSIT Virtual Lab</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/experiments">Experiments</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
