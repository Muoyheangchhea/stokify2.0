import React, { useState } from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane,
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaClock, FaHeadset, FaUser, FaComment, FaCheck,
  FaExclamationCircle, FaTelegram, FaWhatsapp,
  FaBuilding, FaAmbulance, FaHeartbeat
} from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  // ---------- Form State ----------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  // ---------- Handle Input Change ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ---------- Validate Form ----------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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

    // Show submitting state
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Sending...'
    });

    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  // ---------- Contact Info Cards ----------
  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Emergency',
      details: ['911 (24/7 Emergency)', '+855 23 123 456'],
      description: 'For stroke emergencies, always call 911 first',
      color: '#DC2626',
      action: 'tel:911',
      buttonText: 'Call Emergency',
      emergency: true
    },
    {
      icon: <FaHeadset />,
      title: 'Support Line',
      details: ['+855 23 789 012', 'support@strokify.com'],
      description: '24/7 support for app questions',
      color: '#E63E4E',
      action: 'tel:+85523789012',
      buttonText: 'Call Support'
    },
    {
      icon: <FaBuilding />,
      title: 'Head Office',
      details: ['#123, Street 456', 'Phnom Penh, Cambodia'],
      description: 'Visit us during business hours',
      color: '#10B981',
      action: 'https://maps.google.com',
      buttonText: 'Get Directions'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Partner With Us',
      details: ['partners@strokify.com', 'Hospitals & Nurses'],
      description: 'Become a stroke care partner',
      color: '#F59E0B',
      action: 'mailto:partners@strokify.com',
      buttonText: 'Partner Inquiry'
    }
  ];

  // ---------- Social Media Links ----------
  const socialLinks = [
    { icon: <FaFacebook />, name: 'Facebook', url: 'https://facebook.com/strokify', color: '#1877F2' },
    { icon: <FaTwitter />, name: 'Twitter', url: 'https://twitter.com/strokify', color: '#1DA1F2' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://instagram.com/strokify', color: '#E4405F' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com/company/strokify', color: '#0A66C2' },
    { icon: <FaTelegram />, name: 'Telegram', url: 'https://t.me/strokify', color: '#26A5E4' },
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: 'https://wa.me/85523123456', color: '#25D366' }
  ];

  // ---------- Office Hours ----------
  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed (Emergency only)' },
    { day: 'Emergency Hotline', hours: '24/7 - 365 days' }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in <span className="gradient-text">Touch</span></h1>
          <p className="hero-subtitle">
            We're here to help. Whether you have questions about stroke symptoms, 
            need support with the app, or want to partner with us.
          </p>
        </div>
      </section>

      {/* Emergency Notice - Always visible */}
      <div className="emergency-notice">
        <FaAmbulance className="emergency-icon" />
        <div className="emergency-text">
          <strong>Stroke Emergency?</strong>
          <span>Do not use this form. Call 911 immediately.</span>
        </div>
        <a href="tel:911" className="emergency-button">
          <FaPhone /> CALL 911 NOW
        </a>
      </div>

      {/* Contact Info Cards */}
      <section className="contact-cards-section">
        <div className="container">
          <div className="cards-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <div className="card-icon" style={{ backgroundColor: `${info.color}15`, color: info.color }}>
                  {info.icon}
                </div>
                <h3 className="card-title">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="card-detail">{detail}</p>
                ))}
                <p className="card-description">{info.description}</p>
                <a 
                  href={info.action} 
                  className={`card-button ${info.emergency ? 'emergency' : ''}`}
                  style={{ backgroundColor: info.color }}
                >
                  {info.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section - Form + Info */}
      <section className="main-contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column - Contact Form */}
            <div className="contact-form-container">
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {/* Success Message */}
              {formStatus.success && (
                <div className="success-message">
                  <FaCheck className="success-icon" />
                  <span>{formStatus.message}</span>
                </div>
              )}

              {/* Error Message */}
              {Object.keys(errors).length > 0 && (
                <div className="error-message">
                  <FaExclamationCircle className="error-icon" />
                  <span>Please fix the errors below.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Name Field */}
                <div className="form-group">
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
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className="form-group">
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
                    className={errors.email ? 'error' : ''}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Phone Field (Optional) */}
                <div className="form-group">
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

                {/* Inquiry Type */}
                <div className="form-group">
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

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                </div>

                {/* Message Field */}
                <div className="form-group full-width">
                  <label htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={formStatus.submitted}
                >
                  {formStatus.submitted ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>

                <p className="form-note">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>

            {/* Right Column - Additional Info */}
            <div className="contact-info-container">
              {/* Office Hours */}
              <div className="info-card hours-card">
                <h3>
                  <FaClock className="info-icon" />
                  Office Hours
                </h3>
                <div className="hours-list">
                  {officeHours.map((item, index) => (
                    <div key={index} className="hours-item">
                      <span className="day">{item.day}</span>
                      <span className="hours">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="timezone-note">
                  * All times are in Indochina Time (ICT, GMT+7)
                </p>
              </div>

              {/* Quick Response */}
              <div className="info-card response-card">
                <h3>
                  <FaHeadset className="info-icon" />
                  Quick Response
                </h3>
                <div className="response-times">
                  <div className="response-item">
                    <span className="response-channel">Email</span>
                    <span className="response-time">within 24 hours</span>
                  </div>
                  <div className="response-item">
                    <span className="response-channel">Phone</span>
                    <span className="response-time">during business hours</span>
                  </div>
                  <div className="response-item">
                    <span className="response-channel">Emergency</span>
                    <span className="response-time emergency">IMMEDIATE - CALL 911</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="info-card social-card">
                <h3>
                  Connect With Us
                </h3>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ '--social-color': social.color }}
                    >
                      {social.icon}
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Preview */}
              <div className="info-card map-card">
                <h3>
                  <FaMapMarkerAlt className="info-icon" />
                  Find Us
                </h3>
                <div className="map-preview">
                  <div className="map-placeholder">
                    <FaMapMarkerAlt className="map-marker" />
                    <p>Strokify Headquarters</p>
                    <p className="map-address">#123, Street 456, Phnom Penh, Cambodia</p>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="faq-preview">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Is Strokify free to use?</h4>
              <p>Yes! Strokify is completely free for all users in Cambodia. Our mission is to make stroke detection accessible to everyone.</p>
            </div>
            <div className="faq-item">
              <h4>How accurate is the symptom detector?</h4>
              <p>Our AI model has 95% accuracy in detecting potential stroke symptoms based on clinical data and research.</p>
            </div>
            <div className="faq-item">
              <h4>Can I use Strokify for my elderly parents?</h4>
              <p>Absolutely! You can create family accounts to monitor your parents' health from anywhere.</p>
            </div>
            <div className="faq-item">
              <h4>How do I become a partner nurse?</h4>
              <p>Contact us through the partnership inquiry form above, and our team will reach out with details.</p>
            </div>
          </div>
          <div className="faq-more">
            <a href="/faq" className="faq-link">View all FAQs →</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;