import React, { useState } from 'react';
import { createPost } from '../../services/apiService';

const JobPostForm = ({ token, onPostCreated }) => {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { company_name: companyName, role, experience };
    try {
      await createPost(postData, token);
      setCompanyName('');
      setRole('');
      setExperience('');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError('Failed to create job post.');
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Post a New Job</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Company Name:</label>
          <input 
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Role:</label>
          <input 
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Experience:</label>
          <textarea 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            style={{ width: '100%' }}
          ></textarea>
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;
