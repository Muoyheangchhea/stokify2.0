import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaArrowLeft,
  FaPaperPlane,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import logo from '../assets/img/Strokify_Logo.png';
/* ─── Inline styles (red theme, matching Login/Register) ──────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #E63E4E;
    --primary-dark: #B31E2C;
    --secondary: #c0392b;
    --success: #48bb78;
    --warning: #ecc94b;
    --error: #f56565;
    --text-primary: #2d3748;
    --text-secondary: #718096;
    --text-muted: #a0aec0;
    --bg-light: #f5f7fa;
    --bg-white: #ffffff;
    --border-light: #e2e8f0;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius: 12px;
    --transition: 0.22s cubic-bezier(.4,0,.2,1);
  }

  .fp-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #E63E4E 0%, #B31E2C 100%);
  }

  /* ── Left brand panel ── */
  .fp-brand {
    width: 44%;
    min-height: 100vh;
    background: linear-gradient(145deg, #E63E4E 0%, #B31E2C 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    position: relative;
    overflow: hidden;
  }
  .fp-brand::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 10%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 90%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .fp-brand-inner { 
    position: relative; 
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .fp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
  .fp-logo-icon { 
    width: 48px;
    height: 48px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }
  .fp-logo-name {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #fff;
  }

  .fp-brand h1 {
    font-size: clamp(34px, 3.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 16px;
  }
  .fp-brand h1 em { 
    font-style: italic; 
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .fp-brand-sub {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.9;
    max-width: 340px;
    margin-bottom: 32px;
  }

  .fp-features { 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    margin-bottom: 32px; 
  }
  .fp-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.9);
  }
  .fp-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
  }

  .fp-stats {
    display: flex;
    gap: 24px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.2);
    margin-top: 0;
  }
  .fp-stat-item {
    flex: 1;
  }
  .fp-stat-num {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .fp-stat-lbl { 
    font-size: 12px; 
    opacity: 0.9; 
    text-transform: uppercase; 
    letter-spacing: .5px; 
    display: block;
  }

  /* ── Right form panel ── */
  .fp-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    background: #f5f7fa;
  }

  .fp-form-card {
    width: 100%;
    max-width: 440px;
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    animation: slideUp 0.5s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fp-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #718096;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 24px;
    transition: color var(--transition);
  }
  .fp-back-link:hover {
    color: #E63E4E;
  }

  .fp-form-header { margin-bottom: 32px; text-align: center; }
  .fp-form-header h2 {
    font-size: 30px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
  }
  .fp-form-header p { 
    font-size: 14px; 
    color: #718096; 
  }

  /* Alert banner */
  .fp-alert {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--radius);
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 20px;
    border: 1px solid;
    animation: fadeIn .2s ease;
  }
  .fp-alert.error { 
    background: #f8d7da; 
    border-color: #f5c6cb; 
    color: #721c24; 
  }
  .fp-alert.success { 
    background: #d4edda; 
    border-color: #c3e6cb; 
    color: #155724; 
  }
  .fp-alert-icon { margin-top: 1px; flex-shrink: 0; }

  /* Form fields */
  .fp-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .fp-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .3px;
    color: #4a5568;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .fp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .fp-input-icon {
    position: absolute;
    left: 14px;
    color: #a0aec0;
    font-size: 14px;
    pointer-events: none;
    transition: color var(--transition);
  }
  .fp-input-wrap:focus-within .fp-input-icon { color: #E63E4E; }

  .fp-input {
    width: 100%;
    padding: 13px 14px 13px 40px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: var(--radius);
    color: #2d3748;
    font-size: 14px;
    outline: none;
    transition: all var(--transition);
  }
  .fp-input::placeholder { color: #cbd5e0; }
  .fp-input:focus {
    border-color: #E63E4E;
    box-shadow: 0 0 0 3px rgba(230, 62, 78, 0.1);
  }
  .fp-input.is-error { 
    border-color: #f56565; 
    background-color: #fff5f5;
  }

  .fp-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #f56565;
    margin-top: 5px;
  }

  /* Submit button */
  .fp-submit {
    width: 100%;
    padding: 14px;
    background: linear-gradient(145deg, #E63E4E, #B31E2C);
    border: none;
    border-radius: var(--radius);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all var(--transition);
    position: relative;
    overflow: hidden;
  }
  .fp-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  .fp-submit:hover::before { left: 100%; }
  .fp-submit:hover:not(:disabled) { 
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.4);
  }
  .fp-submit:active:not(:disabled) { transform: scale(.98); }
  .fp-submit:disabled { 
    opacity: .6; 
    cursor: not-allowed;
  }

  .fp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
  }

  /* Success state */
  .fp-success {
    text-align: center;
    padding: 20px 0;
  }
  .fp-success-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #E63E4E, #B31E2C);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 24px;
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.3);
  }
  .fp-success h3 {
    font-size: 20px;
    color: #2d3748;
    margin-bottom: 12px;
  }
  .fp-success p {
    color: #718096;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .fp-success strong {
    color: #E63E4E;
  }
  .fp-success-note {
    font-size: 13px;
    color: #a0aec0;
    margin-top: 16px;
  }
  .fp-text-link {
    background: none;
    border: none;
    color: #E63E4E;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    font-size: inherit;
    padding: 0;
  }
  .fp-text-link:hover {
    color: #B31E2C;
  }

  /* Footer */
  .fp-footer {
    margin-top: 32px;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }
  .fp-footer p {
    font-size: 14px;
    color: #718096;
  }
  .fp-footer a {
    color: #E63E4E;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;
  }
  .fp-footer a:hover {
    text-decoration: underline;
  }

  /* Emergency notice */
  .fp-emergency {
    margin-top: 24px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--radius);
    background: #fff5f5;
    border: 1px solid #fed7d7;
    font-size: 13px;
    line-height: 1.5;
    color: #742a2a;
  }
  .fp-emergency strong { 
    color: #B31E2C; 
    font-weight: 600;
  }
  .fp-emergency a { 
    color: #B31E2C; 
    text-decoration: none; 
    font-weight: 500;
    margin-left: 4px;
  }
  .fp-emergency a:hover { 
    text-decoration: underline; 
  }
  .fp-emergency-icon { 
    color: #B31E2C; 
    margin-top: 1px; 
    flex-shrink: 0; 
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Responsive */
  @media (max-width: 820px) {
    .fp-brand { display: none; }
    .fp-form-card { padding: 32px 24px; }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404 || data.message === "User not found") {
          setAlert({
            type: "warning",
            message:
              "No account found with this email. Please check and try again.",
          });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Something went wrong. Please try again.",
          });
        }
        setIsLoading(false);
        return;
      }

      // Success - email sent
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Forgot password error:", error);
      setAlert({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
    if (alert) setAlert(null);
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email.trim()) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="fp-root">
        {/* Brand Panel */}
        <div className="fp-brand">
          <div className="fp-brand-inner">
            <div className="fp-logo">
              <span>
                <img src={logo} alt="Strokify Logo" className="logo-icon" />
              </span>
              <span className="fp-logo-name">Strokify</span>
            </div>

            <h1>
              Reset your
              <br />
              <em>password</em>
            </h1>
            <p className="fp-brand-sub">
              We'll send you instructions to reset your password and get back to
              protecting your health.
            </p>

            <div className="fp-features">
              {[
                "Secure password reset",
                "24/7 account support",
                "Instant email delivery",
                "Back to health monitoring",
              ].map((f) => (
                <div className="fp-feature" key={f}>
                  <span className="fp-feature-dot" />
                  {f}
                </div>
              ))}
            </div>

            <div className="fp-stats">
              <div className="fp-stat-item">
                <span className="fp-stat-num">50K+</span>
                <span className="fp-stat-lbl">LIVES PROTECTED</span>
              </div>
              <div className="fp-stat-item">
                <span className="fp-stat-num">95%</span>
                <span className="fp-stat-lbl">ACCURACY</span>
              </div>
              <div className="fp-stat-item">
                <span className="fp-stat-num">24/7</span>
                <span className="fp-stat-lbl">SUPPORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="fp-form-panel">
          <div className="fp-form-card">
            <Link to="/login" className="fp-back-link">
              <FaArrowLeft /> Back to Login
            </Link>

            <div className="fp-form-header">
              <h2>Reset Password</h2>
              <p>Enter your email to receive reset instructions</p>
            </div>

            {alert && (
              <div className={`fp-alert ${alert.type}`}>
                <span className="fp-alert-icon">
                  {alert.type === "error" ? (
                    <FaExclamationCircle />
                  ) : (
                    <FaInfoCircle />
                  )}
                </span>
                <span>{alert.message}</span>
              </div>
            )}

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="fp-form" noValidate>
                <div className="fp-field">
                  <label>Email Address</label>
                  <div className="fp-input-wrap">
                    <FaEnvelope className="fp-input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={`fp-input ${error && touched ? "is-error" : ""}`}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {error && touched && (
                    <span className="fp-error-text">
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {error}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="fp-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="fp-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Instructions{" "}
                      <FaPaperPlane style={{ fontSize: 13 }} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="fp-success">
                <div className="fp-success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Check Your Email</h3>
                <p>
                  We've sent password reset instructions to{" "}
                  <strong>{email}</strong>
                </p>
                <p className="fp-success-note">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="fp-text-link"
                  >
                    try again
                  </button>
                </p>
              </div>
            )}

            <div className="fp-footer">
              <p>
                Remember your password? <Link to="/login">Sign In</Link>
              </p>
            </div>

            {/* Emergency notice */}
            <div className="fp-emergency">
              <FaShieldAlt className="fp-emergency-icon" />
              <p>
                <strong>Stroke emergency?</strong> Do not wait — call 911
                immediately.
                <Link to="/lifesync">Emergency Resources →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
