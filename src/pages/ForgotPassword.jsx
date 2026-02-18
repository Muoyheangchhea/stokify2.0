import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/login" className="auth-back-link">
            <FaArrowLeft /> Back to Login
          </Link>

          <div className="auth-header">
            <h1>Reset Password</h1>
            <p>Enter your email to receive reset instructions</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>
                  <FaEnvelope className="field-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className={error ? 'error' : ''}
                />
                {error && <span className="error-text">{error}</span>}
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'} <FaPaperPlane />
              </button>
            </form>
          ) : (
            <div className="auth-success">
              <div className="success-icon">✓</div>
              <h3>Check Your Email</h3>
              <p>
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <p className="success-note">
                Didn't receive the email? Check your spam folder or{' '}
                <button onClick={() => setIsSubmitted(false)} className="text-link">
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="auth-footer">
            <p>
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;