import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaStethoscope, FaHeartbeat, FaSync, FaArrowRight, 
  FaShieldAlt, FaRobot, FaUsers, FaUserPlus, 
  FaCheckCircle, FaExclamationTriangle, FaAmbulance,
  FaClock, FaBell, FaChild, FaUserMd, FaQuestionCircle,
  FaChartLine, FaHome, FaMobileAlt
} from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const stats = [
    { value: '50K+', label: 'Active Users', icon: <FaUsers /> },
    { value: '100K+', label: 'Health Checks', icon: <FaShieldAlt /> },
    { value: '99.9%', label: 'Uptime', icon: <FaRobot /> }
  ];

  const flowSteps = [
    {
      icon: <FaUserPlus />,
      title: '1. Register',
      description: 'Create your free account in seconds. Add family members to monitor elderly parents or children.',
      time: '30 seconds',
      features: ['Free', 'Family linking', 'Secure']
    },
    {
      icon: <FaStethoscope />,
      title: '2. Symptom Check',
      description: 'Answer a few quick questions about your health, lifestyle, and medical history.',
      time: '5 minutes',
      features: ['AI-powered', 'Simple questions', 'Instant']
    },
    {
      icon: <FaRobot />,
      title: '3. AI Analysis',
      description: 'Our machine learning model analyzes your data and provides clear risk categories.',
      time: '2 seconds',
      features: ['95% accuracy', '3 risk levels', 'Actionable']
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Your Health Journey Starts Here</h1>
          <p className="home-hero-subtitle">
            Experience the future of healthcare with AI-powered symptom analysis 
            and personalized wellness guidance. Join 50,000+ users who trust Strokify.
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
        <div className="home-hero-image">
          <div className="hero-placeholder animate-float">
            🎨
          </div>
        </div>
      </section>

      {/* How It Works Flow Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How Strokify Works</h2>
          <p>From symptom check to emergency response - complete health workflow</p>
        </div>

        <div className="flow-container">
          {/* Main Flow Steps */}
          <div className="flow-steps">
            {flowSteps.map((step, index) => (
              <div key={index} className="flow-step">
                <div className="step-badge">STEP {index + 1}</div>
                <div className="step-icon-wrapper">
                  <div className="step-main-icon">{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="step-time">
                  <FaClock /> Takes {step.time}
                </div>
                <div className="step-features-mini">
                  {step.features.map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Risk Decision Tree */}
          <div className="risk-decision-tree">
            <div className="decision-header">
              <h3>Intelligent Risk Assessment</h3>
              <p>Our AI categorizes your results into 3 clear risk levels</p>
            </div>

            <div className="risk-flow">
              <div className="risk-node">
                <div className="risk-node-icon">🟢</div>
                <h4>Normal / Low Risk</h4>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                  Maintain your health with personalized guidance
                </p>
                <ul className="risk-actions">
                  <li><FaCheckCircle /> Health Advisor recommendations</li>
                  <li><FaCheckCircle /> LifeSync daily tasks</li>
                  <li><FaCheckCircle /> Wellness tracking</li>
                </ul>
              </div>

              <div className="flow-arrow">→</div>

              <div className="risk-node">
                <div className="risk-node-icon">🟡</div>
                <h4>Moderate Risk</h4>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                  Connect with healthcare providers
                </p>
                <ul className="risk-actions">
                  <li><FaCheckCircle /> Share report with caregiver</li>
                  <li><FaCheckCircle /> Schedule check-up</li>
                  <li><FaCheckCircle /> Enhanced monitoring</li>
                </ul>
              </div>

              <div className="flow-arrow">→</div>

              <div className="risk-node">
                <div className="risk-node-icon">🔴</div>
                <h4>High Risk</h4>
                <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                  Immediate action required
                </p>
                <ul className="risk-actions">
                  <li><FaExclamationTriangle /> F.A.S.T. stroke test</li>
                  <li><FaAmbulance /> Emergency guidance</li>
                </ul>
                <div className="emergency-badge">
                  <FaAmbulance /> Time Saved = Brain Saved
                </div>
              </div>
            </div>

            {/* FAST Mini Test */}
            <div className="fast-mini">
              <h4>
                <FaAmbulance style={{ color: 'var(--primary)' }} />
                F.A.S.T. Stroke Test - For High Risk Cases
              </h4>
              <div className="fast-grid-mini">
                <div className="fast-item-mini">
                  <div className="fast-letter-mini">F</div>
                  <span>Face drooping</span>
                </div>
                <div className="fast-item-mini">
                  <div className="fast-letter-mini">A</div>
                  <span>Arm weakness</span>
                </div>
                <div className="fast-item-mini">
                  <div className="fast-letter-mini">S</div>
                  <span>Speech difficulty</span>
                </div>
                <div className="fast-item-mini">
                  <div className="fast-letter-mini">T</div>
                  <span>Time to call emergency</span>
                </div>
              </div>
            </div>
          </div>

          {/* Family Care Preview - FIXED LINK */}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Comprehensive Health Solutions</h2>
          <p>Everything you need to manage your health journey in one platform</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaStethoscope /></div>
            <h3>Symptom Detector</h3>
            <p>AI-powered symptom analysis with 95% accuracy - get results in seconds</p>
            <ul className="feature-benefits">
              <li>5-minute assessment</li>
              <li>3 risk categories</li>
              <li>Instant results</li>
            </ul>
            <Link to="/symptom-detector" className="feature-link">
              Learn more <FaArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaHeartbeat /></div>
            <h3>Health Advisor</h3>
            <p>Personalized wellness plans tailored to your unique health profile</p>
            <ul className="feature-benefits">
              <li>Custom recommendations</li>
              <li>Progress tracking</li>
              <li>Expert guidelines</li>
            </ul>
            <Link to="/health-advisor" className="feature-link">
              Learn more <FaArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FaSync /></div>
            <h3>LifeSync</h3>
            <p>Synchronize your health tasks, medications, and daily progress</p>
            <ul className="feature-benefits">
              <li>Smart reminders</li>
              <li>Medication tracking</li>
              <li>Health metrics</li>
            </ul>
            <Link to="/lifesync" className="feature-link">
              Learn more <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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