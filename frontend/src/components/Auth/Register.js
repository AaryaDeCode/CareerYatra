import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../services/apiService';

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  // Although the backend does not use role, we allow selection for frontend simulation
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(usernameInput, password);
      history.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input 
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%' }}>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
