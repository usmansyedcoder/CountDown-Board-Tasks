import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure to import the CSS file

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          ref={emailRef}
          required
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
          className="input-field"
        />
        <button disabled={loading} type="submit" className="submit-button">
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
      <p className="signup-link">
        Need an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
