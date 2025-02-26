import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/apiService';
import JobPostForm from './JobPostForm';
import '../../styles/Dashboard.css'; // Ensure this CSS file exists

const RecruiterDashboard = ({ token, username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        const myPosts = allPosts.filter(post => post.author_username === username);
        setPosts(myPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Recruiter Dashboard</h2>
        <Link to="/profile" className="dashboard-link">Update Profile</Link>
      </div>

      <div className="dashboard-content">
        <JobPostForm token={token} onPostCreated={() => {
          setTimeout(() => {
            getPosts().then(allPosts => {
              const myPosts = allPosts.filter(post => post.author_username === username);
              setPosts(myPosts);
            });
          }, 500);
        }} />
      </div>

      <h3 className="section-title">My Job Posts</h3>
      <div className="job-list">
        {posts.length === 0 ? (
          <p className="no-jobs">You haven't posted any jobs yet.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="job-card">
              <h4>{post.company_name} - {post.role}</h4>
              <p>Experience: {post.experience}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
