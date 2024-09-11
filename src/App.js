import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExperimentsPage from './pages/ExperimentsPage';
import FeedbackForm from './components/FeedbackForm';
import LinearRegression from './experiments/LinearRegression';
import LogisticRegression from './experiments/LogisticRegression';
import KMeansClustering from './experiments/KMeansClustering';
import KNN from './experiments/KNN';
import NaiveBayes from './experiments/NaiveBayes';
import SVM from './experiments/SVM';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/experiments/1" element={<LinearRegression />} />
          <Route path="/experiments/2" element={<LogisticRegression />} />
          <Route path="/experiments/3" element={<KMeansClustering />} />
          <Route path="/experiments/4" element={<KNN />} />
          <Route path="/experiments/5" element={<NaiveBayes />} />
          <Route path="/experiments/6" element={<SVM />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
