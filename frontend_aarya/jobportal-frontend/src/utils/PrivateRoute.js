// src/utils/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './utils.css';

// Route component that requires authentication
export const PrivateRoute = ({ userType }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // If userType is specified, check if the user has the required type
  if (userType && user.user_type !== userType) {
    return <Navigate to={user.user_type === 'recruiter' ? '/jobs' : '/candidates/jobs'} />;
  }

  // If authenticated and has the right user type, render the child routes
  return <Outlet />;
};