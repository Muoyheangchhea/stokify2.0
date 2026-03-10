import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat, FaArrowRight, FaQuestionCircle,
  FaShieldAlt, FaUsers, FaStethoscope, FaSync,
  FaCheckCircle, FaExclamation, FaExclamationTriangle,
} from "react-icons/fa";
import "../styles/Home.css";
import logo  from "../assets/img/phone_home.png";
import logo2 from "../assets/img/phone_home1.png";

/* ─────────────────────────────────────────────
   iPhone 17 Pro Max — SVG frame mockup
   Viewport: 393 × 852 (logical points)
   Corner radius: 55px
   Bezel: ~10px slim matte black
   Dynamic Island: pill 126×37 centred at y=17
───────────────────────────────────────────── */
const IPhone17Frame = ({ src, alt, flip = false }) => {
  const W = 393, H = 852, R = 55;
  const B = 10, SR = 48;

  return (
    <div className="hp-frame-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="hp-frame-svg"
      >
        <defs>
          {/* Simple clip path - no flip condition */}
          <clipPath id="screenClip">
            <rect
              x={B} y={B}
              width={W - B * 2} height={H - B * 2}
              rx={SR} ry={SR}
            />
          </clipPath>
        </defs>

        {/* Outer frame - simple dark gray */}
        <rect
          x="0" y="0" width={W} height={H} rx={R} ry={R}
          fill="#222222"
        />
        
        {/* Inner bezel - slightly lighter */}
        <rect
          x="2" y="2" width={W-4} height={H-4} rx={R-2} ry={R-2}
          fill="none"
          stroke="#333333"
          strokeWidth="4"
        />

        {/* Screen area - black background */}
        <rect
          x={B} y={B}
          width={W - B * 2} height={H - B * 2}
          rx={SR} ry={SR}
          fill="#000000"
        />

        {/* Screenshot - with flip transform applied here */}
        <image
          href={src}
          x={B} y={B}
          width={W - B * 2} height={H - B * 2}
          clipPath="url(#screenClip)"
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: flip ? "scaleX(-1)" : "none", transformOrigin: "center" }}
        />

        {/* Dynamic Island */}
        <rect
          x={(W - 126) / 2} y="17"
          width="126" height="37"
          rx="18.5" ry="18.5"
          fill="#0a0a0a"
        />

        {/* Camera and sensors in Dynamic Island */}
        <circle
          cx={(W - 126) / 2 + 35}
          cy="35.5"
          r="6"
          fill="#1a1a1a"
        />
        <circle
          cx={(W - 126) / 2 + 55}
          cy="35.5"
          r="4"
          fill="#333333"
        />

        {/* Side buttons - subtle */}
        <rect x="0" y="170" width="3" height="35" fill="#555555" />
        <rect x="0" y="235" width="3" height="65" fill="#555555" />
        <rect x="0" y="320" width="3" height="65" fill="#555555" />
        <rect x={W - 3} y="250" width="3" height="90" fill="#555555" />
        <rect x={W - 3} y="560" width="3" height="65" fill="#555555" />

        {/* Bottom bar (home indicator) */}
        <rect
          x={(W - 140) / 2} y={H - 22}
          width="140" height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    </div>
  );
};

const Home = () => {
  const stats = [
    { value: "200+", label: "Users Testing", icon: <FaUsers /> },
    { value: "5", label: "Hospitals Engaged", icon: <FaShieldAlt /> },
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
            {stats.map((stat, i) => (
              <div key={i} className="home-page-hero-stat">
                <span className="home-page-stat-icon">{stat.icon}</span>
                <div className="home-page-stat-info">
                  <span className="home-page-stat-value">{stat.value}</span>
                  <span className="home-page-stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple side-by-side phones */}
        <div className="hp-duo">
          <div className="hp-slot hp-slot--left">
            <IPhone17Frame src={logo} alt="Strokify Home" flip={false} />
          </div>
          <div className="hp-slot hp-slot--right">
            <IPhone17Frame src={logo2} alt="Strokify Health Dashboard" flip={true} />
          </div>
        </div>
      </section>

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
              {i < riskLevels.length - 1 && (
                <div className="home-page-flow-arrow"><FaArrowRight /></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="home-page-family-section">
        <div className="home-page-family-preview">
          <div className="home-page-family-preview-icon"><FaUsers /></div>
          <div className="home-page-family-preview-content">
            <h4>Care for Your Whole Family</h4>
            <p>
              Children can create family accounts to monitor their elderly parents' health
              from anywhere in the world. Stay connected and catch potential health issues
              before they become emergencies.
            </p>
            <Link to="/family-accounts" className="home-page-family-link">
              Learn about family accounts <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

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