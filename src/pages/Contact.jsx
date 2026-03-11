import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaClock,
  FaHeadset,
  FaUser,
  FaComment,
  FaCheck,
  FaExclamationCircle,
  FaTelegram,
  FaWhatsapp,
  FaBuilding,
  FaAmbulance,
  FaHeartbeat,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  // ---------- Form State ----------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const [errors, setErrors] = useState({});

  // ---------- Handle Input Change ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ---------- Validate Form ----------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // ---------- Handle Submit ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormStatus({
      submitted: true,
      success: false,
      message: "Sending...",
    });

    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: true,
        message: "Message sent successfully! We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });

      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  // ---------- Contact Info Cards - Two rows ----------
  const contactInfo = [
    {
      type: "emergency",
      icon: <FaAmbulance />,
      title: "Emergency",
      details: [
        { type: "phone", value: "119 (24/7 Emergency)", emergency: true },
        { type: "phone", value: "+855 92 404 966" }
      ],
      description: "For stroke emergencies, always call 119 first",
      action: "tel:119",
      buttonText: "Call Emergency",
    },
    {
      type: "support",
      icon: <FaHeadset />,
      title: "Support Line",
      details: [
        { type: "phone", value: "+855 77 847 664" },
        { type: "email", value: "strokifyteam@gmail.com" }
      ],
      description: "24/7 support for app questions",
      action: "tel:+85577847664",
      buttonText: "Call Support",
    },
    {
      type: "office",
      icon: <FaBuilding />,
      title: "Head Office",
      details: [
        { type: "address", lines: [
          "#278H, Street 201R, Kroalkor Village",
          "Sangkat Kilometer 6, Khan Russey Keo",
          "Phnom Penh, Cambodia"
        ]}
      ],
      description: "Visit us during business hours",
      action: "https://maps.app.goo.gl/fnsM578rUJWWpPtf9",
      buttonText: "Get Directions",
    },
    {
      type: "partner",
      icon: <FaHeartbeat />,
      title: "Partner With Us",
      details: [
        { type: "email", value: "strokifyteam@gmail.com" },
        { type: "text", value: "Hospitals & Nurses" }
      ],
      description: "Become a stroke care partner",
      action: "mailto:strokifyteam@gmail.com",
      buttonText: "Partner Inquiry",
    },
  ];

  // ---------- Social Media Links ----------
  const socialLinks = [
    {
      icon: <FaFacebook />,
      name: "Facebook",
      url: "https://www.facebook.com/p/Strokify-61578646031075/",
      color: "#1877F2",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com/strokify",
      color: "#1DA1F2",
    },
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "https://www.instagram.com/ur.strokifyy/",
      color: "#E4405F",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com/company/strokify",
      color: "#0A66C2",
    },
    {
      icon: <FaTelegram />,
      name: "Telegram",
      url: "https://t.me/strokify",
      color: "#26A5E4",
    },
    {
      icon: <FaWhatsapp />,
      name: "WhatsApp",
      url: "https://wa.me/85592404966",
      color: "#25D366",
    },
  ];

  // ---------- Office Hours ----------
  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed (Emergency only)" },
    { day: "Emergency Hotline", hours: "24/7" },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section - BG now goes to top */}
      <section className="contact-hero-section">
        <div className="contact-hero-content">
          
          <h1>
            Get in <span className="contact-gradient-text">Touch</span>
          </h1>
          
          <p className="contact-hero-subtitle">
            We're here to help with stroke symptoms, app support, or partnerships.
          </p>
          
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-section-header">
            <h2>Send Us a Message</h2>
            <p className="contact-section-subtitle">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="contact-main-grid">
            {/* Left Column - Contact Form */}
            <div className="contact-form-wrapper">
              {formStatus.success && (
                <div className="contact-success-message">
                  <FaCheck className="success-icon" />
                  <span>{formStatus.message}</span>
                </div>
              )}

              {Object.keys(errors).length > 0 && (
                <div className="contact-error-message">
                  <FaExclamationCircle className="error-icon" />
                  <span>Please fix the errors below.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-group">
                  <label htmlFor="name">
                    <FaUser className="field-icon" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="contact-form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="field-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="contact-form-group">
                  <label htmlFor="phone">
                    <FaPhone className="field-icon" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="inquiryType">
                    <FaComment className="field-icon" />
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="general">General Question</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="nurse">Nurse/Caregiver Application</option>
                    <option value="hospital">Hospital Partnership</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                </div>

                <div className="contact-form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button type="submit" className="contact-submit-btn" disabled={formStatus.submitted}>
                  {formStatus.submitted ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>

                <p className="contact-form-note">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>

            {/* Right Column - Info Cards */}
            <div className="contact-info-sidebar">
              {/* Office Hours Card */}
              <div className="contact-info-card-modern">
                <div className="contact-card-header">
                  <FaClock className="contact-header-icon" />
                  <h3>Office Hours</h3>
                </div>
                <div className="contact-hours-list">
                  {officeHours.map((item, index) => (
                    <div key={index} className="contact-hours-item">
                      <span className="contact-day">{item.day}</span>
                      <span className="contact-hours">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="contact-timezone-note">* Indochina Time (ICT, GMT+7)</p>
              </div>

              {/* Quick Response Card - With right-aligned emergency */}
              <div className="contact-info-card-modern">
                <div className="contact-card-header">
                  <FaHeadset className="contact-header-icon" />
                  <h3>Quick Response</h3>
                </div>
                <div className="contact-response-list">
                  <div className="contact-response-item">
                    <span className="response-channel">Email</span>
                    <span className="response-time">within 24h</span>
                  </div>
                  <div className="contact-response-item">
                    <span className="response-channel">Phone</span>
                    <span className="response-time">business hours</span>
                  </div>
                  <div className="contact-response-item emergency">
                    <span className="response-channel">Emergency</span>
                    <span className="response-time emergency-text">
                      CALL 119
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="contact-info-card-modern">
                <div className="contact-card-header">
                  <h3>Connect With Us</h3>
                </div>
                <div className="contact-social-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      style={{ 
                        background: `linear-gradient(135deg, ${social.color}15 0%, ${social.color}05 100%)`,
                        color: social.color,
                        borderColor: `${social.color}25`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, ${social.color}15 0%, ${social.color}05 100%)`;
                        e.currentTarget.style.color = social.color;
                      }}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Card */}
              <div className="contact-info-card-modern map-card">
                <div className="contact-card-header">
                  <FaMapMarkerAlt className="contact-header-icon" />
                  <h3>Find Us</h3>
                </div>
                <div className="contact-map-wrapper">
                  <iframe
                    title="Strokify Location"
                    width="100%"
                    height="180"
                    style={{ border: 0, borderRadius: "14px" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=278H+Street+201R+Kroalkor+Village+Sangkat+Kilometer+6+Russey+Keo+Phnom+Penh+Cambodia&output=embed"
                  ></iframe>
                </div>
                <a
                  href="https://maps.app.goo.gl/1oiGNFfzgCzNC3xV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-link"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - Now in two rows */}
      <section className="contact-cards-section">
        <div className="contact-container">
          <div className="contact-cards-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card" data-type={info.type}>
                <div className="contact-card-icon-wrapper">
                  {info.icon}
                </div>
                <h3 className="contact-card-title">{info.title}</h3>
                <div className="contact-card-details">
                  {info.details.map((detail, i) => {
                    if (detail.type === "address") {
                      return (
                        <div key={i} className="contact-card-address">
                          {detail.lines.map((line, j) => (
                            <span key={j} className="contact-card-address-line">{line}</span>
                          ))}
                        </div>
                      );
                    } else if (detail.type === "email") {
                      return (
                        <div key={i} className="contact-card-detail">
                          <FaEnvelope />
                          <a href={`mailto:${detail.value}`} className="contact-card-email">
                            {detail.value}
                          </a>
                        </div>
                      );
                    } else if (detail.type === "phone") {
                      return (
                        <div key={i} className="contact-card-detail">
                          <FaPhone />
                          <span className={`contact-card-phone ${detail.emergency ? 'emergency-phone' : ''}`}>
                            {detail.value}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} className="contact-card-detail">
                          <span>{detail.value}</span>
                        </div>
                      );
                    }
                  })}
                </div>
                <p className="contact-card-description">{info.description}</p>
                <a href={info.action} className="contact-card-button">
                  {info.buttonText} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section">
        <div className="contact-container">
          <div className="contact-section-header">
            <h2>Frequently Asked Questions</h2>
            <p className="contact-section-subtitle">
              Quick answers to common questions
            </p>
          </div>

          <div className="contact-faq-grid">
            <div className="contact-faq-card">
              <h4>Is Strokify free?</h4>
              <p>Yes! Completely free for all users in Cambodia.</p>
            </div>
            <div className="contact-faq-card">
              <h4>How accurate is it?</h4>
              <p>95% accuracy in detecting potential stroke symptoms.</p>
            </div>
            <div className="contact-faq-card">
              <h4>For elderly parents?</h4>
              <p>Yes, create family accounts to monitor from anywhere.</p>
            </div>
            <div className="contact-faq-card">
              <h4>Become a partner?</h4>
              <p>Use the partnership form above and we'll contact you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;