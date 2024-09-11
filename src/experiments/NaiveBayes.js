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
    <div className="naive-bayes">
      <h2>Naive Bayes Classification Visualization</h2>
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
  );
};

export default NaiveBayes;
