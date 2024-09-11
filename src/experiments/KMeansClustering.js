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
    <div className="kmeans-clustering">
      <h2>K-Means Clustering Visualization</h2>
      <div className="chart-container">
        <Scatter
          height={100}
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
  );
};

export default KMeansClustering;
