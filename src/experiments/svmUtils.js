// Helper function to simulate a linear SVM decision boundary
export const classifySVM = (points, newPoint) => {
    if (points.length === 0) return 0; // Default class if no points are available
  
    // Simulate a linear decision boundary (this can be more complex based on real SVM calculations)
    const boundaryX = 5; // Simple decision boundary at x = 5
    return newPoint.x > boundaryX ? 1 : 0;
  };
  