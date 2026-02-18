import React, { useState } from 'react';
import { 
  FaUserNurse, FaPhone, FaVideo, FaMapMarkerAlt, FaStar,
  FaSearch, FaClock, FaHeartbeat, FaAmbulance, 
  FaExclamationTriangle, FaEnvelope, FaComments, FaArrowRight,
  FaCheck, FaAward, FaBriefcase, FaCertificate, FaFilter,
  FaUserMd, FaClinicMedical, FaLanguage, FaShieldAlt,
  FaPlay, FaPlayCircle
} from 'react-icons/fa';
import '../styles/LifeSync.css';

const LifeSync = () => {
  const [mode, setMode] = useState('nurses');
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [playingVideo, setPlayingVideo] = useState(null);

  const nurses = [
    {
      id: 1,
      name: 'Maria Garcia',
      title: 'Registered Nurse',
      specialty: 'Stroke Recovery Specialist',
      experience: '12 years',
      hospital: 'City Home Health',
      rating: 4.9,
      totalReviews: 17,
      phone: '+1 (555) 123-4567',
      email: 'maria.garcia@strokify.com',
      distance: '2.3 miles',
      available: true,
      shifts: ['6hr', '12hr'],
      hourlyRate: 45,
      image: '👩‍⚕️',
      videoThumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Spanish'],
      certifications: ['Stroke Certified', 'Neuro Rehab'],
      description: 'Specialized in post-stroke rehabilitation with 12 years of hospital experience. Compassionate care focused on recovery and independence.',
      badges: ['Super Nurse', 'Stroke Specialist'],
      bookedRecently: true,
      responseTime: '< 1 hour'
    },
    {
      id: 2,
      name: 'Robert Kim',
      title: 'Licensed Practical Nurse',
      specialty: 'Post-Stroke Care',
      experience: '8 years',
      hospital: 'Home Care Solutions',
      rating: 4.8,
      totalReviews: 12,
      phone: '+1 (555) 234-5678',
      email: 'robert.kim@strokify.com',
      distance: '1.5 miles',
      available: true,
      shifts: ['6hr', '12hr'],
      hourlyRate: 38,
      image: '👨‍⚕️',
      videoThumbnail: 'https://images.unsplash.com/photo-1622253692010-692f2a529c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Korean'],
      certifications: ['Medication Management', 'Daily Living Support'],
      description: 'Specializes in daily activities, medication management, and gentle rehabilitation exercises for stroke patients.',
      badges: ['Medication Expert'],
      bookedRecently: false,
      responseTime: '< 2 hours'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      title: 'Registered Nurse',
      specialty: 'Neuro Critical Care',
      experience: '15 years',
      hospital: 'Advanced Home Health',
      rating: 4.9,
      totalReviews: 28,
      phone: '+1 (555) 345-6789',
      email: 'sarah.johnson@strokify.com',
      distance: '3.2 miles',
      available: false,
      shifts: ['12hr'],
      hourlyRate: 52,
      image: '👩‍⚕️',
      videoThumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed117bb79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      languages: ['English'],
      certifications: ['Critical Care', 'Stroke Specialist'],
      description: 'Critical care nurse with 15 years of ICU experience. Now providing specialized in-home care for stroke recovery patients.',
      badges: ['Super Nurse', 'Critical Care'],
      bookedRecently: true,
      responseTime: '< 30 mins'
    },
    {
      id: 4,
      name: 'James Wilson',
      title: 'Certified Nursing Assistant',
      specialty: 'Daily Living Support',
      experience: '5 years',
      hospital: 'Compassionate Care',
      rating: 4.7,
      totalReviews: 9,
      phone: '+1 (555) 456-7890',
      email: 'james.wilson@strokify.com',
      distance: '4.1 miles',
      available: true,
      shifts: ['6hr', '12hr'],
      hourlyRate: 28,
      image: '👨‍⚕️',
      videoThumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      languages: ['English'],
      certifications: ['CNA', 'First Aid'],
      description: 'Compassionate CNA specializing in daily living support for stroke patients. Helping with mobility, bathing, meals, and companionship.',
      badges: [],
      bookedRecently: false,
      responseTime: '< 3 hours'
    },
    {
      id: 5,
      name: 'Linda Chen',
      title: 'Registered Nurse',
      specialty: 'Rehabilitation Nursing',
      experience: '10 years',
      hospital: 'Elite Home Care',
      rating: 4.8,
      totalReviews: 22,
      phone: '+1 (555) 567-8901',
      email: 'linda.chen@strokify.com',
      distance: '2.8 miles',
      available: true,
      shifts: ['6hr', '12hr'],
      hourlyRate: 48,
      image: '👩‍⚕️',
      videoThumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      languages: ['English', 'Mandarin'],
      certifications: ['Rehab Nursing', 'Stroke Rehab'],
      description: 'Rehabilitation nurse helping stroke patients regain mobility and independence through personalized care plans.',
      badges: ['Rehab Expert'],
      bookedRecently: true,
      responseTime: '< 1 hour'
    }
  ];

  const emergencyContacts = [
    { name: 'Stroke Emergency', number: '911', icon: <FaAmbulance />, color: '#DC2626' },
    { name: 'Stroke Nurse Hotline', number: '1-888-4-STROKE', icon: <FaHeartbeat />, color: '#E63E4E' }
  ];

  const handlePlayVideo = (nurseId) => {
    setPlayingVideo(nurseId);
    // In real implementation, this would open a video modal
    console.log(`Playing video for nurse ${nurseId}`);
  };

  // Filter nurses
  const filteredNurses = nurses.filter(nurse => {
    const matchesSearch = nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nurse.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nurse.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesShift = shiftFilter === 'all' || nurse.shifts.includes(shiftFilter);
    const matchesAvailability = shiftFilter !== 'available' || nurse.available;
    
    return matchesSearch && matchesShift && matchesAvailability;
  });

  return (
    <div className="life-sync">
      {/* Header */}
      <div className="ls-header">
        <div className="header-top">
          <h1>
            <FaUserNurse className="title-icon" />
            Stroke Care Nurses
          </h1>
          <div className="header-stats">
            <span className="stat-badge">
              <FaUserNurse /> {filteredNurses.length} Available
            </span>
            <span className="stat-badge">
              <FaHeartbeat /> 24/7 Support
            </span>
          </div>
        </div>
        <p className="header-subtitle">
          Find experienced nurses for 6hr or 12hr in-home stroke care
        </p>
      </div>

      {/* Emergency Strip */}
      <div className="emergency-strip">
        <FaExclamationTriangle className="strip-icon" />
        <span>Stroke emergency? </span>
        <button className="strip-link" onClick={() => setMode('emergency')}>
          Switch to Emergency Mode
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button 
          className={`toggle-btn ${mode === 'nurses' ? 'active' : ''}`}
          onClick={() => setMode('nurses')}
        >
          <FaUserNurse /> Find Nurses
        </button>
        <button 
          className={`toggle-btn emergency ${mode === 'emergency' ? 'active' : ''}`}
          onClick={() => setMode('emergency')}
        >
          <FaAmbulance /> Emergency
        </button>
      </div>

      {/* Emergency Mode */}
      {mode === 'emergency' && (
        <div className="emergency-panel">
          <div className="emergency-icon-large">
            <FaExclamationTriangle />
          </div>
          <h2>STROKE EMERGENCY?</h2>
          <p>Call 911 immediately. Every minute counts.</p>
          <a href="tel:911" className="emergency-call-btn">
            <FaPhone /> CALL 911 NOW
          </a>
          <div className="emergency-contacts">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-contact">
                <div className="contact-icon" style={{ color: contact.color }}>
                  {contact.icon}
                </div>
                <div>
                  <div className="contact-name">{contact.name}</div>
                  <a href={`tel:${contact.number}`} className="contact-number">
                    {contact.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className="back-to-nurses" onClick={() => setMode('nurses')}>
            ← Back to Nurse Directory
          </button>
        </div>
      )}

      {/* Nurses Mode */}
      {mode === 'nurses' && (
        <div className="nurses-panel">
          {/* Search and Filter */}
          <div className="search-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-tabs">
              <button 
                className={`filter-tab ${shiftFilter === 'all' ? 'active' : ''}`}
                onClick={() => setShiftFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-tab ${shiftFilter === '6hr' ? 'active' : ''}`}
                onClick={() => setShiftFilter('6hr')}
              >
                6hr Shifts
              </button>
              <button 
                className={`filter-tab ${shiftFilter === '12hr' ? 'active' : ''}`}
                onClick={() => setShiftFilter('12hr')}
              >
                12hr Shifts
              </button>
              <button 
                className={`filter-tab ${shiftFilter === 'available' ? 'active' : ''}`}
                onClick={() => setShiftFilter('available')}
              >
                Available Now
              </button>
            </div>
          </div>

          {/* Nurse Cards - With Video Placeholders */}
          <div className="nurse-list">
            {filteredNurses.map(nurse => (
              <div key={nurse.id} className="nurse-card">
                {/* Left Column - Video Thumbnail */}
                <div className="card-video">
                  <div className="video-thumbnail">
                    <img src={nurse.videoThumbnail} alt={nurse.name} />
                    <button 
                      className="play-button"
                      onClick={() => handlePlayVideo(nurse.id)}
                    >
                      <FaPlay />
                    </button>
                    {playingVideo === nurse.id && (
                      <div className="video-indicator">
                        <span className="pulse-dot"></span>
                        Playing...
                      </div>
                    )}
                  </div>
                  
                  <div className="badge-container">
                    {nurse.badges.includes('Super Nurse') && (
                      <div className="badge super-badge">
                        <FaAward /> Super Nurse
                      </div>
                    )}
                    
                    {nurse.bookedRecently && (
                      <div className="badge popular-badge">
                        Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Column - Main Info */}
                <div className="card-middle">
                  <div className="nurse-header">
                    <h3 className="nurse-name">{nurse.name}</h3>
                    <span className="response-time">{nurse.responseTime}</span>
                  </div>
                  
                  <div className="nurse-title">
                    {nurse.title} · {nurse.specialty}
                  </div>
                  
                  <div className="certifications">
                    {nurse.certifications.map((cert, i) => (
                      <span key={i} className="cert-tag">
                        <FaCertificate /> {cert}
                      </span>
                    ))}
                  </div>
                  
                  <p className="nurse-description">{nurse.description}</p>
                  
                  <div className="details-row">
                    <span className="detail-item">
                      <FaBriefcase /> {nurse.experience}
                    </span>
                    <span className="detail-item">
                      <FaClinicMedical /> {nurse.hospital}
                    </span>
                    <span className="detail-item">
                      <FaMapMarkerAlt /> {nurse.distance}
                    </span>
                  </div>
                  
                  <div className="shifts">
                    {nurse.shifts.map(shift => (
                      <span key={shift} className="shift-tag">{shift}</span>
                    ))}
                  </div>

                  <div className="languages">
                    {nurse.languages.map((lang, i) => (
                      <span key={i} className="language-tag">{lang}</span>
                    ))}
                  </div>
                </div>

                {/* Right Column - Pricing & Actions */}
                <div className="card-right">
                  <div className="price-section">
                    <span className="price">${nurse.hourlyRate}</span>
                    <span className="price-unit">/hour</span>
                  </div>
                  
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(nurse.rating) ? 'star-filled' : 'star-empty'} 
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      {nurse.rating} ({nurse.totalReviews} reviews)
                    </span>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="book-btn">Book Consultation</button>
                    <button className="message-btn">
                      <FaComments /> Message
                    </button>
                  </div>
                  
                  <div className="contact-row">
                    <a href={`tel:${nurse.phone}`} className="contact-link">
                      <FaPhone />
                    </a>
                    <a href={`mailto:${nurse.email}`} className="contact-link">
                      <FaEnvelope />
                    </a>
                  </div>
                  
                  <a href="#" className="view-profile">
                    View full profile <FaArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredNurses.length === 0 && (
            <div className="no-results">
              <p>No nurses match your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeSync;