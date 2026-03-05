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
  FaGraduationCap, // Add this import
} from "react-icons/fa";
import "../styles/About.css";

// Import images (assuming they're in src/assets/founders/)
import daraImage from "../assets/img/dara.png";
import meysorngImage from "../assets/img/ms.png";
import muoyheangImage from "../assets/img/mh.png";

const founders = [
  {
    name: "Hieng Dara",
    role: ["Co-Founder", "Business Lead"],
    image: daraImage,
    bio: "Computer Science major with strong business acumen. Experienced in financial leadership, project management, and business intelligence across multiple international projects in Singapore and China.",
    linkedin: "https://linkedin.com/in/hieng-dara",
    twitter: "https://twitter.com/hiengdara",
    email: "dara@strokify.com",
    quote:
      "Bridging technical expertise with business strategy to drive innovation.",
    education: "Computer Science, American University of Phnom Penh",
    // expertise: [
    //   "Business Strategy",
    //   "Financial Leadership",
    //   "Project Management",
    //   "Business Intelligence"
    // ],
    expertise: [
      "CFO, Real Business Simulations (SmartEdu USD P5)",
      "1st Place Winner - Sokheap Project, BUPT China",
      "Business Lead, GreenBite (NUS Singapore)",
      "Finance Lead, MindEASE",
      "Project Intern at MPTC",
      "Completed Business Intelligence Course",
    ],
  },
  {
    name: "Van Meysorng",
    role: ["Co-Founder", "Product Development Lead"],
    image: meysorngImage,
    bio: "ICT specialist skilled in web development, UI/UX design, and product innovation. Experienced across international projects in Singapore and China, passionate about creating user-centered digital solutions.",
    linkedin: "https://linkedin.com/in/van-meysorng",
    twitter: "https://twitter.com/vanmeysorng",
    email: "meysorng@strokify.com",
    quote: "Great products blend design thinking with technical excellence.",
    education: "ICT, American University of Phnom Penh",
    // expertise: [
    //   "Product Design",
    //   "UI/UX Design",
    //   "Frontend Development",
    //   "Gamification"
    // ],
    expertise: [
      "2nd Place - Best AI & UI/UX Design (BUPT China)",
      "UI Designer, BusMate (NUS Singapore)",
      "Frontend Lead & Gamification Developer, ScamShield (RMIT)",
      "Product Designer, MindEASE & SkinApsor",
      "Web & Product Design Intern, MPTC",
      "Media & Design Lead, Greensphere Campaign",
    ],
  },
  {
    name: "Chhea Muoyheang",
    role: ["Co-Founder", "Technical Lead"],
    image: muoyheangImage,
    bio: "Software development specialist with full-stack expertise and a passion for building scalable technical solutions. Experienced in leading development teams and implementing data-driven applications.",
    linkedin: "https://linkedin.com/in/chhea-muoyheang",
    twitter: "https://twitter.com/chheamuoyheang",
    email: "muoyheang@strokify.com",
    quote: "Building robust technical foundations for innovative solutions.",
    education: "Software Development, American University of Phnom Penh",
    // expertise: [
    //   "Full Stack Development",
    //   "Technical Leadership",
    //   "Data Analytics",
    //   "Prompt Engineering",
    //   "UI/UX"
    // ],
    expertise: [
      "Full Stack & Technical Lead, SkinApsor",
      "Frontend Developer, EZ Found",
      "Project Intern, MPTC",
      "Completed Data Analytics Bootcamp (UpSkill 2.0)",
      "Prompt Engineering & UX/UI Intern, Resumely",
      "Technician, E-Solver Cambodia",
    ],
  },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
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

          <div className="about-stats-container">
            <div className="about-stat-item">
              <span className="about-stat-number">10K+</span>
              <span className="about-stat-label">Lives Impacted</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">95%</span>
              <span className="about-stat-label">Detection Rate</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">24/7</span>
              <span className="about-stat-label">Emergency Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="about-mission-vision-section">
        <div className="about-container">
          <div className="about-cards-grid">
            {/* Mission Card */}
            <div className="about-mission-card">
              <div className="about-card-icon">
                <FaRocket />
              </div>
              <h2>Our Mission</h2>
              <p className="about-card-description">
                To empower every Cambodian family with the tools and knowledge
                to detect stroke symptoms early, connect with specialized care
                immediately, and support recovery at home.
              </p>
              <ul className="about-mission-list">
                <li> Accessible to all Cambodians</li>
                <li> Real-time symptom detection</li>
                <li> 24/7 caregiver connection</li>
                <li> Support for families</li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="about-vision-card">
              <div className="about-card-icon">
                <FaGlobeAsia />
              </div>
              <h2>Our Vision</h2>
              <p className="about-card-description">
                A Southeast Asia where no family loses a loved one to stroke
                because they didn't recognize the signs in time or couldn't
                access care quickly enough.
              </p>
              <ul className="about-vision-list">
                <li> Regional stroke network</li>
                <li> AI in every pocket</li>
                <li> less than 15 min emergency response</li>
                <li> Zero preventable deaths</li>
              </ul>
            </div>

            {/* Goal Card */}
            <div className="about-goal-card">
              <div className="about-card-icon">
                <FaChartLine />
              </div>
              <h2>2026 Goals</h2>
              <p className="about-card-description">
                By the end of 2026, we're committed to achieving these
                milestones:
              </p>
              <div className="about-goal-list">
                <div className="about-goal-item">
                  <span className="about-goal-percent">100%</span>
                  <span className="about-goal-text">Province coverage</span>
                </div>
                <div className="about-goal-item">
                  <span className="about-goal-percent">1M+</span>
                  <span className="about-goal-text">Active users</span>
                </div>
                <div className="about-goal-item">
                  <span className="about-goal-percent">500+</span>
                  <span className="about-goal-text">Partner nurses</span>
                </div>
                <div className="about-goal-item">
                  <span className="about-goal-percent">50%</span>
                  <span className="about-goal-text">
                    Stroke response time reduction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="about-why-section">
        <div className="about-container">
          <div className="about-why-content">
            <FaQuoteLeft className="about-quote-icon left" />
            <h2>Why We Started Strokify</h2>
            <p className="about-why-text">
              "In Cambodia, stroke is the leading cause of death. Every year,
              thousands of families lose loved ones because they didn't
              recognize the symptoms in time or couldn't reach a hospital within
              the golden hour. We built Strokify to change that - to put
              life-saving technology directly into the hands of every Cambodian
              family."
            </p>
            <div className="about-why-authors">
              <span>— Hieng Dara, Van Meysorng, Chhea Muoyheang</span>
            </div>
            <FaQuoteRight className="about-quote-icon right" />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="about-founders-section">
        <div className="about-container">
          <h2 className="about-section-title">Meet the Founders</h2>
          <p className="about-section-subtitle">
            Three passionate individuals united by a mission to save lives
          </p>

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
                      href={founder.twitter}
                      className="about-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
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
                    {founder.role.map((line, index) => (
                      <p key={index} style={{ margin: 0 }}>
                        {line}
                      </p>
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

      {/* Core Values */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Core Values</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <FaClock />
              </div>
              <h3>Speed Saves Lives</h3>
              <p>
                Every second counts in stroke response. We optimize every
                interaction for urgency.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <FaHeart />
              </div>
              <h3>Family First</h3>
              <p>
                We build for families caring for loved ones, not just individual
                patients.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <FaShieldAlt />
              </div>
              <h3>Trust & Privacy</h3>
              <p>
                Your health data is sacred. We protect it with the highest
                standards.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <FaHandsHelping />
              </div>
              <h3>Accessible to All</h3>
              <p>
                Premium technology should be available to every Cambodian,
                regardless of location or income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
