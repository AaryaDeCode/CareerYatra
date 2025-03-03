// src/utils/PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoute = ({ userType }) => {
  const { isAuthenticated, user, setUser, setIsAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && !user) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.clear();
      }
    }
  }, [setUser, setIsAuthenticated, user]);

  if (loading) return <div className="loading-container">Loading...</div>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (userType && user.user_type !== userType) {
    const redirectPath = user.user_type === "recruiter" ? "/recruiter/dashboard" : "/candidates/jobs";
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};
