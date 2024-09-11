// Helper function to calculate the distance between two points
const euclideanDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  };
  
  // Perform K-Nearest Neighbors classification
  export const classifyPoint = (points, newPoint, k) => {
    // Calculate the distance between the new point and each existing point
    const distances = points.map(point => ({
      ...point,
      distance: euclideanDistance(point, newPoint),
    }));
  
    // Sort points by distance (ascending)
    distances.sort((a, b) => a.distance - b.distance);
  
    // Select the K nearest points
    const nearestNeighbors = distances.slice(0, k);
  
    // Count the number of points in each class (0 or 1)
    const votes = nearestNeighbors.reduce(
      (acc, point) => {
        acc[point.label] += 1;
        return acc;
      },
      { 0: 0, 1: 0 }
    );
  
    // Return the class with the most votes
    return votes[1] > votes[0] ? 1 : 0;
  };
  