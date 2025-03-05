"use client";

import { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import "@/styles.css"; // Import the CSS file

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      const { data } = await api.post("/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", data.access_token); // Store token
      router.push("/dashboard"); // Redirect after login
    } catch (err) {
      console.error("Login failed:", err.response?.data);
      setError("Invalid email or password");
    }
  };

  return (
    <main className="form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
