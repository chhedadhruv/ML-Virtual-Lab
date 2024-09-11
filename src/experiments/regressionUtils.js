// regressionUtils.js

// Calculate linear regression slope and intercept
export function getLinearRegression(points) {
    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }
  
  // Calculate R² (coefficient of determination)
  export function calculateR2(points, slope, intercept) {
    const meanY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
    const totalSumSquares = points.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0);
    const residualSumSquares = points.reduce((sum, p) => sum + Math.pow(p.y - (slope * p.x + intercept), 2), 0);
  
    return 1 - residualSumSquares / totalSumSquares;
  }
  
  // Calculate Mean Squared Error (MSE)
  export function calculateMSE(points, slope, intercept) {
    return points.reduce((sum, p) => sum + Math.pow(p.y - (slope * p.x + intercept), 2), 0) / points.length;
  }
  
  
  // Calculate logistic regression boundary and evaluation metrics
export function getLogisticRegression(points) {
  if (points.length === 0) {
    return { boundaryPoints: [], metrics: { accuracy: 0, precision: 0, recall: 0, f1: 0 } };
  }

  // Logistic regression model
  const logisticRegression = (x, w0, w1, w2) => 1 / (1 + Math.exp(-(w0 + w1 * x + w2 * x)));

  // Initialize weights
  let w0 = 0;
  let w1 = 0;
  let w2 = 0;

  // Gradient descent
  const learningRate = 0.01;
  for (let i = 0; i < 1000; i++) {
    let sum0 = 0;
    let sum1 = 0;
    let sum2 = 0;
    for (const point of points) {
      const predicted = logisticRegression(point.x, w0, w1, w2);
      sum0 += predicted - point.label;
      sum1 += (predicted - point.label) * point.x;
      sum2 += (predicted - point.label) * point.y;
    }
    w0 -= learningRate * sum0;
    w1 -= learningRate * sum1;
    w2 -= learningRate * sum2;
  }

  // Calculate boundary points
  const boundaryPoints = [];
  for (let x = 0; x <= 10; x += 0.1) {
    const yBoundary = logisticRegression(x, w0, w1, w2);
    boundaryPoints.push({ x, y: yBoundary });
  }

  // Evaluate model
  const metrics = evaluateLogisticRegression(points, w0, w1, w2);

  return { boundaryPoints, metrics };
}

// Evaluate logistic regression model
function evaluateLogisticRegression(points, w0, w1, w2) {
  let truePositives = 0;
  let trueNegatives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;

  for (const point of points) {
    const predicted = 1 / (1 + Math.exp(-(w0 + w1 * point.x + w2 * point.y)));
    if (predicted > 0.5 && point.label === 1) {
      truePositives++;
    } else if (predicted > 0.5 && point.label === 0) {
      falsePositives++;
    } else if (predicted <= 0.5 && point.label === 1) {
      falseNegatives++;
    } else {
      trueNegatives++;
    }
  }

  const accuracy = (truePositives + trueNegatives) / points.length;
  const precision = (truePositives + falsePositives) === 0 ? 0 : truePositives / (truePositives + falsePositives);
  const recall = (truePositives + falseNegatives) === 0 ? 0 : truePositives / (truePositives + falseNegatives);
  const f1 = (precision + recall === 0) ? 0 : 2 * (precision * recall) / (precision + recall);

  return { accuracy, precision, recall, f1 };
}
