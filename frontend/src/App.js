import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CandidateDashboard from './components/Candidate/CandidateDashboard';
import RecruiterDashboard from './components/Recruiter/RecruiterDashboard';
import CandidateRanking from './components/Recruiter/CandidateRanking'; // New Candidate Ranking Page
import Profile from './components/Common/Profile';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  // Read saved auth info if available
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (role, token, username) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('username', username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Dashboard Route */}
        <Route 
          path="/candidate/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRole="candidate">
              <CandidateDashboard token={token} username={username} />
            </PrivateRoute>
          } 
        />

        {/* Recruiter Dashboard Route */}
        <Route 
          path="/recruiter/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRole="recruiter">
              <RecruiterDashboard token={token} username={username} />
            </PrivateRoute>
          } 
        />

        {/* Candidate Ranking Route for Recruiters */}
        <Route 
          path="/recruiter/rankings" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRole="recruiter">
              <CandidateRanking />
            </PrivateRoute>
          } 
        />

        {/* Profile Route (for both candidates and recruiters) */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRole={["candidate", "recruiter"]}>
              <Profile token={token} username={username} />
            </PrivateRoute>
          } 
        />

        {/* Catch-All Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
