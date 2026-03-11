import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat, FaArrowRight, FaQuestionCircle,
  FaShieldAlt, FaUsers, FaStethoscope, FaSync,
  FaCheckCircle, FaExclamation, FaExclamationTriangle,
} from "react-icons/fa";
import "../styles/Home.css";

import logo from "../assets/img/phone_home.png";
import logo2 from "../assets/img/phone_home1.png";

const IPhoneRealistic = ({ src, alt, rotation = 25, scale = 1, delay = "0s" }) => {
  const isLeft = rotation > 0;

  const floatingStyle = {
    animation: `phoneFloat 5s ease-in-out infinite`,
    animationDelay: delay,
    perspective: "2000px",
    transformStyle: "preserve-3d",
  };

  const phoneStyle = {
    position: "relative",
    width: "clamp(130px, 36vw, 265px)",
    height: "clamp(270px, 75vw, 550px)",
    borderRadius: "clamp(24px, 6vw, 46px)",
    background: "#000",
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotation}deg) rotateX(2deg) scale(${scale})`,
    boxShadow: `
      ${isLeft ? "-1px" : "1px"} 0px 0px #adb5bd,
      ${isLeft ? "-2px" : "2px"} 0px 0px #f8f9fa,
      ${isLeft ? "-4px" : "4px"} 0px 0.5px 0px #ced4da,
      ${isLeft ? "-8px" : "8px"} 0px 2px 0px #6c757d,
      ${isLeft ? "-10px" : "10px"} 0px 3px 0px #343a40,
      ${isLeft ? "-30px" : "30px"} 40px 60px rgba(0,0,0,0.4)
    `,
    border: "0.5px solid rgba(255,255,255,0.2)",
  };

  return (
    <div style={floatingStyle}>
      <style>{`
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(-10px); }
          50%       { transform: translateY(-35px); }
        }
      `}</style>
      <div style={phoneStyle}>
        {/* SCREEN */}
        <div style={{
          position: "absolute",
          inset: "clamp(6px, 1.5vw, 11px)",
          background: "#000",
          borderRadius: "clamp(18px, 5vw, 36px)",
          overflow: "hidden",
          boxShadow: "inset 0 0 12px rgba(0,0,0,0.9)",
        }}>
          <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* DYNAMIC ISLAND */}
        <div style={{
          position: "absolute",
          top: "clamp(10px, 2.5vw, 22px)",
          left: "50%",
          transform: "translateX(-50%) translateZ(1px)",
          width: "clamp(50px, 12vw, 85px)",
          height: "clamp(14px, 3.5vw, 26px)",
          background: "#000",
          borderRadius: "14px",
          zIndex: 10,
        }} />

        {/* SIDE BUTTON */}
        <div style={{
          position: "absolute",
          top: "clamp(70px, 17vw, 135px)",
          [isLeft ? "left" : "right"]: "-4px",
          width: "4px",
          height: "clamp(25px, 6vw, 45px)",
          background: "linear-gradient(to bottom, #ced4da, #adb5bd)",
          borderRadius: "2px",
        }} />
      </div>
    </div>
  );
};

const Home = () => {
  const stats = [
    { value: "200+", label: "Users Testing",    icon: <FaUsers /> },
    { value: "5",    label: "Hospitals Engaged", icon: <FaShieldAlt /> },
  ];

  const riskLevels = [
    {
      level: "Low Risk", icon: <FaCheckCircle />, modifier: "home-page-risk-node--low",
      actions: ["Health Advisor recommendations", "LifeSync daily tasks", "Wellness tracking"],
    },
    {
      level: "Moderate Risk", icon: <FaExclamation />, modifier: "home-page-risk-node--moderate",
      actions: ["Share report with caregiver", "Schedule check-up", "Enhanced monitoring"],
    },
    {
      level: "High Risk", icon: <FaExclamationTriangle />, modifier: "home-page-risk-node--high",
      actions: ["F.A.S.T. stroke test", "Emergency guidance", "Call 911 immediately"],
    },
  ];

  const features = [
    {
      icon: <FaStethoscope />, title: "Symptom Detector",
      description: "AI-powered symptom analysis with 95% accuracy - get results in seconds",
      benefits: ["5-minute assessment", "3 risk categories", "Instant results"],
      link: "/symptom-detector",
    },
    {
      icon: <FaHeartbeat />, title: "Health Advisor",
      description: "Personalized wellness plans tailored to your unique health profile",
      benefits: ["Custom recommendations", "Progress tracking", "Expert guidelines"],
      link: "/health-advisor",
    },
    {
      icon: <FaSync />, title: "LifeSync",
      description: "Synchronize your health tasks, medications, and daily progress",
      benefits: ["Smart reminders", "Medication tracking", "Health metrics"],
      link: "/lifesync",
    },
  ];

  return (
    <div className="home-page">

      {/* ══════════════════════════════ HERO */}
      <section className="home-page-hero">

        {/* ORDER 2 mobile → LEFT column desktop */}
        <div className="home-page-hero-left">
          <div className="home-page-hero-content">
            <h1>Your Health Journey Starts Here</h1>
            <p className="home-page-hero-subtitle">
              Experience the future of healthcare with AI-powered symptom analysis
              and personalized wellness guidance.
            </p>
          </div>

          <div className="home-page-hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="home-page-hero-stat">
                <span className="home-page-stat-icon">{s.icon}</span>
                <div className="home-page-stat-info">
                  <span className="home-page-stat-value">{s.value}</span>
                  <span className="home-page-stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="home-page-hero-buttons">
            <Link to="/about" className="home-page-btn-secondary">
              <FaQuestionCircle /> About Us
            </Link>
            <Link to="/symptom-detector" className="home-page-btn-primary">
              Start Free Trial <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* ORDER 1 mobile → RIGHT column desktop */}
        <div className="hp-duo">
          <div className="hp-duo-back">
            <IPhoneRealistic src={logo} alt="Home screen" rotation={30} scale={0.95} delay="0s" />
          </div>
          <div className="hp-duo-front">
            <IPhoneRealistic src={logo2} alt="Dashboard" rotation={-22} scale={1} delay="0.6s" />
          </div>
        </div>

      </section>

      {/* ══════════════════════════════ FEATURES */}
      <section className="home-page-features">
        <div className="home-page-section-header">
          <h2>Comprehensive Health Solutions</h2>
          <p>Everything you need to manage your health journey in one platform</p>
        </div>
        <div className="home-page-features-grid">
          {features.map((f, i) => (
            <div key={i} className="home-page-feature-card">
              <div className="home-page-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
              <ul className="home-page-feature-benefits">
                {f.benefits.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <Link to={f.link} className="home-page-feature-link">Learn more <FaArrowRight /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════ RISK */}
      <section className="home-page-risk-section">
        <div className="home-page-section-header">
          <h2>Intelligent Risk Assessment</h2>
          <p>Our AI categorizes your results into 3 clear risk levels</p>
        </div>
        <div className="home-page-risk-flow">
          {riskLevels.map((risk, i) => (
            <React.Fragment key={i}>
              <div className={`home-page-risk-node ${risk.modifier}`}>
                <div className="home-page-risk-node-icon">{risk.icon}</div>
                <h4>{risk.level}</h4>
                <ul className="home-page-risk-actions">
                  {risk.actions.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
              {i < riskLevels.length - 1 &&
                <div className="home-page-flow-arrow"><FaArrowRight /></div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════ FAMILY */}
      <section className="home-page-family-section">
        <div className="home-page-family-preview">
          <div className="home-page-family-preview-icon"><FaUsers /></div>
          <div className="home-page-family-preview-content">
            <h4>Care for Your Whole Family</h4>
            <p>Children can create family accounts to monitor their elderly parents' health
              from anywhere in the world. Stay connected and catch potential health issues
              before they become emergencies.</p>
            <Link to="/family-accounts" className="home-page-family-link">
              Learn about family accounts <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA */}
      <section className="home-page-cta">
        <div className="home-page-cta-content">
          <h2>Ready to transform your health?</h2>
          <p>Join thousands of users who trust Strokify for their daily health needs</p>
          <div className="home-page-cta-buttons">
            <Link to="/symptom-detector" className="home-page-btn-primary home-page-btn-large">
              Get Started Today <FaArrowRight />
            </Link>
            <Link to="/about" className="home-page-btn-secondary home-page-btn-large">
              <FaQuestionCircle /> Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;