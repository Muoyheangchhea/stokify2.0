<<<<<<< Updated upstream
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
=======
import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaHeart,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
  FaHandsHelping,
  FaGlobeAsia,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGithub,
  FaBrain,
  FaHeartbeat,
  FaClock,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";
import "../styles/About.css";

import daraImage from "../assets/img/dara.png";
import meysorngImage from "../assets/img/ms.png";
import muoyheangImage from "../assets/img/mh.png";
>>>>>>> Stashed changes

// Founder images - using colorful emoji avatars
const founders = [
  {
<<<<<<< Updated upstream
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
=======
    name: "Hieng Dara",
    role: ["Co-Founder", "Business Lead"],
    image: daraImage,
    bio: "CS graduate with a sharp eye for business strategy. Led finance and operations across international ventures in Singapore and China, turning complex ideas into executable plans.",
    linkedin: "https://linkedin.com/in/hieng-dara",
    twitter: "https://twitter.com/hiengdara",
    email: "dara@strokify.com",
    quote: "Bridging technical depth with business clarity to build things that last.",
    education: "Computer Science, AUPP",
    expertise: [
      { icon: <FaAward />, text: "1st Place — Sokheap Project, BUPT China" },
      { icon: <FaChartLine />, text: "CFO, SmartEdu Real Business Simulation" },
      { icon: <FaBrain />, text: "Business Lead, GreenBite @ NUS Singapore" },
    ],
  },
  {
    name: "Van Meysorng",
    role: ["Co-Founder", "Product Lead"],
    image: meysorngImage,
    bio: "Product designer and ICT specialist who crafts intuitive digital experiences. Awarded for AI & UI/UX excellence internationally, with a track record of shipping user-loved products.",
    linkedin: "https://linkedin.com/in/van-meysorng",
    twitter: "https://twitter.com/vanmeysorng",
    email: "meysorng@strokify.com",
    quote: "Great products are felt before they're understood.",
    education: "ICT, AUPP",
    expertise: [
      { icon: <FaAward />, text: "2nd Place — Best AI & UI/UX, BUPT China" },
      { icon: <FaUsers />, text: "UI Designer, BusMate @ NUS Singapore" },
      { icon: <FaRocket />, text: "Frontend & Gamification Lead, ScamShield @ RMIT" },
    ],
  },
  {
    name: "Chhea Muoyheang",
    role: ["Co-Founder", "Technical Lead"],
    image: muoyheangImage,
    bio: "Full-stack engineer with a systems mindset. Builds scalable, data-driven applications and leads technical teams from architecture to deployment across multiple product verticals.",
    linkedin: "https://linkedin.com/in/chhea-muoyheang",
    twitter: "https://twitter.com/chheamuoyheang",
    email: "muoyheang@strokify.com",
    quote: "Solid engineering is invisible — until everything else fails.",
    education: "Software Development, AUPP",
    expertise: [
      { icon: <FaShieldAlt />, text: "Full Stack & Tech Lead, SkinApsor" },
      { icon: <FaChartLine />, text: "Data Analytics Bootcamp, UpSkill 2.0" },
      { icon: <FaBrain />, text: "Prompt Engineering Intern, Resumely" },
    ],
  },
>>>>>>> Stashed changes
];

