import React from 'react';
import ExperimentCard from '../components/ExperimentCard';
import './ExperimentsPage.css'; // Import the CSS file

const experiments = [
  { id: 1, name: 'Linear Regression', description: 'Visualize linear regression' },
  { id: 2, name: 'Logistic Regression', description: 'Visualize logistic regression' },
  { id: 3, name: 'K-Means Clustering', description: 'Visualize k-means clustering' },
  { id: 4, name: 'K-Nearest Neighbors', description: 'Visualize k-nearest neighbors' },
  { id: 5, name: 'Naive Bayes', description: 'Visualize naive bayes' },
  { id: 6, name: 'Support Vector Machine', description: 'Visualize support vector machine' },
];

const ExperimentsPage = () => {
  return (
    <div className="experiments-page">
      <h2>Experiments</h2>
      <div className="experiments-list">
        {experiments.map(experiment => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );
};

export default ExperimentsPage;
