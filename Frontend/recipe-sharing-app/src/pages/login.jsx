import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const isModal = location.state?.background;

  useEffect(() => {
    if (location.state?.alert) {
      setError(location.state.alert);
    }
  }, [location.state]);

  const handleClose = () => {
    if (isModal) {
      navigate(-1); 
    } else {
      navigate("/"); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <button className="close-btn" onClick={handleClose} aria-label="Close login">
        <i className="ri-close-line"></i>
      </button>
      <div className="auth-box relative">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue exploring recipes</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="📧 Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
            autoComplete="email"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            autoComplete="current-password"
            disabled={loading}
          />
          <button 
            type="submit" 
            className={`auth-btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="auth-footer-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="auth-link">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
