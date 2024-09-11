import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted successfully!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