const About = () => {
  return (
    <div className="about-page">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Mission: <span className="gradient-text">Save Lives</span></h1>
          <p className="hero-subtitle">
            We're on a mission to reduce stroke-related deaths and disabilities in Cambodia 
            and Southeast Asia through AI-powered early detection and rapid response.
=======
=======
>>>>>>> Stashed changes

      {/* ── HERO ── */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1>
            Our Mission: <span className="about-gradient-text">Save Lives</span>
          </h1>
          <p className="about-hero-subtitle">
            We're on a mission to reduce stroke-related deaths and disabilities
            in Cambodia and Southeast Asia through AI-powered early detection
            and rapid response.
>>>>>>> Stashed changes
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

          <div className="about-hero-cta">
            <Link to="/symptom-detector" className="about-hero-explore-btn">
              Explore More <FaArrowRight />
            </Link>
          </div>

          <div className="about-hero-cta">
            <Link to="/symptom-detector" className="about-hero-explore-btn">
              Explore More <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
      {/* ── MISSION / VISION / GOALS ── */}
      <section className="about-mission-vision-section">
        <div className="about-container">
          {/* Unified section header */}
          <div className="about-section-header">
            <h2>What Drives Us Forward</h2>
            <p className="about-section-subtitle">
              Three pillars that define who we are and what we're building
            </p>
          </div>

          <div className="about-cards-grid">
            {/* Mission */}
            <div className="about-mission-card">
              <div className="about-card-icon"><FaRocket /></div>
              <h2>Our Mission</h2>
              <p className="about-card-description">
                To put life-saving stroke detection directly into the hands of every
                Cambodian family — enabling early recognition, instant care access,
                and confident home recovery support.
              </p>
              <ul className="about-mission-list">
                <li>Real-time AI symptom detection</li>
                <li>24/7 specialist connection</li>
                <li>Nationwide accessibility</li>
                <li>Family-centered recovery tools</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="about-vision-card">
              <div className="about-card-icon"><FaGlobeAsia /></div>
              <h2>Our Vision</h2>
              <p className="about-card-description">
                A Southeast Asia where no family loses a loved one to stroke
                due to delayed recognition or limited access to care — with
                AI bridging the gap between symptoms and survival.
              </p>
              <ul className="about-vision-list">
                <li>Regional stroke response network</li>
                <li>Under 15-min emergency dispatch</li>
                <li>AI-powered care in every pocket</li>
                <li>Zero preventable stroke deaths</li>
              </ul>
            </div>

            {/* Goals */}
            <div className="about-goal-card">
              <div className="about-card-icon"><FaChartLine /></div>
              <h2>Our Traction</h2>
              <p className="about-card-description">
=======
      {/* ── MISSION / VISION / GOALS ── */}
      <section className="about-mission-vision-section">
        <div className="about-container">
          {/* Unified section header */}
          <div className="about-section-header">
            <h2>What Drives Us Forward</h2>
            <p className="about-section-subtitle">
              Three pillars that define who we are and what we're building
            </p>
          </div>

          <div className="about-cards-grid">
            {/* Mission */}
            <div className="about-mission-card">
              <div className="about-card-icon"><FaRocket /></div>
              <h2>Our Mission</h2>
              <p className="about-card-description">
                To put life-saving stroke detection directly into the hands of every
                Cambodian family — enabling early recognition, instant care access,
                and confident home recovery support.
              </p>
              <ul className="about-mission-list">
                <li>Real-time AI symptom detection</li>
                <li>24/7 specialist connection</li>
                <li>Nationwide accessibility</li>
                <li>Family-centered recovery tools</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="about-vision-card">
              <div className="about-card-icon"><FaGlobeAsia /></div>
              <h2>Our Vision</h2>
              <p className="about-card-description">
                A Southeast Asia where no family loses a loved one to stroke
                due to delayed recognition or limited access to care — with
                AI bridging the gap between symptoms and survival.
              </p>
              <ul className="about-vision-list">
                <li>Regional stroke response network</li>
                <li>Under 15-min emergency dispatch</li>
                <li>AI-powered care in every pocket</li>
                <li>Zero preventable stroke deaths</li>
              </ul>
            </div>

            {/* Goals */}
            <div className="about-goal-card">
              <div className="about-card-icon"><FaChartLine /></div>
              <h2>Our Traction</h2>
              <p className="about-card-description">
>>>>>>> Stashed changes
                Real numbers, real impact — here's where Strokify stands
                today as we grow across Cambodia.
              </p>
              <div className="about-goal-list">
                <div className="about-goal-item">
                  <span className="about-goal-percent">250+</span>
                  <span className="about-goal-text">Active users</span>
                </div>
                <div className="about-goal-item">
                  <span className="about-goal-percent">15</span>
                  <span className="about-goal-text">Hospital partnerships</span>
                </div>
                <div className="about-goal-item">
                  <span className="about-goal-percent">50+</span>
                  <span className="about-goal-text">Partner nurses</span>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
      {/* ── WHY WE STARTED ── */}
      <section className="about-why-section">
        <div className="about-container">
          <div className="about-why-content">
            <FaQuoteLeft className="about-quote-icon left" />
            <h2>Why We Started Strokify</h2>
            <p className="about-why-text">
              "In Cambodia, stroke is the leading cause of death. Every year,
              thousands of families lose loved ones because they didn't
              recognize the symptoms in time or couldn't reach a hospital within
              the golden hour. We built Strokify to change that — to put
              life-saving technology directly into the hands of every Cambodian
              family."
            </p>
            <div className="about-why-authors">
              — Hieng Dara, Van Meysorng, Chhea Muoyheang
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            </div>
            <FaQuoteRight className="quote-icon right" />
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      {/* Founders Section */}
      <section className="founders-section">
        <div className="container">
          <h2 className="section-title">Meet the Founders</h2>
          <p className="section-subtitle">Three passionate individuals united by a mission to save lives</p>
=======
=======
>>>>>>> Stashed changes
      {/* ── FOUNDERS ── */}
      <section className="about-founders-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Meet the Founders</h2>
            <p className="about-section-subtitle">
              Three passionate individuals united by a mission to save lives
            </p>
          </div>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

          <div className="founders-grid">
            {founders.map((founder, index) => (
<<<<<<< Updated upstream
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
=======
              <div key={index} className="about-founder-card">
                <div className="about-founder-image-wrapper">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="about-founder-image"
                  />
                  <div className="about-founder-social">
                    <a href={founder.linkedin} className="about-social-link" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    <a href={founder.twitter} className="about-social-link" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                    <a href={`mailto:${founder.email}`} className="about-social-link">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>

                <div className="about-founder-info">
                  <h3 className="about-founder-name">{founder.name}</h3>
                  <div className="about-founder-role">
                    {founder.role.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  {founder.education && (
                    <div className="about-founder-education">
                      <FaGraduationCap /> {founder.education}
                    </div>
                  )}

                  <p className="about-founder-bio">{founder.bio}</p>

                  {founder.expertise && (
                    <div className="about-founder-expertise">
                      {founder.expertise.map((item, i) => (
                        <span key={i} className="expertise-tag">
                          <span className="expertise-tag-icon">{item.icon}</span>
                          {item.text}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="about-founder-quote">
                    <FaQuoteLeft className="quote-icon" />
>>>>>>> Stashed changes
                    <p>{founder.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
      {/* ── CORE VALUES ── */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Our Core Values</h2>
            <p className="about-section-subtitle">
              The beliefs that guide every decision we make
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon"><FaClock /></div>
              <h3>Speed Saves Lives</h3>
              <p>Every second counts in stroke response. We optimize every interaction for urgency.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaHeart /></div>
              <h3>Family First</h3>
              <p>We build for families caring for loved ones, not just individual patients.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaShieldAlt /></div>
              <h3>Trust & Privacy</h3>
              <p>Your health data is sacred. We protect it with the highest standards.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaHandsHelping /></div>
>>>>>>> Stashed changes
=======
      {/* ── CORE VALUES ── */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Our Core Values</h2>
            <p className="about-section-subtitle">
              The beliefs that guide every decision we make
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon"><FaClock /></div>
              <h3>Speed Saves Lives</h3>
              <p>Every second counts in stroke response. We optimize every interaction for urgency.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaHeart /></div>
              <h3>Family First</h3>
              <p>We build for families caring for loved ones, not just individual patients.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaShieldAlt /></div>
              <h3>Trust & Privacy</h3>
              <p>Your health data is sacred. We protect it with the highest standards.</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FaHandsHelping /></div>
>>>>>>> Stashed changes
              <h3>Accessible to All</h3>
              <p>Premium technology should be available to every Cambodian, regardless of location or income.</p>
            </div>
          </div>
        </div>
      </section>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      {/* Call to Action */}
      <section className="about-cta">
        <div className="cta-content">
=======
=======
>>>>>>> Stashed changes
      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="about-cta-content">
>>>>>>> Stashed changes
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