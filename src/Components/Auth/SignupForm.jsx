import { useState } from "react";

export function SignupForm() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
    } catch (error) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="signup-email">Email:</label>
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
        <label htmlFor="signup-password">Password:</label>
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
      {message && <p className="sucess-message">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
