import { useState } from "react";
import { login } from "../auth/authService";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(username, password);
      setError("");
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Sign In</h2>
        <p className="card-subtitle">JWT Authentication Demonstration</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary" id="login-button">
          Login
        </button>
      </form>

      <p className="hint">
        Try: <strong>admin</strong> / <strong>admin123</strong> or{" "}
        <strong>rahul</strong> / <strong>user123</strong>
      </p>
    </div>
  );
}
