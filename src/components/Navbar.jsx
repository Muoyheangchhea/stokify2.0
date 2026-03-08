import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaStethoscope, FaHeartbeat, FaSync, 
  FaEnvelope, FaBars, FaTimes, FaInfoCircle, FaUser,
  FaArrowRight, FaHeart, FaBrain, FaSignOutAlt,
  FaChartLine, FaUsers, FaCalendar, FaCaretDown
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from '../assets/img/Strokify_Logo.png';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState({});
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Helper function to get proxied image URL
  const getProxiedImageUrl = (originalUrl) => {
    if (!originalUrl) return "";

    // Use wsrv.nl (formerly images.weserv.nl) - a free image proxy service
    if (
      originalUrl.includes("googleusercontent.com") ||
      originalUrl.includes("google.com")
    ) {
      // Add cache busting and size optimization
      return `https://wsrv.nl/?url=${encodeURIComponent(originalUrl)}&w=100&h=100&fit=cover&a=attention&we&output=webp`;
    }
    return originalUrl;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset image error state when user changes
  useEffect(() => {
    setImageError({});
  }, [user?.picture]);

  const navLinks = [
    { to: "/", icon: <FaHome />, text: "Home" },
    { to: "/about", icon: <FaInfoCircle />, text: "About" },
    {
      to: "/symptom-detector",
      icon: <FaStethoscope />,
      text: "Symptom Detector",
    },
    { to: "/health-advisor", icon: <FaHeartbeat />, text: "Health Advisor" },
    { to: "/lifesync", icon: <FaSync />, text: "LifeSync" },
    { to: "/contact", icon: <FaEnvelope />, text: "Contact" },
  ];

  const userLinks = [
    { to: "/dashboard", icon: <FaChartLine />, text: "Dashboard" },
    { to: "/profile", icon: <FaUser />, text: "My Profile" },
    { to: "/family-accounts", icon: <FaUsers />, text: "Family" },
    // { to: "/appointments", icon: <FaCalendar />, text: "Appointments" },
  ];

  const quickActions = [
    {
      to: "/symptom-detector",
      icon: <FaStethoscope />,
      text: "Check Symptoms",
      color: "#E63E4E",
    },
    { to: "/lifesync", icon: <FaHeart />, text: "Emergency", color: "#DC2626" },
  ];

  // Get user's first name
  const getFirstName = () => {
    if (!user?.name) return "User";
    return user.name.split(" ")[0];
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Handle image error for specific avatar
  const handleImageError = (avatarType) => {
    console.error(`Image error for ${avatarType}:`, user?.picture);
    setImageError((prev) => ({ ...prev, [avatarType]: true }));
  };

  // Handle link click - close menu
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  // Check if image should be shown
  const shouldShowImage = (avatarType) => {
    return user?.picture && !imageError[avatarType];
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
      >
        <div className="navbar-container">
          {/* Logo - with image instead of emoji */}
          <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
            <img src={logo} alt="Strokify Logo" className="navbar-logo" />
            <span className="brand-text">Strokify</span>
          </Link>

          {/* Desktop Menu - Icons hidden on desktop via CSS */}
          <div className="navbar-menu desktop-menu">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              >
                <span className="nav-icon desktop-hide">{link.icon}</span>
                <span className="nav-text">{link.text}</span>
              </Link>
            ))}

            {/* User Section - Desktop */}
            {isAuthenticated ? (
              <div className="user-menu" ref={dropdownRef}>
                <button
                  className="user-menu-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {shouldShowImage("desktop") ? (
                    <img
                      src={getProxiedImageUrl(user.picture)}
                      alt={user.name}
                      className="user-avatar-image"
                      onError={() => handleImageError("desktop")}
                    />
                  ) : (
                    <div className="user-avatar">{getUserInitials()}</div>
                  )}
                  <span className="user-name">{getFirstName()}</span>
                  <FaCaretDown
                    className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="user-dropdown">
                    {userLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.to}
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <span className="dropdown-icon">{link.icon}</span>
                        <span>{link.text}</span>
                      </Link>
                    ))}
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item logout"
                      onClick={() => {
                        logout();
                        handleLinkClick();
                      }}
                    >
                      <span className="dropdown-icon">
                        <FaSignOutAlt />
                      </span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="nav-link login-link"
                onClick={handleLinkClick}
              >
                <FaUser />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="mobile-right">
            {isAuthenticated && (
              <div className="mobile-user-avatar">
                {shouldShowImage("mobile-small") ? (
                  <img
                    src={getProxiedImageUrl(user.picture)}
                    alt={user.name}
                    className="mobile-user-avatar-image-small"
                    onError={() => handleImageError("mobile-small")}
                  />
                ) : (
                  <div className="mobile-user-avatar-initials">
                    {getUserInitials()}
                  </div>
                )}
              </div>
            )}
            <button
              className={`navbar-toggle ${isOpen ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}
            onClick={handleLinkClick}
          />
          
          {/* Mobile Menu - Original UI with icons */}
          <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <img src={logo} alt="Strokify Logo" className="mobile-logo" />
                <span className="brand-text">Strokify</span>
              </div>
              <button className="mobile-close" onClick={handleLinkClick}>
                <FaTimes />
              </button>
            </div>

            {/* User info in mobile menu */}
            {isAuthenticated && (
              <div className="mobile-user-info">
                {shouldShowImage("mobile-large") ? (
                  <img
                    src={getProxiedImageUrl(user.picture)}
                    alt={user.name}
                    className="mobile-user-avatar-image-large"
                    onError={() => handleImageError("mobile-large")}
                  />
                ) : (
                  <div className="mobile-user-avatar-large">
                    {getUserInitials()}
                  </div>
                )}
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{user?.name}</span>
                  <span className="mobile-user-email">{user?.email}</span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mobile-quick-actions">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.to}
                  className="quick-action-btn"
                  style={{ "--action-color": action.color }}
                  onClick={handleLinkClick}
                >
                  <span className="quick-icon">{action.icon}</span>
                  <span className="quick-text">{action.text}</span>
                  <FaArrowRight className="quick-arrow" />
                </Link>
              ))}
            </div>

            <div className="mobile-menu-divider" />

            {/* Main Navigation - With Icons (original UI) */}
            <div className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`mobile-nav-link ${location.pathname === link.to ? "active" : ""}`}
                  onClick={handleLinkClick}
                >
                  <span className="mobile-link-icon">{link.icon}</span>
                  <span className="mobile-link-text">{link.text}</span>
                  {location.pathname === link.to && (
                    <span className="mobile-link-active" />
                  )}
                </Link>
              ))}
            </div>

            {/* User Links - Mobile */}
            {isAuthenticated && (
              <>
                <div className="mobile-menu-divider" />
                <div className="mobile-user-links">
                  <p className="mobile-section-title">Your Account</p>
                  {userLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="mobile-nav-link"
                      onClick={handleLinkClick}
                    >
                      <span className="mobile-link-icon">{link.icon}</span>
                      <span className="mobile-link-text">{link.text}</span>
                    </Link>
                  ))}
                  <button
                    className="mobile-nav-link logout"
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                  >
                    <span className="mobile-link-icon">
                      <FaSignOutAlt />
                    </span>
                    <span className="mobile-link-text">Logout</span>
                  </button>
                </div>
              </>
            )}

            {/* Login/Register for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-register-btn"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Emergency Notice */}
            <div className="mobile-emergency">
              <FaBrain className="emergency-icon" />
              <div className="emergency-text">
                <strong>Stroke Emergency?</strong>
                <span>Call 911 immediately</span>
              </div>
              <a
                href="tel:911"
                className="emergency-call"
                onClick={handleLinkClick}
              >
                911
              </a>
            </div>

            {/* Footer */}
            <div className="mobile-menu-footer">
              <p>© 2025 Strokify. All rights reserved.</p>
              <div className="mobile-footer-links">
                <Link to="/about" onClick={handleLinkClick}>
                  About
                </Link>
                <Link to="/contact" onClick={handleLinkClick}>
                  Contact
                </Link>
                <Link to="/privacy" onClick={handleLinkClick}>
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer" />
    </>
  );
};

export default Navbar;
