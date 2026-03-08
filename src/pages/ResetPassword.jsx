import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/img/Strokify_Logo.png";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheck,
  FaShieldAlt,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

/* ─── Inline styles (red theme, matching Login/Register) ──────────────── */
const CSS = `
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap");

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

  .rp-root {
    min-height: 100vh;
    display: flex;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #E63E4E 0%, #B31E2C 100%);
  }

  /* ── Left brand panel ── */
  .rp-brand {
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
  .rp-brand::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 10%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 90%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .rp-brand-inner { 
    position: relative; 
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .rp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
  .rp-logo-icon { 
    width: 55px;
    height: 55px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }
  .rp-logo-name {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #fff;
  }

  .rp-brand h1 {
    font-size: clamp(34px, 3.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 16px;
  }
  .rp-brand h1 em { 
    font-style: italic; 
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .rp-brand-sub {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.9;
    max-width: 340px;
    margin-bottom: 32px;
  }

  .rp-features { 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    margin-bottom: 32px; 
  }
  .rp-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.9);
  }
  .rp-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
  }

  .rp-stats {
    display: flex;
    gap: 24px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.2);
    margin-top: 0;
  }
  .rp-stat-item {
    flex: 1;
  }
  .rp-stat-num {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .rp-stat-lbl { 
    font-size: 12px; 
    opacity: 0.9; 
    text-transform: uppercase; 
    letter-spacing: .5px; 
    display: block;
  }

  /* ── Right form panel ── */
  .rp-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    background: #f5f7fa;
  }

  .rp-form-card {
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

  .rp-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #718096;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 24px;
    transition: color var(--transition);
  }
  .rp-back-link:hover {
    color: #E63E4E;
  }

  .rp-form-header { margin-bottom: 32px; text-align: center; }
  .rp-form-header h2 {
    font-size: 30px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
  }
  .rp-form-header p { 
    font-size: 14px; 
    color: #718096; 
  }

  /* Alert banner */
  .rp-alert {
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
  .rp-alert.error { 
    background: #f8d7da; 
    border-color: #f5c6cb; 
    color: #721c24; 
  }
  .rp-alert.success { 
    background: #d4edda; 
    border-color: #c3e6cb; 
    color: #155724; 
  }
  .rp-alert.warning { 
    background: #fff3cd; 
    border-color: #ffeeba; 
    color: #856404; 
  }
  .rp-alert-icon { margin-top: 1px; flex-shrink: 0; }

  /* Form fields */
  .rp-fields { display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; }

  .rp-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .3px;
    color: #4a5568;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .rp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .rp-input-icon {
    position: absolute;
    left: 14px;
    color: #a0aec0;
    font-size: 14px;
    pointer-events: none;
    transition: color var(--transition);
  }
  .rp-input-wrap:focus-within .rp-input-icon { color: #E63E4E; }

  .rp-input {
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
  .rp-input::placeholder { color: #cbd5e0; }
  .rp-input:focus {
    border-color: #E63E4E;
    box-shadow: 0 0 0 3px rgba(230, 62, 78, 0.1);
  }
  .rp-input.is-error { 
    border-color: #f56565; 
    background-color: #fff5f5;
  }
  .rp-input:disabled { 
    opacity: .6; 
    cursor: not-allowed;
    background: #f7fafc;
  }

  .rp-eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a0aec0;
    font-size: 15px;
    display: flex;
    align-items: center;
    padding: 4px;
    transition: color var(--transition);
  }
  .rp-eye-btn:hover { color: #4a5568; }

  .rp-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #f56565;
    margin-top: 5px;
  }

  /* Password strength */
  .rp-strength { margin-top: 8px; }
  .rp-strength-bar {
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .rp-strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width .3s ease, background .3s ease;
  }
  .rp-strength-label { 
    font-size: 11px; 
    font-weight: 500;
  }

  /* Password requirements */
  .rp-requirements {
    font-size: 11px;
    color: #6B7280;
    margin-top: 8px;
    padding: 8px;
    background: #F9FAFB;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }
  .rp-requirements strong {
    display: block;
    margin-bottom: 4px;
  }
  .rp-requirements ul {
    margin-left: 16px;
    list-style: none;
    padding: 0;
  }
  .rp-requirements li {
    margin-bottom: 2px;
  }

  /* Submit button */
  .rp-submit {
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
    margin-top: 16px;
    position: relative;
    overflow: hidden;
  }
  .rp-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  .rp-submit:hover::before { left: 100%; }
  .rp-submit:hover:not(:disabled) { 
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.4);
  }
  .rp-submit:active:not(:disabled) { transform: scale(.98); }
  .rp-submit:disabled { 
    opacity: .6; 
    cursor: not-allowed;
  }

  .rp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
  }

  /* Success state */
  .rp-success {
    text-align: center;
    padding: 20px 0;
  }
  .rp-success-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #E63E4E, #B31E2C);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 24px;
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.3);
  }
  .rp-success h2 {
    font-size: 24px;
    color: #2d3748;
    margin-bottom: 12px;
  }
  .rp-success p {
    color: #718096;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  .rp-success-note {
    font-size: 13px;
    color: #a0aec0;
    margin-top: 16px;
  }

  /* Footer */
  .rp-footer {
    margin-top: 32px;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }
  .rp-footer p {
    font-size: 14px;
    color: #718096;
  }
  .rp-footer a {
    color: #E63E4E;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;
  }
  .rp-footer a:hover {
    text-decoration: underline;
  }

  /* Emergency notice */
  .rp-emergency {
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
  .rp-emergency strong { 
    color: #B31E2C; 
    font-weight: 600;
  }
  .rp-emergency a { 
    color: #B31E2C; 
    text-decoration: none; 
    font-weight: 500;
    margin-left: 4px;
  }
  .rp-emergency a:hover { 
    text-decoration: underline; 
  }
  .rp-emergency-icon { 
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
    .rp-brand { display: none; }
    .rp-form-card { padding: 32px 24px; }
  }
`;

