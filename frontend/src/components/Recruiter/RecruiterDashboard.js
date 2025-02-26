import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/apiService';
import JobPostForm from './JobPostForm';

const RecruiterDashboard = ({ token, username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        // Show only the posts created by the logged-in recruiter
        const myPosts = allPosts.filter(post => post.author_username === username);
        setPosts(myPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [username]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recruiter Dashboard</h2>
      <nav>
        <Link to="/profile">Update Profile</Link>
      </nav>
      <JobPostForm token={token} onPostCreated={() => {
        // Refresh posts after a new job is posted
        setTimeout(() => {
          getPosts().then(allPosts => {
            const myPosts = allPosts.filter(post => post.author_username === username);
            setPosts(myPosts);
          });
        }, 500);
      }} />
      <h3>My Job Posts</h3>
      {posts.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map(post => (
            <li key={post.id} style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '10px' }}>
              <h4>{post.company_name} - {post.role}</h4>
              <p>{post.experience}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecruiterDashboard;
