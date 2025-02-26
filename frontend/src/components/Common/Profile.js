import React, { useState } from 'react';

const Profile = ({ token, username }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // Replace with your actual API call to update the profile
    console.log({ newUsername, newPassword });
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      {message && <p className="profile-message">{message}</p>}
      <form onSubmit={handleUpdate}>
        <label htmlFor="username">Username:</label>
        <input 
          id="username"
          type="text" 
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required 
        />
        <label htmlFor="new-password">New Password:</label>
        <input 
          id="new-password"
          type="password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
