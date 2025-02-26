import React, { useState } from 'react';

const Profile = ({ token, username }) => {
  const [user, setUser] = useState({
    username: username,
  });
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // No API endpoint provided for profile updates.
    setMessage('Profile updated successfully (simulation).');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Update Profile</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input 
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            style={{ width: '100%' }}
            disabled
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>New Password:</label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
