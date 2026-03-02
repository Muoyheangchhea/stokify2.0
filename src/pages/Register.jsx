import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import logo from '../assets/img/Strokify_Logo.png';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaUserMd,
} from "react-icons/fa";
import "../styles/register.css";

const Alert = ({ type, message, onAction, actionLabel }) => {
  const icons = {
    warning: <FaInfoCircle />,
    error: <FaExclamationCircle />,
    success: <FaCheckCircle />,
  };
  return (
    <div className={`alert ${type}`}>
      <span className="alert-icon">{icons[type]}</span>
      <span>
        {message}
        {onAction && (
          <button
            onClick={onAction}
            style={{
              marginLeft: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              textDecoration: "underline",
              font: "inherit",
              padding: 0,
              fontWeight: 600,
            }}
          >
            {actionLabel}
          </button>
        )}
      </span>
    </div>
  );
};

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

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, googleAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: location.state?.name || "",
    email: location.state?.email || "",
    password: "",
    confirmPassword: "",
    role: "user",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUserInfo, setGoogleUserInfo] = useState(
    location.state?.googleId
      ? {
          email: location.state.email,
          name: location.state.name,
          sub: location.state.googleId,
          picture: location.state.picture,
        }
      : null,
  );
  const [selectedRole, setSelectedRole] = useState("user");

  useEffect(() => {
    // If we have Google info from login page, show role modal for signup
    if (googleUserInfo && !location.state?.fromGoogle) {
      setShowRoleModal(true);
    }
    // If we came from login with Google, show modal immediately
    if (location.state?.fromGoogle && googleUserInfo) {
      setShowRoleModal(true);
    }
  }, [googleUserInfo, location.state]);

  // Google Signup handler - Signup attempt with role
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const userInfo = await userInfoResponse.json();

        // Show role selection modal for Google sign-up
        setGoogleUserInfo(userInfo);
        setShowRoleModal(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Google signup error:", error);
        setAlert({
          type: "error",
          message: "Google sign up failed. Please try again.",
        });
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google signup failed:", error);
      setAlert({
        type: "error",
        message: "Google sign up cancelled or failed. Please try again.",
      });
    },
  });

  const completeGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setShowRoleModal(false);
      const checkResponse = await fetch(
        `http://localhost:5000/api/auth/check-user?email=${encodeURIComponent(googleUserInfo.email)}`,
      );

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        // User already exists - show warning
        setAlert({
          type: "warning",
          message:
            "An account with this email already exists. Would you like to sign in?",
          onAction: () => navigate("/login"),
          actionLabel: "Sign in →",
        });
        setIsLoading(false);
        return;
      }

      const result = await googleAuth({
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        googleId: googleUserInfo.sub,
        picture: googleUserInfo.picture,
        role: selectedRole, // Role is provided for signup
      });

      if (result.success) {
        setAlert({
          type: "success",
          message: "Account created successfully! Redirecting...",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        // Handle "User already exists" error for signup attempt
        if (result.error?.toLowerCase().includes("already exists")) {
          setAlert({
            type: "warning",
            message:
              "An account with this email already exists. Would you like to sign in?",
            onAction: () => navigate("/login"),
            actionLabel: "Sign in →",
          });
        } else {
          setAlert({
            type: "error",
            message: result.error || "Google sign up failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Google auth completion error:", error);
      setAlert({
        type: "error",
        message: "Authentication failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignup = () => {
    setAlert({
      type: "info",
      message: "Facebook sign up coming soon!",
    });
  };

  const handleAppleSignup = () => {
    setAlert({
      type: "info",
      message: "Apple sign up coming soon!",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    setTouchedFields((p) => ({ ...p, [name]: true }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    if (alert) setAlert(null);
  };

  const handleBlur = (field) => {
    setTouchedFields((p) => ({ ...p, [field]: true }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (formData.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Enter a valid email address";
    if (!formData.password) e.password = "Password is required";
    else {
      if (formData.password.length < 8) e.password = "Minimum 8 characters";
      else if (!/[A-Z]/.test(formData.password))
        e.password = "Must contain at least one uppercase letter";
      else if (!/[0-9]/.test(formData.password))
        e.password = "Must contain at least one number";
    }
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) e.agreeTerms = "You must agree to continue";
    return e;
  };

  const handleEmailSignup = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle "User already exists" for email signup
        if (data.message === "User already exists") {
          setAlert({
            type: "warning",
            message:
              "An account with this email already exists. Would you like to sign in?",
            onAction: () => navigate("/login"),
            actionLabel: "Sign in →",
          });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Registration failed. Please try again.",
          });
        }
        setIsLoading(false);
        return;
      }

      // Signup successful
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAlert({
          type: "success",
          message: "Account created successfully!",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setAlert({
          type: "error",
          message: "Server returned unexpected format. Please try again.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstErrorField = Object.keys(errs)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setIsLoading(true);
    setAlert(null);
    await handleEmailSignup();
    setIsLoading(false);
  };

  const strength = getStrength(formData.password);

  return (
    <div className="register-page">
      {/* Brand Panel */}
      <div className="register-brand">
        <div className="brand-inner">
          <div className="brand-logo">
            <span>
              <img src={logo} alt="Strokify Logo" className="logo-icon" />
            </span>
            <span className="logo-text">Strokify</span>
          </div>

          <h1 className="brand-title">
            Join the
            <br />
            <em>mission</em>
            <br />
            to save lives.
          </h1>
          <p className="brand-subtitle">
            Create a free account and get instant access to AI-powered stroke
            detection.
          </p>

          <div className="brand-features">
            {[
              "AI-powered symptom detection",
              "24/7 stroke specialist access",
              "Family monitoring dashboard",
              "Emergency FAST response",
            ].map((f, index) => (
              <div className="feature-item" key={index}>
                <span className="feature-dot" />
                {f}
              </div>
            ))}
          </div>

          <div className="brand-stats">
            <div className="register-stat-item">
              <span className="register-stat-number">50K+</span>
              <span className="register-stat-label">LIVES PROTECTED</span>
            </div>
            <div className="register-stat-item">
              <span className="register-stat-number">95%</span>
              <span className="register-stat-label">ACCURACY</span>
            </div>
            <div className="register-stat-item">
              <span className="register-stat-number">24/7</span>
              <span className="register-stat-label">SUPPORT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="register-form-panel">
        <div className="register-form-card">
          <div className="form-header">
            <h2>Create account</h2>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="register-toggle-btn">
                Sign in
              </Link>
            </p>
          </div>

          {alert && <Alert {...alert} />}

          {/* Social Signup Buttons */}
          <div className="social-buttons">
            <button
              className="social-btn google"
              type="button"
              onClick={() => handleGoogleSignup()}
              disabled={isLoading}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="social-btn facebook"
              type="button"
              onClick={handleFacebookSignup}
              disabled={isLoading}
            >
              <FaFacebook /> Facebook
            </button>
            <button
              className="social-btn apple"
              type="button"
              onClick={handleAppleSignup}
              disabled={isLoading}
            >
              <FaApple /> Apple
            </button>
          </div>

          <div className="divider">
            <span>or continue with email</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-fields">
              {/* Name */}
              <div className="field-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    className={`input-field ${
                      errors.name && touchedFields.name ? "is-error" : ""
                    }`}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="Jane Smith"
                    disabled={isLoading}
                    autoComplete="name"
                  />
                </div>
                {errors.name && touchedFields.name && (
                  <span className="error-text">
                    <FaExclamationCircle style={{ fontSize: 11 }} />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Role Selection */}
              <div className="field-group role-group">
                <label>
                  I am a: <span className="required-star">*</span>
                </label>
                <div className="role-options">
                  <label className="role-label">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span style={{ marginLeft: "8px" }}>
                      Patient / Family Member
                    </span>
                  </label>
                  <label className="role-label">
                    <input
                      type="radio"
                      name="role"
                      value="caregiver"
                      checked={formData.role === "caregiver"}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span style={{ marginLeft: "8px" }}>Caregiver</span>
                  </label>
                </div>
                {formData.role === "caregiver" && (
                  <div className="role-info">
                    <FaInfoCircle style={{ color: "#DC2626", flexShrink: 0 }} />
                    <span>
                      As a caregiver, you'll be able to monitor multiple
                      patients
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="field-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    className={`input-field ${
                      errors.email && touchedFields.email ? "is-error" : ""
                    }`}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
                {errors.email && touchedFields.email && (
                  <span className="error-text">
                    <FaExclamationCircle style={{ fontSize: 11 }} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="field-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    className={`input-field ${
                      errors.password && touchedFields.password
                        ? "is-error"
                        : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="Min. 8 characters"
                    disabled={isLoading}
                    autoComplete="new-password"
                    style={{ paddingRight: 42 }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <span className="error-text">
                    <FaExclamationCircle style={{ fontSize: 11 }} />
                    {errors.password}
                  </span>
                )}

                {/* Strength bar and requirements */}
                {formData.password && strength && (
                  <>
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div
                          className="strength-fill"
                          style={{
                            width: strength.width,
                            background: strength.color,
                          }}
                        />
                      </div>
                      <span
                        className="strength-label"
                        style={{ color: strength.color }}
                      >
                        {strength.label} password
                      </span>
                    </div>
                    <div className="password-requirements">
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
                          {formData.password.length >= 8 ? "✓" : "○"} At least 8
                          characters
                        </li>
                        <li
                          style={{
                            color: /[A-Z]/.test(formData.password)
                              ? "#10B981"
                              : "#6B7280",
                          }}
                        >
                          {/[A-Z]/.test(formData.password) ? "✓" : "○"} At least
                          one uppercase letter
                        </li>
                        <li
                          style={{
                            color: /[0-9]/.test(formData.password)
                              ? "#10B981"
                              : "#6B7280",
                          }}
                        >
                          {/[0-9]/.test(formData.password) ? "✓" : "○"} At least
                          one number
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* Confirm password */}
              <div className="field-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    className={`input-field ${
                      errors.confirmPassword && touchedFields.confirmPassword
                        ? "is-error"
                        : ""
                    }`}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Re-enter password"
                    disabled={isLoading}
                    autoComplete="new-password"
                    style={{ paddingRight: 42 }}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && touchedFields.confirmPassword && (
                  <span className="error-text">
                    <FaExclamationCircle style={{ fontSize: 11 }} />
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="terms-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  onBlur={() => handleBlur("agreeTerms")}
                  disabled={isLoading}
                />
                <span>
                  I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && touchedFields.agreeTerms && (
                <span className="error-text" style={{ marginTop: 6 }}>
                  <FaExclamationCircle style={{ fontSize: 11 }} />
                  {errors.agreeTerms}
                </span>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account <FaArrowRight style={{ fontSize: 13 }} />
                </>
              )}
            </button>
          </form>

          {/* Role Selection Modal for Google Sign-up */}
          {showRoleModal && googleUserInfo && (
            <div className="role-modal-overlay">
              <div className="role-modal">
                <h3>Choose Your Role</h3>
                <p>How will you be using Strokify?</p>

                <div className="role-options">
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={selectedRole === "user"}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    <div className="role-content">
                      <h4>Patient / Family Member</h4>
                      <p>Monitor your health and track symptoms</p>
                    </div>
                  </label>

                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="caregiver"
                      checked={selectedRole === "caregiver"}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    />
                    <div className="role-content">
                      <h4>Caregiver / Medical Professional</h4>
                      <p>Monitor multiple patients and provide care</p>
                    </div>
                  </label>
                </div>

                <div className="role-modal-actions">
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setIsLoading(false);
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button onClick={completeGoogleAuth} className="confirm-btn">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Emergency notice */}
          <div className="register-emergency-notice">
            <FaShieldAlt className="emergency-icon" />
            <p>
              <strong>Stroke emergency?</strong> Do not wait — call 911
              immediately.
              <Link to="/lifesync">Emergency Resources →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
