import React, { useState, useRef } from 'react';
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
  const chartRef = useRef(null);

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
    <div className="logistic-regression">
      <h2>Logistic Regression Visualization</h2>
      <div className="chart-container">
        <Scatter
          ref={chartRef}
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
  );
}

export default LogisticRegression;
