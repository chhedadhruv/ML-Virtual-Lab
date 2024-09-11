// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFlask, FaBook, FaCog } from 'react-icons/fa';
import Home from './Home.jpeg';
import './HomePage.css'; // Ensure you have corresponding CSS for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <img src={Home} alt="Home" className="hero-image" />
        <div className="hero-text">
          <h1>Welcome to KJSIT Virtual Lab</h1>
          <p>Explore and experiment with machine learning algorithms.</p>
        </div>
      </div>
      <div className="objectives-section">
        <h2>Objectives</h2>
        <div className="objectives-cards">
          <div className="card">
            <FaFlask className="card-icon" />
            <h3>Experiment</h3>
            <p>Run experiments with different machine learning models.</p>
          </div>
          <div className="card">
            <FaBook className="card-icon" />
            <h3>Learn</h3>
            <p>Understand the theory behind various algorithms.</p>
          </div>
          <div className="card">
            <FaCog className="card-icon" />
            <h3>Simulate</h3>
            <p>Visualize and interact with simulations of algorithms.</p>
          </div>
        </div>
      </div>
      <div className="cta-button">
        <Link to="/experiments">
          <button>Explore Experiments</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
