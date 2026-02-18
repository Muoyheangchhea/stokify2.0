import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash,
  FaGoogle, FaFacebook, FaApple, FaArrowRight,
  FaHeart, FaShieldAlt, FaCheckCircle
} from 'react-icons/fa';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && !formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home or dashboard
      navigate('/');
    }, 1500);
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      agreeTerms: false
    });
  };

  return (
    <div className="login-page">
      {/* Left Side - Branding */}
      <div className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <span className="logo-icon">🎨</span>
            <span className="logo-text">Strokify</span>
          </div>
          
          <h1 className="brand-title">
            {isLogin ? 'Welcome Back!' : 'Join Our Mission'}
          </h1>
          
          <p className="brand-subtitle">
            {isLogin 
              ? 'Sign in to continue your health journey'
              : 'Create an account and start protecting your family from stroke'
            }
          </p>

          <div className="brand-features">
            <div className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>AI-powered symptom detection</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>24/7 stroke specialist access</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Family monitoring dashboard</span>
            </div>
            <div className="feature-item">
              <FaCheckCircle className="feature-icon" />
              <span>Emergency FAST response</span>
            </div>
          </div>

          <div className="brand-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Lives Protected</span>
            </div>
            <div className="stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                className="toggle-btn"
                onClick={toggleMode}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn google">
              <FaGoogle /> Google
            </button>
            <button className="social-btn facebook">
              <FaFacebook /> Facebook
            </button>
            <button className="social-btn apple">
              <FaApple /> Apple
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Name field - only for signup */}
            {!isLogin && (
              <div className="form-group">
                <label>
                  <FaUser className="field-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            )}

            {/* Email field */}
            <div className="form-group">
              <label>
                <FaEnvelope className="field-icon" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Password field */}
            <div className="form-group">
              <label>
                <FaLock className="field-icon" />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Confirm Password - only for signup */}
            {!isLogin && (
              <div className="form-group">
                <label>
                  <FaLock className="field-icon" />
                  Confirm Password
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                </div>
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            {/* Remember me & Forgot password - only for login */}
            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Terms agreement - only for signup */}
            {!isLogin && (
              <div className="form-group terms-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span>
                    I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                'Please wait...'
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <FaArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Emergency Notice */}
          <div className="emergency-note">
            <FaShieldAlt className="note-icon" />
            <p>
              <strong>Stroke emergency?</strong> Do not wait - call 911 immediately.
              <Link to="/lifesync" className="emergency-link"> Emergency Resources →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;