import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { calculateNaiveBayes, evaluateNaiveBayes } from './naiveBayesUtils';
import './NaiveBayes.css';

// Register Chart.js components
Chart.register(...registerables);

const NaiveBayes = () => {
  const [points, setPoints] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [precision, setPrecision] = useState(null);
  const [recall, setRecall] = useState(null);
  const [f1, setF1] = useState(null);
  const [activeSection, setActiveSection] = useState('simulation'); // Default section

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
    setPredictions([]);
    setAccuracy(null);
    setPrecision(null);
    setRecall(null);
    setF1(null);
  };

  const performClassification = () => {
    if (points.length === 0) {
      alert("Please add points before performing classification.");
      return;
    }

    const { predictions, metrics } = calculateNaiveBayes(points);
    const evaluation = evaluateNaiveBayes(points, predictions);

    setPredictions(predictions);
    setAccuracy(evaluation.accuracy);
    setPrecision(evaluation.precision);
    setRecall(evaluation.recall);
    setF1(evaluation.f1);
  };

  return (
    <div className="naive-bayes-container">
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
          <p>The aim is to classify data points into categories using the Naive Bayes classifier.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>Naive Bayes is a classification algorithm based on applying Bayes' theorem with strong independence assumptions.</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the Naive Bayes algorithm.</li>
            <li>Visualize how points are classified using Naive Bayes.</li>
            <li>Measure the accuracy, precision, recall, and F1 score of the classifier.</li>
          </ul>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>Naive Bayes Classification Simulation</h2>
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
                    ...predictions.map((pred, idx) => ({
                      label: `Predicted Class ${pred}`,
                      data: [points[idx]],
                      backgroundColor: pred === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
                      pointRadius: 8,
                      borderColor: pred === 1 ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
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
              <button onClick={performClassification}>Classify</button>
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
          <p>We would love to hear your thoughts or suggestions about the Naive Bayes simulation!</p>
        </div>
      </div>
    </div>
  );
};

export default NaiveBayes;
