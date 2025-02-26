import React from 'react';
import { Link } from 'react-router-dom';
import JobList from './JobList';

const CandidateDashboard = ({ token, username }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Candidate Dashboard</h2>
        <Link to="/profile">Update Profile</Link>
      </div>
      <div className="dashboard-content">
        <JobList token={token} username={username} />
      </div>
    </div>
  );
};

export default CandidateDashboard;
