// Utility functions for Naive Bayes classification

// Calculate means and variances of the points for each class
function calculateStatistics(points) {
    const classes = {
      0: { xSum: 0, ySum: 0, xSqSum: 0, ySqSum: 0, count: 0 },
      1: { xSum: 0, ySum: 0, xSqSum: 0, ySqSum: 0, count: 0 },
    };
  
    points.forEach(point => {
      const { x, y, label } = point;
      const cls = classes[label];
  
      cls.xSum += x;
      cls.ySum += y;
      cls.xSqSum += x * x;
      cls.ySqSum += y * y;
      cls.count++;
    });
  
    const stats = {};
    for (let label in classes) {
      const { xSum, ySum, xSqSum, ySqSum, count } = classes[label];
      stats[label] = {
        meanX: xSum / count,
        meanY: ySum / count,
        varianceX: xSqSum / count - Math.pow(xSum / count, 2),
        varianceY: ySqSum / count - Math.pow(ySum / count, 2),
        count,
      };
    }
  
    return stats;
  }
  
  // Gaussian distribution function
  function gaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }
  
  // Calculate Naive Bayes classification for points
  export function calculateNaiveBayes(points) {
    if (points.length === 0) {
      return { predictions: [], metrics: { accuracy: 0, precision: 0, recall: 0, f1: 0 } };
    }
  
    const stats = calculateStatistics(points);
    const totalPoints = points.length;
    const predictions = points.map(point => {
      const { x, y } = point;
  
      const probClass0 =
        gaussian(x, stats[0].meanX, stats[0].varianceX) *
        gaussian(y, stats[0].meanY, stats[0].varianceY) *
        (stats[0].count / totalPoints);
  
      const probClass1 =
        gaussian(x, stats[1].meanX, stats[1].varianceX) *
        gaussian(y, stats[1].meanY, stats[1].varianceY) *
        (stats[1].count / totalPoints);
  
      return probClass0 > probClass1 ? 0 : 1;
    });
  
    return { predictions, metrics: evaluateNaiveBayes(points, predictions) };
  }
  
  // Evaluate Naive Bayes model with accuracy, precision, recall, F1-score
  export function evaluateNaiveBayes(points, predictions) {
    let truePositives = 0;
    let trueNegatives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;
  
    points.forEach((point, index) => {
      const predicted = predictions[index];
      const actual = point.label;
  
      if (predicted === 1 && actual === 1) truePositives++;
      else if (predicted === 1 && actual === 0) falsePositives++;
      else if (predicted === 0 && actual === 1) falseNegatives++;
      else if (predicted === 0 && actual === 0) trueNegatives++;
    });
  
    const accuracy = (truePositives + trueNegatives) / points.length;
    const precision = truePositives + falsePositives === 0 ? 0 : truePositives / (truePositives + falsePositives);
    const recall = truePositives + falseNegatives === 0 ? 0 : truePositives / (truePositives + falseNegatives);
    const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  
    return { accuracy, precision, recall, f1 };
  }
  