import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Careeryatra</h1>
      <p>Your gateway to new career opportunities!</p>
      <div>
        <Link to="/login">
          <button style={{ marginRight: '10px' }}>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
