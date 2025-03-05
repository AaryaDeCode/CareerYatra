"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import "@/styles.css"; // Import the CSS file

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form); // ✅ Send data in request body
      router.push("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
    }
  };

  return (
    <main className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name} // ✅ Controlled input
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email} // ✅ Controlled input
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password} // ✅ Controlled input
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={form.role} // ✅ Controlled input
          onChange={handleChange}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
