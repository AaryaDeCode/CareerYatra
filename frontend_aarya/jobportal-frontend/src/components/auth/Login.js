// src/components/Auth/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email_or_username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const userType = JSON.parse(user).user_type;
      navigate(userType === "recruiter" ? "/recruiter/dashboard" : "/candidates/jobs", { replace: true });
    }
  }, [navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login/", formData);
      const { access, refresh, user } = res.data;

      sessionStorage.setItem("access_token", access);
      sessionStorage.setItem("refresh_token", refresh);
      sessionStorage.setItem("user", JSON.stringify(user));

      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      setUser(user);
      setIsAuthenticated(true);
      navigate(user.user_type === "recruiter" ? "/recruiter/dashboard" : "/candidates/jobs", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Sign in to your account</h2>
        <form className="auth-form" onSubmit={onSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label>Email or Username</label>
            <input name="email_or_username" type="text" required value={formData.email_or_username} onChange={onChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" required value={formData.password} onChange={onChange} />
          </div>
          <button type="submit" disabled={loading} className="auth-button">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
