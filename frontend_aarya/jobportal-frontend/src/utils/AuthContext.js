// src/utils/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("access_token");

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Error parsing user data:", error);
          sessionStorage.clear();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const refresh_token = sessionStorage.getItem("refresh_token");
      if (!refresh_token) return;

      const res = await axios.post("/auth/token/refresh/", { refresh: refresh_token });
      sessionStorage.setItem("access_token", res.data.access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, setUser, setIsAuthenticated, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
