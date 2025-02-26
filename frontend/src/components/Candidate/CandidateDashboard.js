import React from 'react';
import { Link } from 'react-router-dom';
import JobList from './JobList';

const CandidateDashboard = ({ token, username }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Candidate Dashboard</h2>
      <nav>
        <Link to="/profile">Update Profile</Link>
      </nav>
      <JobList token={token} username={username} />
    </div>
  );
};

export default CandidateDashboard;
