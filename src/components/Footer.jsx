import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Strokify_Logo.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="brand-icon animate-float">
                <img src={logo} alt="Strokify Logo" className="logo-icon" />
              </span>
              Strokify
            </h3>
            <p className="footer-description">
              Revolutionizing healthcare through AI-powered tools that make
              wellness monitoring accessible, accurate, and actionable for
              everyone.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/p/Strokify-61578646031075/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a> */}
              <a
                href="https://www.instagram.com/ur.strokifyy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a> */}
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/symptom-detector">Symptom Detector</Link>
              </li>
              <li>
                <Link to="/health-advisor">Health Advisor</Link>
              </li>
              <li>
                <Link to="/lifesync">LifeSync</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>AI Symptom Analysis</li>
              <li>Personalized Wellness</li>
              <li>Health Tracking</li>
              <li>Task Management</li>
              <li>24/7 Support</li>
              <li>Data Security</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt />
                <span>#278H, Street 201R, Kroalkor Village, Sangkat Kilometer 6, Khan Russey Keo , Phnom Penh, Cambodia</span>
              </li>
              <li>
                <FaPhone />
                <span>+855-77-847664</span>
              </li>
              <li>
                <FaEnvelope />
                <span>strokifyteam@gmail.com</span>
              </li>
            </ul>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button
                className="newsletter-btn"
                formAction="mailto:strokifyteam@gmail.com"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Strokify. Made with{" "}
            <FaHeart className="heart-icon" /> for better health.
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
