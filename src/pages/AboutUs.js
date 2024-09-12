import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import icons
import './AboutUs.css'; // Import CSS for styling

const teamMembers = [
  {
    name: 'Alice Smith',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo URLs
    description: 'Frontend Developer with a passion for UI/UX design.',
    linkedin: 'https://www.linkedin.com/in/alice-smith',
    email: 'mailto:alice.smith@example.com',
  },
  {
    name: 'Bob Johnson',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo URLs
    description: 'Backend Developer specializing in Node.js and databases.',
    linkedin: 'https://www.linkedin.com/in/bob-johnson',
    email: 'mailto:bob.johnson@example.com',
  },
  {
    name: 'Charlie Brown',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo URLs
    description: 'Data Scientist with expertise in machine learning and analytics.',
    linkedin: 'https://www.linkedin.com/in/charlie-brown',
    email: 'mailto:charlie.brown@example.com',
  },
  {
    name: 'Dana Lee',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo URLs
    description: 'Project Manager with a focus on agile methodologies and team leadership.',
    linkedin: 'https://www.linkedin.com/in/dana-lee',
    email: 'mailto:dana.lee@example.com',
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="cards-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="card">
            <img src={member.photo} alt={member.name} className="card-photo" />
            <h2 className="card-name">{member.name}</h2>
            <p className="card-description">{member.description}</p>
            <div className="card-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="card-link">
                <FaLinkedin /> LinkedIn
              </a>
              <a href={member.email} className="card-link">
                <FaEnvelope /> Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
