import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
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
} from "react-icons/fa";
import "../styles/login.css";

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

const Login = () => {
  const navigate = useNavigate();
  const { login, googleAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    setStylesLoaded(true);
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) setFormData((p) => ({ ...p, email: saved, rememberMe: true }));
  }, []);

  // Google Login handler - Login attempt (role = null)
  const handleGoogleLogin = useGoogleLogin({
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

        // Login attempt with role = null
        await completeGoogleAuth(userInfo, null);
      } catch (error) {
        console.error("Google login error:", error);
        setAlert({
          type: "error",
          message: "Google login failed. Please try again.",
        });
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      setAlert({
        type: "error",
        message: "Google login cancelled or failed. Please try again.",
      });
    },
  });

  const completeGoogleAuth = async (userInfo, role) => {
    try {
      const result = await googleAuth({
        email: userInfo.email,
        name: userInfo.name,
        googleId: userInfo.sub,
        picture: userInfo.picture,
        role: role, // null for login attempt
      });

      if (result.success) {
        setAlert({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        // Handle "User not found" error for login attempt
        if (result.error?.toLowerCase().includes("not found")) {
          setAlert({
            type: "warning",
            message:
              "No account found with this Google email. Would you like to create one?",
            onAction: () => {
              // Navigate to register with Google user info pre-filled
              navigate("/register", {
                state: {
                  email: userInfo.email,
                  name: userInfo.name,
                  googleId: userInfo.sub,
                  picture: userInfo.picture,
                  fromGoogle: true,
                },
              });
            },
            actionLabel: "Create account →",
          });
        } else {
          setAlert({
            type: "error",
            message: result.error || "Authentication failed. Please try again.",
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

  const handleFacebookLogin = () => {
    setAlert({
      type: "info",
      message: "Facebook login coming soon!",
    });
  };

  const handleAppleLogin = () => {
    setAlert({
      type: "info",
      message: "Apple login coming soon!",
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
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Enter a valid email address";
    if (!formData.password) e.password = "Password is required";
    return e;
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        // Handle "User not found" for email login
        if (data.message === "User not found") {
          setAlert({
            type: "warning",
            message:
              "No account found with this email. Would you like to create one?",
            onAction: () =>
              navigate("/register", {
                state: { email: formData.email },
              }),
            actionLabel: "Create account →",
          });
        } else if (
          data.message === "Invalid password" ||
          data.message === "Invalid credentials"
        ) {
          setErrors({ password: "Incorrect password" });
          setAlert({
            type: "error",
            message: "Wrong password. Please try again.",
          });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Something went wrong.",
          });
        }
        return;
      }

      // Login successful
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setAlert({
        type: "success",
        message: "Login successful. Redirecting...",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
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
    await handleLogin();
    setIsLoading(false);
  };

  return (
    <div
      className="login-page"
      style={{ opacity: stylesLoaded ? 1 : 0, transition: "opacity 0.2s" }}
    >
      {/* Brand Panel */}
      <div className="login-brand">
        <div className="brand-inner">
          <div className="brand-logo">
            <span className="logo-icon">❤️</span>
            <span className="logo-text">Strokify</span>
          </div>

          <h1 className="brand-title">
            Your health
            <br />
            <em>guardian</em>
            <br />
            awaits.
          </h1>
          <p className="brand-subtitle">
            Sign back in to continue monitoring your family's stroke risk in
            real time.
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
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">LIVES PROTECTED</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">ACCURACY</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">SUPPORT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="login-form-panel">
        <div className="login-form-card">
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>
              New here?{" "}
              <Link to="/register" className="login-toggle-btn">
                Create an account
              </Link>
            </p>
          </div>

          {alert && <Alert {...alert} />}

          {/* Social Login Buttons */}
          <div className="social-buttons">
            <button
              className="social-btn google"
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={isLoading}
            >
              <FaGoogle /> Google
            </button>
            <button
              className="social-btn facebook"
              type="button"
              onClick={handleFacebookLogin}
              disabled={isLoading}
            >
              <FaFacebook /> Facebook
            </button>
            <button
              className="social-btn apple"
              type="button"
              onClick={handleAppleLogin}
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
                    placeholder="Your password"
                    disabled={isLoading}
                    autoComplete="current-password"
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
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In <FaArrowRight style={{ fontSize: 13 }} />
                </>
              )}
            </button>
          </form>

          {/* Emergency notice */}
          <div className="login-emergency-notice">
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

export default Login;
