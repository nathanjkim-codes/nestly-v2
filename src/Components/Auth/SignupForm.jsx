import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export function SignupForm() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill in all field");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 409) {
        setError("Email is already registered");
        return;
      }

      if (!response.ok) {
        setError("Unable to create account");
        return;
      }

      setMessage("Account created successfully");
      navigate("/login", { replace: true });
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
          <h2 className="auth-title">Create an account</h2>
          <p className="auth-subtitle">Sign up to get started with Nestly</p>
        </div>
        <div className="form-group">
          <label htmlFor="signup-email" className="login-label">
            Email:
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="email"
            id="signup-email"
            placeholder="Please enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password" className="login-label">
            Password:
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            id="signup-password"
            type="password"
            placeholder="Please enter password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button className="auth-button" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
