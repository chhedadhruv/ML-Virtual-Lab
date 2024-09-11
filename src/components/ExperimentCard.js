// ExperimentCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ExperimentCard.css'; // Import the CSS file for styling

const ExperimentCard = ({ experiment }) => {
  return (
    <div className="experiment-card">
      <h3>{experiment.name}</h3>
      <p>{experiment.description}</p>
      <Link to={`/experiments/${experiment.id}`} className="experiment-card-button">Start Experiment</Link>
    </div>
  );
};

export default ExperimentCard;
