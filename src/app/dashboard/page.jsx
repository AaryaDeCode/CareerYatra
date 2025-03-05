"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import "@/styles.css"; // Import global styles

export default function EmployerDashboardPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", null, { params: form });
      alert("Job posted successfully!");
    } catch (err) {
      console.error("Failed to post job:", err.response?.data);
    }
  };

  return (
    <main className="dashboard-container">
      <h2>Employer Dashboard</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="form-input"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
          className="form-textarea"
          required
        />
        <button type="submit" className="form-button">Post Job</button>
      </form>
    </main>
  );
}
