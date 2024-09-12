import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { classifyPoint } from './knnUtils'; // A helper function to perform KNN classification
import './knn.css';

// Register Chart.js components
Chart.register(...registerables);

const KNN = () => {
  const [points, setPoints] = useState([]);
  const [classifiedPoints, setClassifiedPoints] = useState([]);
  const [k, setK] = useState(3);
  const [activeSection, setActiveSection] = useState('simulation'); // Default section is 'simulation'

  // Add a point with a class (label) 0 or 1
  const addPoint = (x, y, label) => {
    setPoints([...points, { x, y, label }]);
  };

  // Add a random point with a random class label 0 or 1
  const addRandomPoint = () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const label = Math.random() > 0.5 ? 1 : 0;
    addPoint(x, y, label);
  };

  // Clear all points and classifications
  const clearPoints = () => {
    setPoints([]);
    setClassifiedPoints([]);
  };

  // Perform KNN classification on a new random point
  const classifyNewPoint = () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const newPoint = { x, y };
    const predictedLabel = classifyPoint(points, newPoint, k);
    setClassifiedPoints([...classifiedPoints, { ...newPoint, label: predictedLabel }]);
  };

  const handleKChange = (event) => {
    setK(parseInt(event.target.value, 10));
  };

  return (
    <div className="knn-container">
      <nav className="left-nav">
        <ul>
          <li className={activeSection === 'aim' ? 'active' : ''} onClick={() => setActiveSection('aim')}>
            Aim
          </li>
          <li className={activeSection === 'theory' ? 'active' : ''} onClick={() => setActiveSection('theory')}>
            Theory
          </li>
          <li className={activeSection === 'objectives' ? 'active' : ''} onClick={() => setActiveSection('objectives')}>
            Objectives
          </li>
          <li className={activeSection === 'algorithm' ? 'active' : ''} onClick={() => setActiveSection('algorithm')}>
            Algorithm
          </li>
          <li className={activeSection === 'simulation' ? 'active' : ''} onClick={() => setActiveSection('simulation')}>
            Simulation
          </li>
          <li className={activeSection === 'feedback' ? 'active' : ''} onClick={() => setActiveSection('feedback')}>
            Feedback
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className={`section ${activeSection === 'aim' ? 'active' : ''}`}>
          <h2>Aim</h2>
          <p>The aim is to classify data points into different categories using the K-Nearest Neighbors (KNN) algorithm.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>KNN is a simple algorithm that stores all available cases and classifies new cases based on a similarity measure (e.g., distance function).</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the KNN algorithm.</li>
            <li>Visualize how new points are classified based on existing points.</li>
            <li>Experiment with different values of K and observe the changes.</li>
          </ul>
        </div>
        <div className={`section ${activeSection === 'algorithm' ? 'active' : ''}`}>
          <h2>Algorithm</h2>
          <p>The KNN algorithm follows these steps:</p>
          <ol>
            <li>Select the number K of neighbors.</li>
            <li>Calculate the distance between the new point and all existing points.</li>
            <li>Identify the K closest neighbors.</li>
            <li>Classify the new point based on the majority class of its neighbors.</li>
          </ol>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>KNN Classification Simulation</h2>
            <div className="chart-container">
              <Scatter
                height={100}
                data={{
                  datasets: [
                    {
                      label: 'Class 0',
                      data: points.filter(p => p.label === 0),
                      borderColor: 'rgba(255, 99, 132, 1)',
                      backgroundColor: 'rgba(255, 99, 132, 0.4)',
                      pointRadius: 5,
                    },
                    {
                      label: 'Class 1',
                      data: points.filter(p => p.label === 1),
                      borderColor: 'rgba(54, 162, 235, 1)',
                      backgroundColor: 'rgba(54, 162, 235, 0.4)',
                      pointRadius: 5,
                    },
                    ...classifiedPoints.map((point, index) => ({
                      label: `New Point ${index + 1}`,
                      data: [{ x: point.x, y: point.y }],
                      backgroundColor: point.label === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
                      pointRadius: 8,
                      borderColor: point.label === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
                    })),
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      type: 'linear',
                      position: 'bottom',
                    },
                    y: {
                      type: 'linear',
                      position: 'left',
                    },
                  },
                }}
              />
            </div>
            <div className="controls">
              <button onClick={addRandomPoint}>Add Random Point</button>
              <button onClick={clearPoints}>Clear Points</button>
              <button onClick={classifyNewPoint}>Classify New Random Point</button>
              <div style={{ marginTop: '3rem' }}>
                <label>K (number of neighbors): </label>
                <input type="number" value={k} onChange={handleKChange} min="1" />
              </div>
            </div>
          </div>
        )}
        <div className={`section ${activeSection === 'feedback' ? 'active' : ''}`}>
          <h2>Feedback</h2>
          <p>We would love to hear your thoughts or suggestions about the KNN simulation!</p>
        </div>
      </div>
    </div>
  );
};

export default KNN;
