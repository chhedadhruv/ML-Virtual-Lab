import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getLogisticRegression } from './regressionUtils';
import './LogisticRegression.css';  // Import the CSS file for styling

// Register Chart.js components
Chart.register(...registerables);

const LogisticRegression = () => {
  const [points, setPoints] = useState([]);
  const [boundaryPoints, setBoundaryPoints] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [precision, setPrecision] = useState(null);
  const [recall, setRecall] = useState(null);
  const [f1, setF1] = useState(null);
  const [activeSection, setActiveSection] = useState('simulation'); // Default to 'simulation'

  const addPoint = (x, y, label) => {
    setPoints([...points, { x, y, label }]);
  };

  const addRandomPoint = () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const label = Math.random() > 0.5 ? 1 : 0; // Randomly assign label 0 or 1
    addPoint(x, y, label);
  };

  const clearPoints = () => {
    setPoints([]);
    setBoundaryPoints([]);
    setAccuracy(null);
    setPrecision(null);
    setRecall(null);
    setF1(null);
  };

  const calculateRegression = () => {
    const { boundaryPoints, metrics } = getLogisticRegression(points);
    setBoundaryPoints(boundaryPoints);
    setAccuracy(metrics.accuracy || 0);
    setPrecision(metrics.precision || 0);
    setRecall(metrics.recall || 0);
    setF1(metrics.f1 || 0);
  };

  return (
    <div className="logistic-regression-container">
      <nav className="left-nav">
        <ul>
          <li
            className={activeSection === 'aim' ? 'active' : ''}
            onClick={() => setActiveSection('aim')}
          >
            Aim
          </li>
          <li
            className={activeSection === 'theory' ? 'active' : ''}
            onClick={() => setActiveSection('theory')}
          >
            Theory
          </li>
          <li
            className={activeSection === 'objectives' ? 'active' : ''}
            onClick={() => setActiveSection('objectives')}
          >
            Objectives
          </li>
          <li
            className={activeSection === 'formulae' ? 'active' : ''}
            onClick={() => setActiveSection('formulae')}
          >
            Formulae
          </li>
          <li
            className={activeSection === 'simulation' ? 'active' : ''}
            onClick={() => setActiveSection('simulation')}
          >
            Simulation
          </li>
          <li
            className={activeSection === 'feedback' ? 'active' : ''}
            onClick={() => setActiveSection('feedback')}
          >
            Feedback
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className={`section ${activeSection === 'aim' ? 'active' : ''}`}>
          <h2>Aim</h2>
          <p>Visualize logistic regression using a scatter plot and decision boundary.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>Logistic regression is a statistical method for binary classification...</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the concept of logistic regression.</li>
            <li>Visualize logistic regression model using scatter plot and boundary.</li>
          </ul>
        </div>
        <div className={`section ${activeSection === 'formulae' ? 'active' : ''}`}>
          <h2>Formulae</h2>
          <p>p = 1 / (1 + e^(-z)) where z is the linear combination of inputs...</p>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>Logistic Regression Visualization</h2>
            <div className="chart-container">
              <Scatter
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
                    {
                      type: 'line',
                      label: 'Decision Boundary',
                      data: boundaryPoints,
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                    },
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
              <button onClick={calculateRegression}>Calculate Regression</button>
            </div>
            <div className="metrics">
              <h3>Metrics</h3>
              <p>Accuracy: {accuracy !== null ? accuracy.toFixed(2) : 'N/A'}</p>
              <p>Precision: {precision !== null ? precision.toFixed(2) : 'N/A'}</p>
              <p>Recall: {recall !== null ? recall.toFixed(2) : 'N/A'}</p>
              <p>F1 Score: {f1 !== null ? f1.toFixed(2) : 'N/A'}</p>
            </div>
          </div>
        )}
        <div className={`section ${activeSection === 'feedback' ? 'active' : ''}`}>
          <h2>Feedback</h2>
          <p>Provide your feedback on the logistic regression experiment.</p>
        </div>
      </div>
    </div>
  );
}

export default LogisticRegression;
