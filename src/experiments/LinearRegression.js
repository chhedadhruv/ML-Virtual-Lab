import React, { useState, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getLinearRegression, calculateR2, calculateMSE } from './regressionUtils';
import './LinearRegression.css';  // Import the CSS file for styling

// Register Chart.js components
Chart.register(...registerables);

const LinearRegression = () => {
  const [points, setPoints] = useState([]);
  const [slope, setSlope] = useState(null);
  const [intercept, setIntercept] = useState(null);
  const [r2, setR2] = useState(null);
  const [mse, setMSE] = useState(null);
  const [activeSection, setActiveSection] = useState('simulation'); // Default to 'simulation'
  const chartRef = useRef(null);

  const addPoint = (x, y) => {
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
    setSlope(null);
    setIntercept(null);
    setR2(null);
    setMSE(null);
  };

  const calculateRegression = () => {
    const { slope, intercept } = getLinearRegression(points);
    const r2 = calculateR2(points, slope, intercept);
    const mse = calculateMSE(points, slope, intercept);
    setSlope(slope);
    setIntercept(intercept);
    setR2(r2);
    setMSE(mse);
  };

  return (
    <div className="linear-regression-container">
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
          <p>Visualize linear regression using a scatter plot and regression line.</p>
        </div>
        <div className={`section ${activeSection === 'theory' ? 'active' : ''}`}>
          <h2>Theory</h2>
          <p>Linear regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. In this experiment, we visualize a simple linear regression model using a scatter plot and regression line.</p>
        </div>
        <div className={`section ${activeSection === 'objectives' ? 'active' : ''}`}>
          <h2>Objectives</h2>
          <ul>
            <li>Understand the concept of linear regression.</li>
            <li>Visualize a linear regression model using a scatter plot and regression line.</li>
            <li>Calculate the slope, intercept, R², and mean squared error (MSE) of the regression line.</li>
          </ul>
        </div>
        <div className={`section ${activeSection === 'formulae' ? 'active' : ''}`}>
          <h2>Formulae</h2>
          <p>The equation of a simple linear regression line is given by:</p>
          <p>y = mx + c</p>
          <p>where:</p>
          <ul>
            <li>y is the dependent variable (output).</li>
            <li>x is the independent variable (input).</li>
            <li>m is the slope of the line.</li>
            <li>c is the y-intercept of the line.</li>
          </ul>
          <p>The slope (m) of the regression line is calculated as:</p>
          <p>m = Σ((x - x̄)(y - ȳ)) / Σ(x - x̄)²</p>
          <p>The y-intercept (c) of the regression line is calculated as:</p>
          <p>c = ȳ - m * x̄</p>
          <p>where:</p>
          <ul>
            <li>Σ denotes the sum of the values.</li>
            <li>x̄ is the mean of the independent variable x.</li>
            <li>ȳ is the mean of the dependent variable y.</li>
          </ul>
        </div>
        {activeSection === 'simulation' && (
          <div className="simulation">
            <h2>Linear Regression Visualization</h2>
            <div className="chart-container">
              <Scatter
                ref={chartRef}
                data={{
                  datasets: [
                    {
                      label: 'Data Points',
                      data: points,
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.4)',
                      pointRadius: 5,
                    },
                    {
                      type: 'line',
                      label: 'Regression Line',
                      data: [
                        { x: Math.min(...points.map(p => p.x)), y: slope * Math.min(...points.map(p => p.x)) + intercept },
                        { x: Math.max(...points.map(p => p.x)), y: slope * Math.max(...points.map(p => p.x)) + intercept },
                      ],
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      type: 'linear',
                      position: 'bottom',
                      ticks: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                    y: {
                      type: 'linear',
                      position: 'left',
                      ticks: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="controls">
              <button onClick={() => addPoint(Math.random() * 10, Math.random() * 10)}>Add Random Point</button>
              <button onClick={clearPoints}>Clear Points</button>
              <button onClick={calculateRegression}>Calculate Regression</button>
            </div>
            <div className="results">
              {slope !== null && (
                <p>
                  <strong>Slope:</strong> {slope.toFixed(2)}, <strong>Intercept:</strong> {intercept.toFixed(2)}, <strong>R²:</strong> {r2.toFixed(2)}, <strong>MSE:</strong> {mse.toFixed(2)}
                </p>
              )}
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
}

export default LinearRegression;
