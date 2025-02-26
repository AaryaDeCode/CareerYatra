import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // Optionally allow selection
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your registration API call
    console.log({ username, password, role });
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <div className="auth-switch">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
