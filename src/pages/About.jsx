import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRocket, FaHeart, FaUsers, FaShieldAlt, 
  FaChartLine, FaHandsHelping, FaGlobeAsia, 
  FaArrowRight, FaQuoteLeft, FaQuoteRight,
  FaLinkedin, FaTwitter, FaEnvelope, FaGithub,
  FaBrain, FaHeartbeat, FaClock, FaAward
} from 'react-icons/fa';
import '../styles/About.css';

// Founder images - using colorful emoji avatars
const founders = [
  {
    name: 'Hieng Dara',
    role: 'Co-Founder & CEO',
    image: '👨‍💼',
    bio: 'Former healthcare executive with 12+ years in digital health. Passionate about making stroke prevention accessible to all Cambodians.',
    linkedin: '#',
    twitter: '#',
    email: 'dara@strokify.com',
    quote: "Every minute counts when it comes to stroke. We're building technology that saves those minutes."
  },
  {
    name: 'Van Meysorng',
    role: 'Co-Founder & CTO',
    image: '👨‍💻',
    bio: 'AI specialist from MIT with expertise in medical machine learning. Led research on stroke prediction algorithms.',
    linkedin: '#',
    twitter: '#',
    email: 'meysorng@strokify.com',
    quote: "Our AI doesn't just predict strokes - it empowers families to take action before it's too late."
  },
  {
    name: 'Chhea Muoyheang',
    role: 'Co-Founder & Medical Director',
    image: '👩‍⚕️',
    bio: 'Neurologist specializing in cerebrovascular diseases. Previously led stroke units at major hospitals in Southeast Asia.',
    linkedin: '#',
    twitter: '#',
    email: 'muoyheang@strokify.com',
    quote: "I've seen too many stroke patients arrive too late. Strokify is my mission to change that."
  }
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Mission: <span className="gradient-text">Save Lives</span></h1>
          <p className="hero-subtitle">
            We're on a mission to reduce stroke-related deaths and disabilities in Cambodia 
            and Southeast Asia through AI-powered early detection and rapid response.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Lives Impacted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Detection Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Emergency Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="cards-grid">
            {/* Mission Card */}
            <div className="mission-card">
              <div className="card-icon">
                <FaRocket />
              </div>
              <h2>Our Mission</h2>
              <p className="card-description">
                To empower every Cambodian family with the tools and knowledge to 
                detect stroke symptoms early, connect with specialized care immediately, 
                and support recovery at home.
              </p>
              <ul className="mission-list">
                <li>🇰🇭 Accessible to all Cambodians</li>
                <li>⚡ Real-time symptom detection</li>
                <li>🏥 24/7 caregiver connection</li>
                <li>❤️ Support for families</li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="vision-card">
              <div className="card-icon">
                <FaGlobeAsia />
              </div>
              <h2>Our Vision</h2>
              <p className="card-description">
                A Southeast Asia where no family loses a loved one to stroke because 
                they didn't recognize the signs in time or couldn't access care quickly enough.
              </p>
              <ul className="vision-list">
                <li>🌏 Regional stroke network</li>
                <li>📱 AI in every pocket</li>
                <li>🚑 less than 15 min emergency response</li>
                <li>💪 Zero preventable deaths</li>
              </ul>
            </div>

            {/* Goal Card */}
            <div className="goal-card">
              <div className="card-icon">
                <FaChartLine />
              </div>
              <h2>2026 Goals</h2>
              <p className="card-description">
                By the end of 2026, we're committed to achieving these milestones:
              </p>
              <div className="goal-list">
                <div className="goal-item">
                  <span className="goal-percent">100%</span>
                  <span className="goal-text">Province coverage</span>
                </div>
                <div className="goal-item">
                  <span className="goal-percent">1M+</span>
                  <span className="goal-text">Active users</span>
                </div>
                <div className="goal-item">
                  <span className="goal-percent">500+</span>
                  <span className="goal-text">Partner nurses</span>
                </div>
                <div className="goal-item">
                  <span className="goal-percent">50%</span>
                  <span className="goal-text">Stroke response time reduction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="why-section">
        <div className="container">
          <div className="why-content">
            <FaQuoteLeft className="quote-icon left" />
            <h2>Why We Started Strokify</h2>
            <p className="why-text">
              "In Cambodia, stroke is the leading cause of death. Every year, thousands of families 
              lose loved ones because they didn't recognize the symptoms in time or couldn't reach 
              a hospital within the golden hour. We built Strokify to change that - to put life-saving 
              technology directly into the hands of every Cambodian family."
            </p>
            <div className="why-authors">
              <span>— Hieng Dara, Van Meysorng, Chhea Muoyheang</span>
            </div>
            <FaQuoteRight className="quote-icon right" />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section">
        <div className="container">
          <h2 className="section-title">Meet the Founders</h2>
          <p className="section-subtitle">Three passionate individuals united by a mission to save lives</p>

          <div className="founders-grid">
            {founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-image-wrapper">
                  <div className="founder-avatar">{founder.image}</div>
                  <div className="founder-social">
                    <a href={founder.linkedin} className="social-link"><FaLinkedin /></a>
                    <a href={founder.twitter} className="social-link"><FaTwitter /></a>
                    <a href={`mailto:${founder.email}`} className="social-link"><FaEnvelope /></a>
                  </div>
                </div>
                
                <div className="founder-info">
                  <h3 className="founder-name">{founder.name}</h3>
                  <p className="founder-role">{founder.role}</p>
                  <p className="founder-bio">{founder.bio}</p>
                  
                  <div className="founder-quote">
                    <FaQuoteLeft className="quote-small" />
                    <p>{founder.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaClock />
              </div>
              <h3>Speed Saves Lives</h3>
              <p>Every second counts in stroke response. We optimize every interaction for urgency.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Family First</h3>
              <p>We build for families caring for loved ones, not just individual patients.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Trust & Privacy</h3>
              <p>Your health data is sacred. We protect it with the highest standards.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaHandsHelping />
              </div>
              <h3>Accessible to All</h3>
              <p>Premium technology should be available to every Cambodian, regardless of location or income.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="cta-content">
          <h2>Join Our Mission</h2>
          <p>Together, we can reduce stroke deaths in Cambodia.</p>
          <div className="cta-buttons">
            <Link to="/symptom-detector" className="btn-primary">
              Try Symptom Detector <FaArrowRight />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;