import React from "react";
import { Link } from "react-router-dom";
import {
  // Hero Icons
  FaHeartbeat,
  FaArrowRight,
  FaQuestionCircle,
  FaShieldAlt,
  FaRobot,
  FaUsers,

  // Feature Icons
  FaStethoscope,
  FaSync,
  FaClock,
  FaCheckCircle,
  FaAmbulance,
  FaUserPlus,

  // Risk Assessment Icons
  FaBrain,
  FaHeart,
  FaExclamation,
  FaBell,

  // Risk Icons
  FaExclamationTriangle,
} from "react-icons/fa";
import "../styles/Home.css";
import logo from "../assets/img/phone_home.png";

const Home = () => {
  // Stats Data
  const stats = [
    { value: "200+", label: "  Users Testing", icon: <FaUsers /> },
    { value: "5", label: "  Hospitals Engaged", icon: <FaShieldAlt /> },
  ];

  // Risk Levels
  const riskLevels = [
    {
      level: "Low Risk",
      icon: <FaCheckCircle />,
      modifier: "home-page-risk-node--low",
      actions: [
        "Health Advisor recommendations",
        "LifeSync daily tasks",
        "Wellness tracking",
      ],
    },
    {
      level: "Moderate Risk",
      icon: <FaExclamation />,
      modifier: "home-page-risk-node--moderate",
      actions: [
        "Share report with caregiver",
        "Schedule check-up",
        "Enhanced monitoring",
      ],
    },
    {
      level: "High Risk",
      icon: <FaExclamationTriangle />,
      modifier: "home-page-risk-node--high",
      actions: [
        "F.A.S.T. stroke test",
        "Emergency guidance",
        "Call 911 immediately",
      ],
    },
  ];

  // Features
  const features = [
    {
      icon: <FaStethoscope />,
      title: "Symptom Detector",
      description:
        "AI-powered symptom analysis with 95% accuracy - get results in seconds",
      benefits: ["5-minute assessment", "3 risk categories", "Instant results"],
      link: "/symptom-detector",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Advisor",
      description:
        "Personalized wellness plans tailored to your unique health profile",
      benefits: [
        "Custom recommendations",
        "Progress tracking",
        "Expert guidelines",
      ],
      link: "/health-advisor",
    },
    {
      icon: <FaSync />,
      title: "LifeSync",
      description:
        "Synchronize your health tasks, medications, and daily progress",
      benefits: ["Smart reminders", "Medication tracking", "Health metrics"],
      link: "/lifesync",
    },
  ];

  return (
    <div className="home-page">
      {/* ========== HERO SECTION ========== */}
      <section className="home-page-hero">
        <div className="home-page-hero-content">
          <h1>Your Health Journey Starts Here</h1>
          <p className="home-page-hero-subtitle">
            Experience the future of healthcare with AI-powered symptom analysis
            and personalized wellness guidance.
          </p>

          <div className="home-page-hero-buttons">
            <Link to="/about" className="home-page-btn-secondary">
              <FaQuestionCircle /> About Us
            </Link>
            <Link to="/symptom-detector" className="home-page-btn-primary">
              Start Free Trial <FaArrowRight />
            </Link>
          </div>

          <div className="home-page-hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="home-page-hero-stat">
                <span className="home-page-stat-icon">{stat.icon}</span>
                <div className="home-page-stat-info">
                  <span className="home-page-stat-value">{stat.value}</span>
                  <span className="home-page-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-page-hero-image">
          <img
            src={logo}
            alt="Strokify App"
            className="home-page-hero-logo"
          />
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="home-page-features">
        <div className="home-page-section-header">
          <h2>Comprehensive Health Solutions</h2>
          <p>
            Everything you need to manage your health journey in one platform
          </p>
        </div>

        <div className="home-page-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="home-page-feature-card">
              <div className="home-page-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className="home-page-feature-benefits">
                {feature.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              <Link to={feature.link} className="home-page-feature-link">
                Learn more <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========== RISK ASSESSMENT ========== */}
      <section className="home-page-risk-section">
        <div className="home-page-section-header">
          <h2>Intelligent Risk Assessment</h2>
          <p>Our AI categorizes your results into 3 clear risk levels</p>
        </div>

        <div className="home-page-risk-flow">
          {riskLevels.map((risk, index) => (
            <React.Fragment key={index}>
              <div className={`home-page-risk-node ${risk.modifier}`}>
                <div className="home-page-risk-node-icon">
                  {risk.icon}
                </div>
                <h4>{risk.level}</h4>
                <ul className="home-page-risk-actions">
                  {risk.actions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
              {index < riskLevels.length - 1 && (
                <div className="home-page-flow-arrow">
                  <FaArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ========== FAMILY CARE PREVIEW ========== */}
      <section className="home-page-family-section">
        <div className="home-page-family-preview">
          <div className="home-page-family-preview-icon">
            <FaUsers />
          </div>
          <div className="home-page-family-preview-content">
            <h4>Care for Your Whole Family</h4>
            <p>
              Children can create family accounts to monitor their elderly
              parents' health from anywhere in the world. Stay connected and
              catch potential health issues before they become emergencies.
            </p>
            <Link to="/family-accounts" className="home-page-family-link">
              Learn about family accounts <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="home-page-cta">
        <div className="home-page-cta-content">
          <h2>Ready to transform your health?</h2>
          <p>
            Join thousands of users who trust Strokify for their daily health
            needs
          </p>
          <div className="home-page-cta-buttons">
            <Link
              to="/symptom-detector"
              className="home-page-btn-primary home-page-btn-large"
            >
              Get Started Today <FaArrowRight />
            </Link>
            <Link
              to="/about"
              className="home-page-btn-secondary home-page-btn-large"
            >
              <FaQuestionCircle /> Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;