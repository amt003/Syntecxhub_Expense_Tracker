import React, { useState, useRef, useCallback } from "react";
import { loginUser, registerUser } from "../authService";

function Auth({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      try {
        setLoading(true);

        if (isSignUp) {
          if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
          }
          const response = await registerUser(
            formData.email,
            formData.password,
            formData.name,
          );
          if (response.success) {
            onLoginSuccess(response.user);
          }
        } else {
          const response = await loginUser(formData.email, formData.password);
          if (response.success) {
            onLoginSuccess(response.user);
          }
        }
      } catch (err) {
        setError(err.message);
        if (isSignUp && !formData.name) {
          nameInputRef.current?.focus();
        } else if (!formData.email) {
          emailInputRef.current?.focus();
        } else {
          passwordInputRef.current?.focus();
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, isSignUp, onLoginSuccess],
  );

  const toggleAuthMode = useCallback(() => {
    setIsSignUp((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  }, []);

  const handleDemoLogin = useCallback(async () => {
    setError("");
    try {
      setLoading(true);
      const response = await loginUser("demo@example.com", "demo123");
      if (response.success) {
        onLoginSuccess(response.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onLoginSuccess]);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>ExpenseFlow</h1>
          <p>{isSignUp ? "Create Account" : "Welcome Back"}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                ref={nameInputRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={loading}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
            {isSignUp && (
              <small
                style={{ display: "block", marginTop: "5px", color: "#999" }}
              >
                At least 6 characters
              </small>
            )}
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                disabled={loading}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn-demo"
          onClick={handleDemoLogin}
          disabled={loading}
        >
          Try Demo (demo@example.com)
        </button>

        <div className="auth-toggle">
          <p>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              className="toggle-btn"
              onClick={toggleAuthMode}
              disabled={loading}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
