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
  FaInstagram,
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

const founders = [
  {
    name: "Hieng Dara",
    role: ["Co-Founder", "Business Lead"],
    image: daraImage,
    bio: "CS student with proven business leadership across Singapore Vietnam and China.",
    linkedin: "https://linkedin.com/in/hieng-dara",
    instagram: "https://instagram.com/hiengdara",
    email: "dara@strokify.com",
    quote: "Bridging tech with business to drive innovation.",
    education: "Computer Science, AUPP",
    expertise: [
      "CFO, Real Business Simulations",
      "1st Place Winner, BUPT China",
      "Business Lead, GreenBite (NUS)",
    ],
  },
  {
    name: "Van Meysorng",
    role: ["Co-Founder", "Product Lead"],
    image: meysorngImage,
    bio: "ICT specialist with international experience in UI/UX design and product innovation.",
    linkedin: "https://linkedin.com/in/van-meysorng",
    instagram: "https://instagram.com/vanmeysorng",
    email: "meysorng@strokify.com",
    quote: "Great products blend design with technical excellence.",
    education: "ICT, AUPP",
    expertise: [
      "2nd Place - Best AI & UI/UX (BUPT)",
      "UI Designer, BusMate (NUS)",
      "Product Dev Lead, ScamShield (RMIT)",
    ],
  },
  {
    name: "Chhea Muoyheang",
    role: ["Co-Founder", "Technical Lead"],
    image: muoyheangImage,
    bio: "Full-stack developer with expertise in building scalable technical solutions.",
    linkedin: "https://linkedin.com/in/chhea-muoyheang",
    instagram: "https://instagram.com/chheamuoyheang",
    email: "muoyheang@strokify.com",
    quote: "Building robust foundations for innovative solutions.",
    education: "Software Development, AUPP",
    expertise: [
      "Full Stack Lead, SkinApsor",
      "Frontend Developer, EZ Found",
      "Data Analytics Certification",
    ],
  },
];

const About = () => {
  return (
    <div className="about-page">

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
        </div>
      </section>

      {/* ── MISSION / VISION / GOALS ── */}
      <section className="about-mission-vision-section">
        <div className="about-container">
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

            {/* Goal */}
            <div className="about-goal-card">
              <div className="about-card-icon"><FaChartLine /></div>
              <h2>Our 2026 Goal</h2>
              <p className="about-card-description">
                Driving measurable impact across Cambodia—tracking 
                the real numbers behind our growth.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            </div>
            <FaQuoteRight className="about-quote-icon right" />
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="about-founders-section">
        <div className="about-container">
          <div className="about-section-header">
            <h2>Meet the Founders</h2>
            <p className="about-section-subtitle">
              Three passionate individuals united by a mission to save lives
            </p>
          </div>

          <div className="about-founders-grid">
            {founders.map((founder, index) => (
              <div key={index} className="about-founder-card">
                <div className="about-founder-image-wrapper">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="about-founder-image"
                  />
                  <div className="about-founder-social">
                    <a
                      href={founder.linkedin}
                      className="about-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={founder.instagram}
                      className="about-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="about-social-link"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>

                <div className="about-founder-info">
                  <h3 className="about-founder-name">{founder.name}</h3>
                  <div className="about-founder-role">
                    {founder.role.map((line, i) => (
                      <p key={i} style={{ margin: 0 }}>{line}</p>
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
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="about-founder-quote">
                    <FaQuoteLeft className="quote-icon" />
                    <p>{founder.quote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <h3>Accessible to All</h3>
              <p>Premium technology should be available to every Cambodian, regardless of location or income.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2>Join Our Mission</h2>
          <p>Together, we can reduce stroke deaths in Cambodia.</p>
          <div className="about-cta-buttons">
            <Link to="/symptom-detector" className="about-btn-primary">
              Try Symptom Detector <FaArrowRight />
            </Link>
            <Link to="/contact" className="about-btn-secondary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;