/* ─── Password strength helper ───────────────────────────────────────────── */
const getStrength = (pw) => {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Weak", color: "#f56565", width: "25%" };
  if (score <= 3) return { label: "Fair", color: "#ecc94b", width: "55%" };
  if (score === 4) return { label: "Good", color: "#48bb78", width: "78%" };
  return { label: "Strong", color: "#48bb78", width: "100%" };
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isVerifying, setIsVerifying] = useState(true);

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/verify-reset-token/${token}`,
        );
        const data = await response.json();

        if (data.valid) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          setAlert({
            type: "error",
            message:
              "This password reset link is invalid or has expired. Please request a new one.",
          });
        }
      } catch (error) {
        console.error("Token verification error:", error);
        setIsTokenValid(false);
        setAlert({
          type: "error",
          message:
            "Unable to verify reset link. Please try again or request a new one.",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsTokenValid(false);
      setIsVerifying(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (alert) setAlert(null);
  };

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Must contain at least one number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setAlert({
          type: "error",
          message:
            data.message || "Failed to reset password. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      // Success
      setIsSubmitted(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Reset password error:", error);
      setAlert({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      setIsLoading(false);
    }
  };

  const strength = getStrength(formData.password);

  // Show loading while verifying token
  if (isVerifying) {
    return (
      <>
        <style>{CSS}</style>
        <div className="rp-root">
          <div className="rp-brand">
            <div className="rp-brand-inner">
              <div className="rp-logo">
                <span>
                  <img src={logo} alt="Strokify Logo" className="logo-icon" />
                </span>
                <span className="rp-logo-name">Strokify</span>
              </div>
            </div>
          </div>
          <div className="rp-form-panel">
            <div className="rp-form-card" style={{ textAlign: "center" }}>
              <div className="rp-spinner" style={{ margin: "40px auto" }}></div>
              <p>Verifying your reset link...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error if token is invalid
  if (!isTokenValid) {
    return (
      <>
        <style>{CSS}</style>
        <div className="rp-root">
          <div className="rp-brand">
            <div className="rp-brand-inner">
              <div className="rp-logo">
                <span>
                  <img src={logo} alt="Strokify Logo" className="logo-icon" />
                </span>
                <span className="rp-logo-name">Strokify</span>
              </div>

              <h1>
                Password
                <br />
                <em>Reset</em>
              </h1>
              <p className="rp-brand-sub">
                Secure your account with a new password.
              </p>

              <div className="rp-stats">
                <div className="rp-stat-item">
                  <span className="rp-stat-num">50K+</span>
                  <span className="rp-stat-lbl">LIVES PROTECTED</span>
                </div>
                <div className="rp-stat-item">
                  <span className="rp-stat-num">95%</span>
                  <span className="rp-stat-lbl">ACCURACY</span>
                </div>
                <div className="rp-stat-item">
                  <span className="rp-stat-num">24/7</span>
                  <span className="rp-stat-lbl">SUPPORT</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rp-form-panel">
            <div className="rp-form-card">
              <div className="rp-form-header">
                <h2>Invalid Reset Link</h2>
              </div>

              {alert && (
                <div className={`rp-alert ${alert.type}`}>
                  <span className="rp-alert-icon">
                    <FaExclamationCircle />
                  </span>
                  <span>{alert.message}</span>
                </div>
              )}

              <Link
                to="/forgot-password"
                className="rp-submit"
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                Request New Link
              </Link>

              <div className="rp-footer">
                <p>
                  Remember your password? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSubmitted) {
    return (
      <>
        <style>{CSS}</style>
        <div className="rp-root">
          <div className="rp-brand">
            <div className="rp-brand-inner">
              <div className="rp-logo">
                <span>
                  <img src={logo} alt="Strokify Logo" className="logo-icon" />
                </span>
                <span className="rp-logo-name">Strokify</span>
              </div>

              <h1>
                Password
                <br />
                <em>Reset</em>
              </h1>
              <p className="rp-brand-sub">
                Your password has been successfully updated.
              </p>
            </div>
          </div>
          <div className="rp-form-panel">
            <div className="rp-form-card">
              <div className="rp-success">
                <div className="rp-success-icon">
                  <FaCheck />
                </div>
                <h2>Password Reset Successfully!</h2>
                <p>Your password has been updated.</p>
                <p className="rp-success-note">Redirecting to login...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="rp-root">
        {/* Brand Panel */}
        <div className="rp-brand">
          <div className="rp-brand-inner">
            <div className="rp-logo">
              <span>
                <img src={logo} alt="Strokify Logo" className="logo-icon" />
              </span>
              <span className="rp-logo-name">Strokify</span>
            </div>

            <h1>
              Set New
              <br />
              <em>Password</em>
            </h1>
            <p className="rp-brand-sub">
              Create a strong password to secure your account.
            </p>

            <div className="rp-features">
              {[
                "Secure encryption",
                "Strong password required",
                "Instant update",
                "Back to monitoring",
              ].map((f) => (
                <div className="rp-feature" key={f}>
                  <span className="rp-feature-dot" />
                  {f}
                </div>
              ))}
            </div>

            <div className="rp-stats">
              <div className="rp-stat-item">
                <span className="rp-stat-num">50K+</span>
                <span className="rp-stat-lbl">LIVES PROTECTED</span>
              </div>
              <div className="rp-stat-item">
                <span className="rp-stat-num">95%</span>
                <span className="rp-stat-lbl">ACCURACY</span>
              </div>
              <div className="rp-stat-item">
                <span className="rp-stat-num">24/7</span>
                <span className="rp-stat-lbl">SUPPORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="rp-form-panel">
          <div className="rp-form-card">
            <Link to="/login" className="rp-back-link">
              <FaArrowLeft /> Back to Login
            </Link>

            <div className="rp-form-header">
              <h2>Set New Password</h2>
              <p>Enter your new password below</p>
            </div>

            {alert && (
              <div className={`rp-alert ${alert.type}`}>
                <span className="rp-alert-icon">
                  <FaExclamationCircle />
                </span>
                <span>{alert.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="rp-fields">
                {/* Password */}
                <div className="rp-field">
                  <label>New Password</label>
                  <div className="rp-input-wrap">
                    <FaLock className="rp-input-icon" />
                    <input
                      className={`rp-input${errors.password && touchedFields.password ? " is-error" : ""}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="Enter new password"
                      disabled={isLoading}
                      autoComplete="new-password"
                      style={{ paddingRight: 42 }}
                    />
                    <button
                      type="button"
                      className="rp-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && touchedFields.password && (
                    <span className="rp-error-text">
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {errors.password}
                    </span>
                  )}

                  {/* Strength bar and requirements */}
                  {formData.password && strength && (
                    <>
                      <div className="rp-strength">
                        <div className="rp-strength-bar">
                          <div
                            className="rp-strength-fill"
                            style={{
                              width: strength.width,
                              background: strength.color,
                            }}
                          />
                        </div>
                        <span
                          className="rp-strength-label"
                          style={{ color: strength.color }}
                        >
                          {strength.label} password
                        </span>
                      </div>
                      <div className="rp-requirements">
                        <strong>Password requirements:</strong>
                        <ul>
                          <li
                            style={{
                              color:
                                formData.password.length >= 8
                                  ? "#10B981"
                                  : "#6B7280",
                            }}
                          >
                            {formData.password.length >= 8 ? "✓" : "○"} At least
                            8 characters
                          </li>
                          <li
                            style={{
                              color: /[A-Z]/.test(formData.password)
                                ? "#10B981"
                                : "#6B7280",
                            }}
                          >
                            {/[A-Z]/.test(formData.password) ? "✓" : "○"} At
                            least one uppercase letter
                          </li>
                          <li
                            style={{
                              color: /[0-9]/.test(formData.password)
                                ? "#10B981"
                                : "#6B7280",
                            }}
                          >
                            {/[0-9]/.test(formData.password) ? "✓" : "○"} At
                            least one number
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="rp-field">
                  <label>Confirm New Password</label>
                  <div className="rp-input-wrap">
                    <FaLock className="rp-input-icon" />
                    <input
                      className={`rp-input${errors.confirmPassword && touchedFields.confirmPassword ? " is-error" : ""}`}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Confirm new password"
                      disabled={isLoading}
                      autoComplete="new-password"
                      style={{ paddingRight: 42 }}
                    />
                    <button
                      type="button"
                      className="rp-eye-btn"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && touchedFields.confirmPassword && (
                    <span className="rp-error-text">
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="rp-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="rp-spinner" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password <FaCheck style={{ fontSize: 13 }} />
                  </>
                )}
              </button>
            </form>

            {/* Emergency notice */}
            <div className="rp-emergency">
              <FaShieldAlt className="rp-emergency-icon" />
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

export default ResetPassword;
