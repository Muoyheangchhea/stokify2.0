import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
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
  FaUserFriends,
} from "react-icons/fa";

/* ─── Inline styles (red theme, original fonts) ───────────────────────── */
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
    --bg-light: #f7fafc;
    --bg-white: #ffffff;
    --border-light: #e2e8f0;
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --radius: 12px;
    --transition: 0.22s cubic-bezier(.4,0,.2,1);
  }

  .lp-root {
    min-height: 100vh;
    display: flex;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #E63E4E 0%, #B31E2C 100%);
  }

  /* ── Left brand panel ── */
  .lp-brand {
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
  .lp-brand::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 10%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 90%, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .lp-brand-inner { 
    position: relative; 
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .lp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
  .lp-logo-icon { 
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
  .lp-logo-name {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #fff;
  }

  .lp-brand h1 {
    font-size: clamp(34px, 3.5vw, 48px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 16px;
  }
  .lp-brand h1 em { 
    font-style: italic; 
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .lp-brand-sub {
    font-size: 15px;
    line-height: 1.65;
    opacity: 0.9;
    max-width: 340px;
    margin-bottom: 32px;
  }

  .lp-features { 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    margin-bottom: 32px; 
  }
  .lp-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: rgba(255,255,255,0.9);
  }
  .lp-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
  }

  .lp-stats {
    display: flex;
    gap: 24px;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.2);
    margin-top: 0;
  }
  .lp-stat-item {
    flex: 1;
  }
  .lp-stat-num {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .lp-stat-lbl { 
    font-size: 12px; 
    opacity: 0.9; 
    text-transform: uppercase; 
    letter-spacing: .5px; 
    display: block;
  }

  /* ── Right form panel ── */
  .lp-form-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    background: #f5f7fa;
  }

  .lp-form-card {
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

  .lp-form-header { margin-bottom: 32px; text-align: center; }
  .lp-form-header h2 {
    font-size: 30px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
  }
  .lp-form-header p { 
    font-size: 14px; 
    color: #718096; 
  }
  .lp-toggle-btn {
    background: none; border: none; cursor: pointer;
    color: #E63E4E;
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    transition: opacity var(--transition);
  }
  .lp-toggle-btn:hover { opacity: .75; text-decoration: underline; }

  /* Alert banner */
  .lp-alert {
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
  .lp-alert.warning { 
    background: #fff3cd; 
    border-color: #ffeeba; 
    color: #856404; 
  }
  .lp-alert.error   { 
    background: #f8d7da; 
    border-color: #f5c6cb; 
    color: #721c24; 
  }
  .lp-alert.success { 
    background: #d4edda; 
    border-color: #c3e6cb; 
    color: #155724; 
  }
  .lp-alert-icon { margin-top: 1px; flex-shrink: 0; }

  /* Social buttons */
  .lp-socials { display: flex; gap: 10px; margin-bottom: 24px; }
  .lp-social {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 8px;
    border-radius: var(--radius);
    border: 1px solid #e2e8f0;
    background: white;
    color: #4a5568;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition);
  }
  .lp-social:hover { 
    background: #f7fafc; 
    border-color: #E63E4E;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(230, 62, 78, 0.2);
  }
  .lp-social.google:hover { color: #DB4437; }
  .lp-social.facebook:hover { color: #4267B2; }
  .lp-social.apple:hover { color: #000; }

  /* Divider */
  .lp-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .lp-divider::before, .lp-divider::after {
    content: ''; flex: 1; height: 1px; background: #e2e8f0;
  }
  .lp-divider span { 
    font-size: 12px; 
    color: #a0aec0; 
    white-space: nowrap; 
    text-transform: uppercase;
  }

  /* Form fields */
  .lp-fields { display: flex; flex-direction: column; gap: 20px; margin-bottom: 20px; }

  .lp-field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .3px;
    color: #4a5568;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .lp-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .lp-input-icon {
    position: absolute;
    left: 14px;
    color: #a0aec0;
    font-size: 14px;
    pointer-events: none;
    transition: color var(--transition);
  }
  .lp-input-wrap:focus-within .lp-input-icon { color: #E63E4E; }

  .lp-input {
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
  .lp-input::placeholder { color: #cbd5e0; }
  .lp-input:focus {
    border-color: #E63E4E;
    box-shadow: 0 0 0 3px rgba(230, 62, 78, 0.1);
  }
  .lp-input.is-error { 
    border-color: #f56565; 
    background-color: #fff5f5;
  }
  .lp-input:disabled { 
    opacity: .6; 
    cursor: not-allowed;
    background: #f7fafc;
  }

  .lp-eye-btn {
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
  .lp-eye-btn:hover { color: #4a5568; }

  .lp-error-text {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #f56565;
    margin-top: 5px;
  }

  /* Role selection */
  .lp-role-group {
    margin-bottom: 8px;
  }
  .lp-role-options {
    display: flex;
    gap: 20px;
    margin-top: 8px;
    padding: 8px 0;
  }
  .lp-role-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 13px;
    color: #4a5568;
    user-select: none;
  }
  .lp-role-label input[type="radio"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #E63E4E;
  }
  .lp-role-info {
    margin-top: 8px;
    padding: 8px 12px;
    background: #FEF2F2;
    border: 1px solid #FEE2E2;
    border-radius: 6px;
    font-size: 12px;
    color: #7F1D1D;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Row: remember + forgot */
  .lp-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .lp-check-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 13px;
    color: #4a5568;
    user-select: none;
  }
  .lp-check-label input[type="checkbox"] {
    width: 16px; 
    height: 16px;
    cursor: pointer;
    accent-color: #E63E4E;
  }

  .lp-forgot {
    font-size: 13px;
    color: #E63E4E;
    text-decoration: none;
    transition: opacity var(--transition);
  }
  .lp-forgot:hover { opacity: .75; text-decoration: underline; }

  /* Terms */
  .lp-terms { margin-bottom: 20px; }
  .lp-terms .lp-check-label { 
    font-size: 13px; 
    color: #718096;
  }
  .lp-terms a { 
    color: #E63E4E; 
    text-decoration: none; 
    font-weight: 500;
  }
  .lp-terms a:hover { 
    opacity: .75; 
    text-decoration: underline; 
  }

  /* Submit */
  .lp-submit {
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
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }
  .lp-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  .lp-submit:hover::before { left: 100%; }
  .lp-submit:hover:not(:disabled) { 
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(230, 62, 78, 0.4);
  }
  .lp-submit:active:not(:disabled) { transform: scale(.98); }
  .lp-submit:disabled { 
    opacity: .6; 
    cursor: not-allowed;
  }

  .lp-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
  }

  /* Password strength */
  .lp-strength { margin-top: 8px; }
  .lp-strength-bar {
    height: 4px;
    border-radius: 2px;
    background: #e2e8f0;
    overflow: hidden;
    margin-bottom: 4px;
  }
  .lp-strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width .3s ease, background .3s ease;
  }
  .lp-strength-label { 
    font-size: 11px; 
    font-weight: 500;
  }

  /* Password requirements */
  .lp-requirements {
    font-size: 11px;
    color: #6B7280;
    margin-top: 8px;
    padding: 8px;
    background: #F9FAFB;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }
  .lp-requirements strong {
    display: block;
    margin-bottom: 4px;
  }
  .lp-requirements ul {
    margin-left: 16px;
    list-style: none;
    padding: 0;
  }
  .lp-requirements li {
    margin-bottom: 2px;
  }

  /* Emergency */
  .lp-emergency {
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
  .lp-emergency strong { 
    color: #B31E2C; 
    font-weight: 600;
  }
  .lp-emergency a { 
    color: #B31E2C; 
    text-decoration: none; 
    font-weight: 500;
    margin-left: 4px;
  }
  .lp-emergency a:hover { 
    text-decoration: underline; 
  }
  .lp-emergency-icon { 
    color: #B31E2C; 
    margin-top: 1px; 
    flex-shrink: 0; 
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

  /* Responsive */
  @media (max-width: 820px) {
    .lp-brand { display: none; }
    .lp-form-card { padding: 32px 24px; }
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

/* ─── Alert component ────────────────────────────────────────────────────── */
const Alert = ({ type, message, onAction, actionLabel }) => {
  const icons = {
    warning: <FaInfoCircle />,
    error: <FaExclamationCircle />,
    success: <FaCheckCircle />,
  };
  return (
    <div className={`lp-alert ${type}`}>
      <span className="lp-alert-icon">{icons[type]}</span>
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

/* ─── Main component ─────────────────────────────────────────────────────── */
const Login = () => {
  const navigate = useNavigate();
  const { login, googleAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    rememberMe: false,
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUserInfo, setGoogleUserInfo] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) setFormData((p) => ({ ...p, email: saved, rememberMe: true }));
  }, []);
  // Google Login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);

        // Get user info from Google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        const userInfo = await userInfoResponse.json();

        // For login page, we don't need role selection - use existing role
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
        role: role, // Pass role (null for login)
      });

      if (result.success) {
        setAlert({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
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

  // Facebook login handler (placeholder - implement later)
  const handleFacebookLogin = () => {
    setAlert({
      type: "info",
      message: "Facebook login coming soon!",
    });
  };

  // Apple login handler (placeholder - implement later)
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
    if (!isLogin && !formData.name.trim()) e.name = "Full name is required";
    if (!isLogin && formData.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      e.email = "Enter a valid email address";
    if (!formData.password) e.password = "Password is required";
    else if (!isLogin) {
      if (formData.password.length < 8) e.password = "Minimum 8 characters";
      else if (!/[A-Z]/.test(formData.password))
        e.password = "Must contain at least one uppercase letter";
      else if (!/[0-9]/.test(formData.password))
        e.password = "Must contain at least one number";
    }
    if (!isLogin && formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!isLogin && !formData.agreeTerms)
      e.agreeTerms = "You must agree to continue";
    return e;
  };

  const switchToSignup = () => toggleMode(false);
  const switchToLogin = () => toggleMode(true);

  const toggleMode = (toLogin) => {
    const next = toLogin !== undefined ? toLogin : !isLogin;
    setIsLogin(next);
    setErrors({});
    setAlert(null);
    setTouchedFields({});
    setFormData((p) => ({
      ...p,
      name: "",
      password: "",
      confirmPassword: "",
      role: "user",
      agreeTerms: false,
    }));
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
        if (data.message === "User not found") {
          setAlert({
            type: "warning",
            message: "No account found with this email.",
            onAction: switchToSignup,
            actionLabel: "Create one →",
          });
        } else if (data.message === "Invalid password or email") {
          setErrors({ password: "Incorrect password or email" });
          setAlert({
            type: "error",
            message: "Wrong Password or Email. Please try again.",
          });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Something went wrong.",
          });
        }
        return;
      }
      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Show success message
      setAlert({
        type: "success",
        message: "Login successful.",
      });

      // Redirect to dashboard after short delay
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        type: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  const handleRegister = async () => {
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
      console.log("Registration response:", data);

      if (!res.ok) {
        if (data.message === "User already exists") {
          setAlert({
            type: "warning",
            message: "An account with this email already exists.",
            onAction: switchToLogin,
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

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAlert({
          type: "success",
          message: "Account created successfully.",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        console.error("Unexpected response format:", data);
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
    isLogin ? await handleLogin() : await handleRegister();
    setIsLoading(false);
  };

  const strength = !isLogin ? getStrength(formData.password) : null;

  return (
    <>
      <style>{CSS}</style>
      <div className="lp-root">
        {/* Brand Panel */}
        <div className="lp-brand">
          <div className="lp-brand-inner">
            <div className="lp-logo">
              <span className="lp-logo-icon">❤️</span>
              <span className="lp-logo-name">Strokify</span>
            </div>

            <h1>
              {isLogin ? (
                <>
                  Your health
                  <br />
                  <em>guardian</em>
                  <br />
                  awaits.
                </>
              ) : (
                <>
                  Join the
                  <br />
                  <em>mission</em>
                  <br />
                  to save lives.
                </>
              )}
            </h1>
            <p className="lp-brand-sub">
              {isLogin
                ? "Sign back in to continue monitoring your family's stroke risk in real time."
                : "Create a free account and get instant access to AI-powered stroke detection."}
            </p>

            <div className="lp-features">
              {[
                "AI-powered symptom detection",
                "24/7 stroke specialist access",
                "Family monitoring dashboard",
                "Emergency FAST response",
              ].map((f) => (
                <div className="lp-feature" key={f}>
                  <span className="lp-feature-dot" />
                  {f}
                </div>
              ))}
            </div>

            <div className="lp-stats">
              <div className="lp-stat-item">
                <span className="lp-stat-num">50K+</span>
                <span className="lp-stat-lbl">LIVES PROTECTED</span>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-num">95%</span>
                <span className="lp-stat-lbl">ACCURACY</span>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-num">24/7</span>
                <span className="lp-stat-lbl">SUPPORT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="lp-form-panel">
          <div className="lp-form-card">
            <div className="lp-form-header">
              <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
              <p>
                {isLogin ? "New here? " : "Already have an account? "}
                <button className="lp-toggle-btn" onClick={() => toggleMode()}>
                  {isLogin ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>

            {alert && <Alert {...alert} />}

            {/* Social Login Buttons */}
            <div className="lp-socials">
              <button
                className="lp-social google"
                type="button"
                onClick={() => handleGoogleLogin()}
                disabled={isLoading}
              >
                <FaGoogle /> Google
              </button>
              <button
                className="lp-social facebook"
                type="button"
                onClick={() => {
                  setAlert({
                    type: "info",
                    message: "Facebook login coming soon!",
                  });
                }}
                disabled={isLoading}
              >
                <FaFacebook /> Facebook
              </button>
              <button
                className="lp-social apple"
                type="button"
                onClick={() => {
                  setAlert({
                    type: "info",
                    message: "Apple login coming soon!",
                  });
                }}
                disabled={isLoading}
              >
                <FaApple /> Apple
              </button>
            </div>

            <div className="lp-divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="lp-fields">
                {/* Name - only for signup */}
                {!isLogin && (
                  <div className="lp-field">
                    <label>Full Name</label>
                    <div className="lp-input-wrap">
                      <FaUser className="lp-input-icon" />
                      <input
                        className={`lp-input${errors.name && touchedFields.name ? " is-error" : ""}`}
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
                      <span className="lp-error-text">
                        <FaExclamationCircle style={{ fontSize: 11 }} />
                        {errors.name}
                      </span>
                    )}
                  </div>
                )}

                {/* Role Selection - only for signup */}
                {!isLogin && (
                  <div className="lp-field lp-role-group">
                    <label>I am a:</label>
                    <div className="lp-role-options">
                      <label className="lp-role-label">
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
                      <label className="lp-role-label">
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
                      <div className="lp-role-info">
                        <FaInfoCircle
                          style={{ color: "#DC2626", flexShrink: 0 }}
                        />
                        <span>
                          As a caregiver, you'll be able to monitor multiple
                          patients
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Email */}
                <div className="lp-field">
                  <label>Email Address</label>
                  <div className="lp-input-wrap">
                    <FaEnvelope className="lp-input-icon" />
                    <input
                      className={`lp-input${errors.email && touchedFields.email ? " is-error" : ""}`}
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
                    <span className="lp-error-text">
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="lp-field">
                  <label>Password</label>
                  <div className="lp-input-wrap">
                    <FaLock className="lp-input-icon" />
                    <input
                      className={`lp-input${errors.password && touchedFields.password ? " is-error" : ""}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      placeholder={
                        isLogin ? "Your password" : "Min. 8 characters"
                      }
                      disabled={isLoading}
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      style={{ paddingRight: 42 }}
                    />
                    <button
                      type="button"
                      className="lp-eye-btn"
                      onClick={() => setShowPassword((p) => !p)}
                      tabIndex={-1}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && touchedFields.password && (
                    <span className="lp-error-text">
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {errors.password}
                    </span>
                  )}

                  {/* Strength bar and requirements (signup only) */}
                  {!isLogin && formData.password && strength && (
                    <>
                      <div className="lp-strength">
                        <div className="lp-strength-bar">
                          <div
                            className="lp-strength-fill"
                            style={{
                              width: strength.width,
                              background: strength.color,
                            }}
                          />
                        </div>
                        <span
                          className="lp-strength-label"
                          style={{ color: strength.color }}
                        >
                          {strength.label} password
                        </span>
                      </div>
                      <div className="lp-requirements">
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

                {/* Confirm password - only for signup */}
                {!isLogin && (
                  <div className="lp-field">
                    <label>Confirm Password</label>
                    <div className="lp-input-wrap">
                      <FaLock className="lp-input-icon" />
                      <input
                        className={`lp-input${errors.confirmPassword && touchedFields.confirmPassword ? " is-error" : ""}`}
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
                        className="lp-eye-btn"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword &&
                      touchedFields.confirmPassword && (
                        <span className="lp-error-text">
                          <FaExclamationCircle style={{ fontSize: 11 }} />
                          {errors.confirmPassword}
                        </span>
                      )}
                  </div>
                )}
              </div>

              {/* Remember / Forgot - login only */}
              {isLogin && (
                <div className="lp-options">
                  <label className="lp-check-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="lp-forgot">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Terms - signup only */}
              {!isLogin && (
                <div className="lp-terms">
                  <label className="lp-check-label">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      onBlur={() => handleBlur("agreeTerms")}
                      disabled={isLoading}
                    />
                    <span>
                      I agree to the <Link to="/terms">Terms of Service</Link>{" "}
                      and <Link to="/privacy">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreeTerms && touchedFields.agreeTerms && (
                    <span className="lp-error-text" style={{ marginTop: 6 }}>
                      <FaExclamationCircle style={{ fontSize: 11 }} />
                      {errors.agreeTerms}
                    </span>
                  )}
                </div>
              )}

              <button type="submit" className="lp-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="lp-spinner" />{" "}
                    {isLogin ? "Signing in…" : "Creating account…"}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}{" "}
                    <FaArrowRight style={{ fontSize: 13 }} />
                  </>
                )}
              </button>
            </form>

            {/* Emergency notice */}
            <div className="lp-emergency">
              <FaShieldAlt className="lp-emergency-icon" />
              <p>
                <strong>Stroke emergency?</strong> Do not wait — call 911
                immediately.<Link to="/lifesync">Emergency Resources →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
