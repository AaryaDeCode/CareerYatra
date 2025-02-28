// src/components/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email_or_username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email_or_username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/auth/login/', {
        email_or_username,
        password
      });

      // Store tokens in localStorage
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      // Store user data
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect based on user type
      if (res.data.user.user_type === 'recruiter') {
        navigate('/jobs');
      } else {
        navigate('/candidates/jobs');
      }
    } catch (err) {
      setError(
        err.response && err.response.data
          ? Object.values(err.response.data).flat().join(' ')
          : 'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h2>Sign in to your account</h2>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email_or_username">Email or Username</label>
            <input
              id="email_or_username"
              name="email_or_username"
              type="text"
              required
              placeholder="Email or Username"
              value={email_or_username}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="auth-button"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="auth-redirect">
            <a href="/auth/register">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
