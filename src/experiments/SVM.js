import React, { useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './svm.css';  // Import the CSS file for styling
import { classifySVM } from './svmUtils'; // Helper function for simulated SVM classification

// Register Chart.js components
Chart.register(...registerables);

const SVM = () => {
  const [points, setPoints] = useState([]);
  const [classifiedPoints, setClassifiedPoints] = useState([]);
  const [activeSection, setActiveSection] = useState('simulation'); // Default to 'simulation'

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

  // Perform SVM classification on a new random point
  const classifyNewPoint = () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const newPoint = { x, y };
    const predictedLabel = classifySVM(points, newPoint);
    setClassifiedPoints([...classifiedPoints, { ...newPoint, label: predictedLabel }]);
  };

  return (
    <div className="svm-container">
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
          <p>Visualize SVM classification using a scatter plot.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>Support Vector Machines (SVM) are supervised learning models used for classification and regression tasks. This visualization demonstrates how SVM classifies data points into different categories based on a hyperplane.</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the concept of SVM classification.</li>
            <li>Visualize SVM classification on a scatter plot.</li>
            <li>Observe how new points are classified based on existing data.</li>
          </ul>
        </div>
        <div className={`section ${activeSection === 'formulae' ? 'active' : ''}`}>
          <h2>Formulae</h2>
          <p>The SVM aims to find a hyperplane that best separates the data into different classes. The decision boundary can be described using:</p>
          <p>f(x) = w^T * x + b</p>
          <p>where:</p>
          <ul>
            <li>w is the weight vector.</li>
            <li>x is the feature vector.</li>
            <li>b is the bias term.</li>
          </ul>
          <p>The goal is to maximize the margin between the classes.</p>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>SVM Classification Visualization</h2>
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
              <button onClick={() => addRandomPoint()}>Add Random Point</button>
              <button onClick={clearPoints}>Clear Points</button>
              <button onClick={classifyNewPoint}>Classify New Random Point</button>
            </div>
          </div>
        )}
        <div className={`section ${activeSection === 'feedback' ? 'active' : ''}`}>
          <h2>Feedback</h2>
          <p>Have feedback or suggestions for this experiment? Let us know!</p>
        </div>
      </div>
    </div>
  );
};

export default SVM;
