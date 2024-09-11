export function performKMeansClustering(points, k) {
  // Initialize centroids - note that 'let' is used instead of 'const'
  let centroids = initializeCentroids(points, k);
  let clusters = [];
  let converged = false;

  // Perform clustering
  while (!converged) {
    // Assign points to the nearest centroid
    clusters = assignPointsToCentroids(points, centroids);
    
    // Calculate new centroids
    const newCentroids = calculateNewCentroids(clusters);
    
    // Check for convergence
    converged = checkConvergence(centroids, newCentroids);
    
    // Update centroids - reassignable, hence 'let'
    centroids = newCentroids;
  }

  return { newCentroids: centroids, newClusters: clusters };
}

function initializeCentroids(points, k) {
  // Randomly select k points as initial centroids
  const centroids = [];
  const uniquePoints = Array.from(new Set(points)); // Ensure uniqueness
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * uniquePoints.length);
    const randomPoint = uniquePoints[randomIndex];
    centroids.push(randomPoint);
  }
  return centroids;
}

function assignPointsToCentroids(points, centroids) {
  // Assign each point to the nearest centroid
  const clusters = Array(centroids.length).fill(null).map(() => []);
  
  points.forEach(point => {
    let closestCentroidIndex = 0;
    let minDistance = calculateDistance(point, centroids[0]);

    for (let i = 1; i < centroids.length; i++) {
      const distance = calculateDistance(point, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCentroidIndex = i;
      }
    }

    clusters[closestCentroidIndex].push(point);
  });

  return clusters;
}

function calculateNewCentroids(clusters) {
  // Calculate new centroids based on clusters
  return clusters.map(cluster => {
    const sumX = cluster.reduce((sum, point) => sum + point.x, 0);
    const sumY = cluster.reduce((sum, point) => sum + point.y, 0);
    return {
      x: sumX / cluster.length,
      y: sumY / cluster.length,
    };
  });
}

function checkConvergence(oldCentroids, newCentroids) {
  // Check if centroids have changed significantly
  for (let i = 0; i < oldCentroids.length; i++) {
    if (calculateDistance(oldCentroids[i], newCentroids[i]) > 0.01) {
      return false;
    }
  }
  return true;
}

function calculateDistance(point1, point2) {
  // Euclidean distance between two points
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}
