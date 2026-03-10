import React from 'react';
import { Link } from 'react-router-dom';
import { 
  // Hero Icons
  FaHeartbeat, FaArrowRight, FaQuestionCircle,
  FaShieldAlt, FaRobot, FaUsers,
  
  // Feature Icons
  FaStethoscope, FaSync, FaClock, FaCheckCircle,
  FaAmbulance, FaUserPlus,
  
  // Risk Assessment Icons
  FaBrain, FaHeart, FaExclamation, FaBell,
  
  // Risk Icons
  FaExclamationTriangle
} from 'react-icons/fa';
import '../styles/Home.css';
import logo from '../assets/img/Strokify_Logo.png';

const Home = () => {
  // Stats Data
  const stats = [
    { value: '200+', label: '  Users Testing', icon: <FaUsers /> },
    { value: '5', label: '  Hospitals Engaged', icon: <FaShieldAlt /> },
  ];

  // Risk Levels
  const riskLevels = [
    {
      level: 'Low Risk',
      icon: <FaCheckCircle />,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
=======
      modifier: "home-page-risk-node--low",
>>>>>>> Stashed changes
=======
      modifier: "home-page-risk-node--low",
>>>>>>> Stashed changes
      actions: [
        'Health Advisor recommendations',
        'LifeSync daily tasks',
        'Wellness tracking'
      ]
    },
    {
      level: 'Moderate Risk',
      icon: <FaExclamation />,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
=======
      modifier: "home-page-risk-node--moderate",
>>>>>>> Stashed changes
=======
      modifier: "home-page-risk-node--moderate",
>>>>>>> Stashed changes
      actions: [
        'Share report with caregiver',
        'Schedule check-up',
        'Enhanced monitoring'
      ]
    },
    {
      level: 'High Risk',
      icon: <FaExclamationTriangle />,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      color: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.1)',
=======
      modifier: "home-page-risk-node--high",
>>>>>>> Stashed changes
=======
      modifier: "home-page-risk-node--high",
>>>>>>> Stashed changes
      actions: [
        'F.A.S.T. stroke test',
        'Emergency guidance',
        'Call 911 immediately'
      ]
    }
  ];

  // Features
  const features = [
    {
      icon: <FaStethoscope />,
      title: 'Symptom Detector',
      description: 'AI-powered symptom analysis with 95% accuracy - get results in seconds',
      benefits: ['5-minute assessment', '3 risk categories', 'Instant results'],
      link: '/symptom-detector'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Health Advisor',
      description: 'Personalized wellness plans tailored to your unique health profile',
      benefits: ['Custom recommendations', 'Progress tracking', 'Expert guidelines'],
      link: '/health-advisor'
    },
    {
      icon: <FaSync />,
      title: 'LifeSync',
      description: 'Synchronize your health tasks, medications, and daily progress',
      benefits: ['Smart reminders', 'Medication tracking', 'Health metrics'],
      link: '/lifesync'
    }
  ];

  return (
    <div className="home">
      {/* ========== HERO SECTION ========== */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Your Health Journey Starts Here</h1>
          <p className="home-hero-subtitle">
            Experience the future of healthcare with AI-powered symptom analysis 
            and personalized wellness guidance.
          </p>
          
          <div className="home-hero-buttons">
            <Link to="/about" className="btn-secondary">
              <FaQuestionCircle /> About Us
            </Link>
            <Link to="/symptom-detector" className="btn-primary">
              Start Free Trial <FaArrowRight />
            </Link>
          </div>

          <div className="home-hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="home-hero-stat">
                <span className="home-stat-icon">{stat.icon}</span>
                <div className="home-stat-info">
                  <span className="home-stat-value">{stat.value}</span>
                  <span className="home-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

<<<<<<< Updated upstream
        <div className="home-hero-image">
          <div className="hero-placeholder animate-float">
            <img src={logo} alt="Strokify Logo" className="hero-logo" />
=======
        <div className="home-page-hero-image">
          <div className="home-page-phone-shell">
            <div className="home-page-hero-placeholder">
              <img
                src={logo}
                alt="Strokify App"
                className="home-page-hero-logo"
              />
              <div className="home-page-phone-speaker" />
              <div className="home-page-phone-notch" />
            </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="features">
        <div className="section-header">
          <h2>Comprehensive Health Solutions</h2>
          <p>Everything you need to manage your health journey in one platform</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className="feature-benefits">
                {feature.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              <Link to={feature.link} className="feature-link">
                Learn more <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========== RISK ASSESSMENT ========== */}
      <section className="risk-assessment-section">
        <div className="section-header">
          <h2>Intelligent Risk Assessment</h2>
          <p>Our AI categorizes your results into 3 clear risk levels</p>
        </div>

        <div className="risk-flow">
          {riskLevels.map((risk, index) => (
            <React.Fragment key={index}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
              <div className="risk-node" style={{ backgroundColor: risk.bg }}>
                <div className="risk-node-icon" style={{ color: risk.color }}>
                  {risk.icon}
                </div>
                <h4 style={{ color: risk.color }}>{risk.level}</h4>
                <ul className="risk-actions">
                  {risk.actions.map((action, i) => (
                    <li key={i}>
                      <FaCheckCircle style={{ color: risk.color, marginRight: '8px' }} /> 
                      {action}
                    </li>
=======
              <div className={`home-page-risk-node ${risk.modifier}`}>
                <div className="home-page-risk-node-icon">
                  {risk.icon}
                </div>
                <h4>{risk.level}</h4>
                <ul className="home-page-risk-actions">
                  {risk.actions.map((action, i) => (
                    <li key={i}>{action}</li>
>>>>>>> Stashed changes
=======
              <div className={`home-page-risk-node ${risk.modifier}`}>
                <div className="home-page-risk-node-icon">
                  {risk.icon}
                </div>
                <h4>{risk.level}</h4>
                <ul className="home-page-risk-actions">
                  {risk.actions.map((action, i) => (
                    <li key={i}>{action}</li>
>>>>>>> Stashed changes
                  ))}
                </ul>
              </div>
              {index < riskLevels.length - 1 && (
                <div className="flow-arrow">
                  <FaArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ========== FAMILY CARE PREVIEW ========== */}
      <section className="family-care-section">
        <div className="family-preview">
          <div className="family-preview-icon">
            <FaUsers />
          </div>
          <div className="family-preview-content">
            <h4>Care for Your Whole Family</h4>
            <p>
              Children can create family accounts to monitor their elderly parents' health 
              from anywhere in the world. Stay connected and catch potential health issues 
              before they become emergencies.
            </p>
            <Link to="/family-accounts" className="family-link">
              Learn about family accounts <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="home-cta">
        <div className="home-cta-content">
          <h2>Ready to transform your health?</h2>
          <p>Join thousands of users who trust Strokify for their daily health needs</p>
          <div className="home-cta-buttons">
            <Link to="/symptom-detector" className="btn-primary btn-large">
              Get Started Today <FaArrowRight />
            </Link>
            <Link to="/about" className="btn-secondary btn-large">
              <FaQuestionCircle /> Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;