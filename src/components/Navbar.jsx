import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaStethoscope, FaHeartbeat, FaSync, 
  FaEnvelope, FaBars, FaTimes, FaInfoCircle, FaUser,
  FaArrowRight, FaHeart, FaBrain, FaSignOutAlt,
  FaChartLine, FaUsers, FaCalendar
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', icon: <FaHome />, text: 'Home' },
    { to: '/about', icon: <FaInfoCircle />, text: 'About' },
    { to: '/symptom-detector', icon: <FaStethoscope />, text: 'Symptom Detector' },
    { to: '/health-advisor', icon: <FaHeartbeat />, text: 'Health Advisor' },
    { to: '/lifesync', icon: <FaSync />, text: 'LifeSync' },
    { to: '/contact', icon: <FaEnvelope />, text: 'Contact' },
  ];

  const userLinks = [
    { to: '/dashboard', icon: <FaChartLine />, text: 'Dashboard' },
    { to: '/profile', icon: <FaUser />, text: 'My Profile' },
    { to: '/family', icon: <FaUsers />, text: 'Family' },
    { to: '/appointments', icon: <FaCalendar />, text: 'Appointments' },
  ];

  const quickActions = [
    { to: '/symptom-detector', icon: <FaStethoscope />, text: 'Check Symptoms', color: '#E63E4E' },
    { to: '/lifesync', icon: <FaHeart />, text: 'Emergency', color: '#DC2626' },
  ];

  // Get user's first name
  const getFirstName = () => {
    if (!user?.name) return 'User';
    return user.name.split(' ')[0];
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Handle link click - close menu
  const handleLinkClick = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
            <span className="brand-icon animate-float">🎨</span>
            <span className="brand-text">Strokify</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
            
            {/* User Section - Desktop */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button 
                  className="user-menu-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="user-avatar">
                    {getUserInitials()}
                  </div>
                  <span className="user-name">{getFirstName()}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="user-dropdown">
                    {userLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.to}
                        className="dropdown-item"
                        onClick={handleLinkClick}
                      >
                        {link.icon}
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
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-link login-link" onClick={handleLinkClick}>
                <FaUser />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="mobile-right">
            {isAuthenticated && (
              <div className="mobile-user-avatar">
                {getUserInitials()}
              </div>
            )}
            <button 
              className={`navbar-toggle ${isOpen ? 'active' : ''}`}
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
            className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`} 
            onClick={handleLinkClick}
          />
          
          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <span className="brand-icon">🎨</span>
                <span className="brand-text">Strokify</span>
              </div>
              <button className="mobile-close" onClick={handleLinkClick}>
                <FaTimes />
              </button>
            </div>

            {/* User info in mobile menu - moved inside */}
            {isAuthenticated && (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar-large">{getUserInitials()}</div>
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
                  style={{ '--action-color': action.color }}
                  onClick={handleLinkClick}
                >
                  <span className="quick-icon">{action.icon}</span>
                  <span className="quick-text">{action.text}</span>
                  <FaArrowRight className="quick-arrow" />
                </Link>
              ))}
            </div>

            <div className="mobile-menu-divider" />

            {/* Main Navigation */}
            <div className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
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
                    <span className="mobile-link-icon"><FaSignOutAlt /></span>
                    <span className="mobile-link-text">Logout</span>
                  </button>
                </div>
              </>
            )}

            {/* Login/Register for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-login-btn" onClick={handleLinkClick}>
                  Login
                </Link>
                <Link to="/register" className="mobile-register-btn" onClick={handleLinkClick}>
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
              <a href="tel:911" className="emergency-call" onClick={handleLinkClick}>
                911
              </a>
            </div>

            {/* Footer */}
            <div className="mobile-menu-footer">
              <p>© 2025 Strokify. All rights reserved.</p>
              <div className="mobile-footer-links">
                <Link to="/about" onClick={handleLinkClick}>About</Link>
                <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
                <Link to="/privacy" onClick={handleLinkClick}>Privacy</Link>
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