import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to CareerYatra</h1>
      <p className="landing-subtitle">Your gateway to amazing job opportunities!</p>
      <div className="landing-buttons">
        <Link to="/login" className="landing-button">Login</Link>
        <Link to="/register" className="landing-button">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
