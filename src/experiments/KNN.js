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
    <div className="knn-classification">
      <h2>K-Nearest Neighbors (KNN) Classification</h2>
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
        <div>
          <label>K (number of neighbors): </label>
          <input type="number" value={k} onChange={handleKChange} min="1" />
        </div>
      </div>
    </div>
  );
};

export default KNN;
