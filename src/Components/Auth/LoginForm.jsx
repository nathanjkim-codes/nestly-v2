import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      navigate("/", { replace: true });
      setMessage("Login successful");
    } catch (error) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <p className="brand-title">NESTLY</p>
        <p className="brand-description">
          Your family's growth, all in one place.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-heading">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to your Nestly account</p>
        </div>
        <div className="form-group">
          <label htmlFor="login-email" className="login-label">
            Email:
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            id="login-email"
            placeholder="Please enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password" className="login-label">
            Password:
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="login-password"
            placeholder="Please enter password"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
