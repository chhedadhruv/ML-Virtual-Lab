import React, { useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { performKMeansClustering } from './kMeansUtils';
import './KMeansClustering.css';

// Register Chart.js components
Chart.register(...registerables);

const KMeansClustering = () => {
  const [points, setPoints] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [k, setK] = useState(3);
  const [activeSection, setActiveSection] = useState('simulation'); // Default section is simulation
  const chartRef = useRef(null);

  const addPoint = (x, y) => {
    setPoints([...points, { x, y }]);
  };

  const addRandomPoint = () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    addPoint(x, y);
  };

  const clearPoints = () => {
    setPoints([]);
    setCentroids([]);
    setClusters([]);
  };

  const performClustering = () => {
    const { newCentroids, newClusters } = performKMeansClustering(points, k);
    setCentroids(newCentroids);
    setClusters(newClusters);
  };

  const handleKChange = (event) => {
    setK(parseInt(event.target.value, 10));
  };

  return (
    <div className="kmeans-container">
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
            className={activeSection === 'algorithm' ? 'active' : ''}
            onClick={() => setActiveSection('algorithm')}
          >
            Algorithm
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
          <p>Visualize the K-Means clustering algorithm and understand how the algorithm groups data points into clusters.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>K-Means clustering is an unsupervised learning algorithm that partitions the dataset into K clusters, where each point belongs to the cluster with the nearest centroid.</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the K-Means algorithm.</li>
            <li>Visualize the clustering process.</li>
            <li>Modify the number of clusters (K) and observe the results.</li>
          </ul>
        </div>
        <div className={`section ${activeSection === 'algorithm' ? 'active' : ''}`}>
          <h2>Algorithm</h2>
          <p>The K-Means algorithm follows these steps:</p>
          <ol>
            <li>Randomly initialize K centroids.</li>
            <li>Assign each data point to the nearest centroid to form K clusters.</li>
            <li>Recalculate the centroids of each cluster based on the points assigned to it.</li>
            <li>Repeat the process until the centroids no longer change or the iterations reach a set limit.</li>
          </ol>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>K-Means Clustering Visualization</h2>
            <div className="chart-container">
              <Scatter
                ref={chartRef}
                data={{
                  datasets: [
                    {
                      label: 'Points',
                      data: points,
                      borderColor: 'rgba(255, 99, 132, 1)',
                      backgroundColor: 'rgba(255, 99, 132, 0.4)',
                      pointRadius: 5,
                    },
                    ...centroids.map((centroid, index) => ({
                      label: `Centroid ${index + 1}`,
                      data: [centroid],
                      backgroundColor: 'rgba(75, 192, 192, 1)',
                      pointRadius: 8,
                    })),
                    ...clusters.map((cluster, index) => ({
                      label: `Cluster ${index + 1}`,
                      data: cluster,
                      backgroundColor: 'rgba(54, 162, 235, 0.4)',
                      pointRadius: 5,
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
              <button onClick={performClustering}>Perform Clustering</button>
              <div style={{ marginTop: '3rem' }}>
                <label>K (number of clusters): </label>
                <input type="number" value={k} onChange={handleKChange} min="1" />
              </div>
            </div>
          </div>
        )}
        <div className={`section ${activeSection === 'feedback' ? 'active' : ''}`}>
          <h2>Feedback</h2>
          <p>We would love to hear your thoughts or suggestions on this experiment!</p>
        </div>
      </div>
    </div>
  );
};

export default KMeansClustering;
