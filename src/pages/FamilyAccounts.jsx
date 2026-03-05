import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserPlus,
  FaHeart,
  FaBrain,
  FaAmbulance,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaBell,
  FaChild,
  FaUserMd,
  FaMobileAlt,
  FaShieldAlt,
  FaChartLine,
  FaComments,
  FaVideo,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaLock,
  FaEye,
  FaHandsHelping,
  FaSmile,
  FaHeartbeat,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaQuestionCircle,
  FaGift,
  FaCreditCard,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUserFriends,
  FaHome,
  FaMedkit,
  FaPills,
  FaHospital,
} from "react-icons/fa";
import "../styles/FamilyAccounts.css";

// Import images (assuming they're in src/assets/family/)
import elderCouple from "../assets/profile/elders.png";
import testimonialDavid from "../assets/profile/child1.png";
import testimonialMaria from "../assets/profile/child2.png";
import testimonialJames from "../assets/profile/child3.png";

const FamilyAccounts = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Elder Care Focused Plans
  const plans = [
    {
      id: "basic",
      name: "Basic Monitoring",
      price: {
        monthly: 0,
        yearly: 0,
      },
      members: "Monitor 1 elder + 3 family members",
      description: "Essential monitoring for one aging parent",
      features: [
        { name: "Real-time health dashboard", included: true },
        { name: "Stroke risk alerts", included: true },
        { name: "Medication reminders", included: true },
        { name: "Daily check-in notifications", included: true },
        { name: "Blood pressure tracking", included: true },
        { name: "Emergency contact broadcast", included: true },
        { name: "FAST symptom checker", included: true },
        { name: "Email support", included: true },
        { name: "Video check-in calls", included: false },
        { name: "24/7 nurse hotline", included: false },
        { name: "Fall detection", included: false },
        { name: "GPS location tracking", included: false },
      ],
      recommended: false,
      color: "#6B7280",
      icon: <FaHeart />,
    },
    {
      id: "premium",
      name: "Premium Care",
      price: {
        monthly: 0.99,
        yearly: 9.86,
      },
      members: "Monitor 2 elders + 5 family members",
      description: "Complete peace of mind for multiple parents",
      features: [
        { name: "Everything in Basic", included: true },
        { name: "Monitor up to 2 elders", included: true },
        { name: "Video check-in calls", included: true },
        { name: "24/7 nurse hotline", included: true },
        { name: "Fall detection alerts", included: true },
        { name: "GPS location tracking", included: true },
        { name: "Medication adherence tracking", included: true },
        { name: "Weekly health reports to all family", included: true },
        { name: "Priority phone support", included: true },
        { name: "Doctor appointment reminders", included: true },
        { name: "Health data sharing with physicians", included: true },
        { name: "Emergency dispatch service", included: true },
      ],
      recommended: true,
      color: "#E63E4E",
      icon: <FaHeartbeat />,
    },
    {
      id: "elite",
      name: "Elite Protection",
      price: {
        monthly: 1.50,
        yearly: 14.94,
      },
      members: "Monitor 4 elders + 8 family members",
      description: "Maximum protection for extended family",
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Monitor up to 4 elders", included: true },
        { name: "24/7 dedicated care coordinator", included: true },
        { name: "Smart home integration", included: true },
        { name: "Wearable device included", included: true },
        { name: "Monthly wellness calls", included: true },
        { name: "Prescription delivery service", included: true },
        { name: "In-home safety assessment", included: true },
        { name: "Caregiver backup service", included: true },
        { name: "Medical record management", included: true },
        { name: "Insurance coordination", included: true },
        { name: "Legal document storage", included: true },
      ],
      recommended: false,
      color: "#10B981",
      icon: <FaShieldAlt />,
    },
  ];

  // Elder Care Features
  const elderCareFeatures = [
    {
      category: "Stroke Prevention",
      features: [
        "Daily blood pressure monitoring",
        "Stroke risk score calculation",
        "FAST symptom alerts to family",
        "Medication adherence tracking",
        "Appointment reminders",
        "Lifestyle recommendations",
      ],
      icon: <FaBrain />,
    },
    {
      category: "Emergency Response",
      features: [
        "One-tap 911 calling",
        "Automatic fall detection",
        "GPS location sharing",
        "Emergency contact broadcast",
        "Ambulance dispatch",
        "Hospital pre-notification",
      ],
      icon: <FaAmbulance />,
    },
    {
      category: "Family Monitoring",
      features: [
        "Real-time health dashboard",
        "Instant alerts for abnormal readings",
        "Missed medication notifications",
        "Check-in confirmations",
        "Video call check-ins",
        "Weekly health summaries",
      ],
      icon: <FaEye />,
    },
    {
      category: "Daily Living Support",
      features: [
        "Medication reminders",
        "Meal and hydration tracking",
        "Activity monitoring",
        "Sleep pattern analysis",
        "Social engagement tracking",
        "Mood and wellness checks",
      ],
      icon: <FaHeart />,
    },
  ];

  // Statistics
  const stats = [
    {
      value: "73%",
      label: "Stroke risk reduction with early detection",
      icon: <FaBrain />,
    },
    {
      value: "94%",
      label: "of families feel more connected",
      icon: <FaUsers />,
    },
    {
      value: "2min",
      label: "average emergency response time",
      icon: <FaClock />,
    },
  ];

  // Testimonials with real images
  const testimonials = [
    {
      name: "David Chen",
      role: "Son caring for father, 78",
      location: "San Jose, CA",
      image: testimonialDavid,
      quote:
        "Dad lives 3 hours away. When his blood pressure spiked last month, I got an alert immediately. Called him and he was feeling dizzy. Got him to the ER in time. Strokify saved his life.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Daughter monitoring mother",
      location: "Miami, FL",
      image: testimonialMaria,
      quote:
        "Mom forgets her blood thinners sometimes. Now I get a notification when she misses a dose. I can call and remind her. Her stroke risk has dropped significantly.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Caring for both parents",
      location: "Chicago, IL",
      image: testimonialJames,
      quote:
        "Both parents in their 80s with hypertension. The peace of mind knowing I can check on them anytime is priceless. The fall detection gave us early warning twice.",
      rating: 5,
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "How does Strokify help prevent strokes in elderly parents?",
      answer:
        "Our system monitors key indicators like blood pressure, heart rate, and medication adherence. When it detects concerning patterns, family members receive immediate alerts with specific recommendations, often catching issues before they become emergencies.",
    },
    {
      question: "What if my parent doesn't have a smartphone?",
      answer:
        "We offer simplified monitoring devices and wearables that work with any phone line. Family members can help set up and manage the account remotely.",
    },
    {
      question: "How fast are emergency alerts sent?",
      answer:
        "Alerts are sent instantly via SMS, push notification, and email to all designated family members. Our system also automatically calls 911 if a fall is detected with no response.",
    },
    {
      question: "Can multiple family members monitor the same parent?",
      answer:
        "Yes! You can add siblings, adult children, and even caregivers to the monitoring circle. Everyone gets the same real-time updates and can coordinate care.",
    },
    {
      question: "What happens if my parent misses medication?",
      answer:
        "You'll receive an alert within 30 minutes of the missed dose. You can then call them, or our system can automatically notify a backup caregiver.",
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="family-accounts-page">
      {/* Hero Section - Elder Care Focused */}
      <section className="family-hero">
        <div className="hero-content">
          <h1>
            Protect Your Aging Parents
          </h1>
          <p className="family-hero-subtitle">
            Monitor your elderly parents' health in real-time. Get instant
            alerts for stroke risks, falls, and missed medications. Be there
            even when you can't be.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary btn-large">
              Start Protecting <FaArrowRight />
            </Link>
            <Link to="#pricing" className="btn-secondary btn-large">
              View Care Plans
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-icon">{stat.icon}</span>
                <div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Hero Visual - Single Image */}
        <div className="hero-visual">
          <div className="family-tree-visual">
            <img
              src={elderCouple}
              alt="Happy elderly couple with family"
              className="hero-main-image"
            />
            <div className="alert-badge">
              <FaBell /> Real-time alerts
            </div>
          </div>
        </div>
      </section>

      {/* Elder Care Features */}
      <section className="features-overview">
        <div className="container">
          <h2>Complete Protection for Your Aging Parents</h2>
          <p className="section-subtitle">
            Everything you need to monitor and protect your loved ones
          </p>
          <div className="features-categories">
            {elderCareFeatures.map((category, idx) => (
              <div key={idx} className="category-card">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.category}</h3>
                </div>
                <ul className="feature-list">
                  {category.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheckCircle className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Elder Care Plans */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="pricing-header">
            <h2>Choose the Right Protection Plan</h2>
            <p>Affordable plans designed for monitoring aging parents</p>

            <div className="billing-toggle">
              <button
                className={`toggle-option ${billingCycle === "monthly" ? "active" : ""}`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`toggle-option ${billingCycle === "yearly" ? "active" : ""}`}
                onClick={() => setBillingCycle("yearly")}
              >
                Yearly <span className="save-badge">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.recommended ? "recommended" : ""}`}
                style={{ "--plan-color": plan.color }}
              >
                {plan.recommended && (
                  <div className="recommended-badge">Most Popular</div>
                )}

                <div className="card-header">
                  <div
                    className="plan-icon"
                    style={{
                      backgroundColor: `${plan.color}20`,
                      color: plan.color,
                    }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-price">
                  <span className="price">
                    {plan.price.monthly === 0
                      ? "Free"
                      : billingCycle === "monthly"
                        ? `$${plan.price.monthly}`
                        : `$${plan.price.yearly}`}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="period">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  )}
                </div>

                <div className="plan-members">
                  <FaUsers /> {plan.members}
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={feature.included ? "included" : "excluded"}
                    >
                      {feature.included ? (
                        <FaCheck className="feature-icon included" />
                      ) : (
                        <FaTimes className="feature-icon excluded" />
                      )}
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-actions">
                  <button
                    className={`select-plan-btn ${plan.recommended ? "primary" : "secondary"}`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {plan.price.monthly === 0 ? "Start Free" : "Select Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Risk-Free Guarantee */}
          <div className="guarantee-badge">
            <FaShieldAlt />
            <span>30-day risk-free trial. Cancel anytime.</span>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className="warning-signs">
        <div className="container">
          <h2>Stroke Warning Signs in Elderly Parents</h2>
          <p className="warning-subtitle">
            Know the FAST signs. Every minute counts.
          </p>
          <div className="warning-grid">
            <div className="warning-card">
              <span className="warning-letter">F</span>
              <h3>Face Drooping</h3>
              <p>Does one side of the face droop when they smile?</p>
            </div>
            <div className="warning-card">
              <span className="warning-letter">A</span>
              <h3>Arm Weakness</h3>
              <p>Is one arm weak or numb when raised?</p>
            </div>
            <div className="warning-card">
              <span className="warning-letter">S</span>
              <h3>Speech Difficulty</h3>
              <p>Is speech slurred or hard to understand?</p>
            </div>
            <div className="warning-card">
              <span className="warning-letter">T</span>
              <h3>Time to Act</h3>
              <p>Call 911 immediately if you see any signs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Stories from Adult Children */}
      <section className="testimonials-section">
        <div className="container">
          <h2>Stories from Families Like Yours</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <p className="testimonial-location">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="testimonial-text">"{testimonial.quote}"</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < testimonial.rating ? "star-filled" : "star-empty"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Questions About Monitoring Aging Parents</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>
                  <FaQuestionCircle className="faq-icon" />
                  {faq.question}
                </h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="family-cta">
        <div className="container">
          <h2>Give Yourself Peace of Mind Today</h2>
          <p>
            Join 50,000+ adult children who monitor their aging parents with
            Strokify
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary btn-large">
              Start Monitoring
            </Link>
            <Link to="/contact" className="btn-secondary btn-large">
              Talk to a Care Specialist
            </Link>
          </div>
          <p className="trial-note">
            <FaGift /> No credit card required for Basic plan
          </p>
        </div>
      </section>
    </div>
  );
};

export default FamilyAccounts;
