import React, { useState, useEffect } from 'react';
import { getPosts } from '../../services/apiService';

const JobList = ({ token, username }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setJobs(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleApply = (jobId) => {
    // For demonstration, we simply mark the job as applied locally.
    setAppliedJobs([...appliedJobs, jobId]);
  };

  return (
    <div>
      <h3>Available Jobs</h3>
      {jobs.length === 0 ? (
        <p>No job posts available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {jobs.map(job => (
            <li key={job.id} style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '10px' }}>
              <h4>{job.company_name} - {job.role}</h4>
              <p>{job.experience}</p>
              {appliedJobs.includes(job.id) ? (
                <span style={{ color: 'green' }}>Applied</span>
              ) : (
                <button onClick={() => handleApply(job.id)}>Apply</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
