import React, { useState, useEffect } from 'react';
import { 
  FaUserNurse, FaPhone, FaVideo, FaMapMarkerAlt, FaStar,
  FaSearch, FaClock, FaHeartbeat, FaAmbulance, 
  FaExclamationTriangle, FaEnvelope, FaComments, FaArrowRight,
  FaAward, FaBriefcase, FaCertificate, FaCheck,
  FaPlay, FaChevronRight, FaFilter, FaTimes
} from 'react-icons/fa';
import '../styles/LifeSync.css';

// Import the JSON data
import nurseData from '../data/nurses.json';

const LifeSync = () => {
  const [mode, setMode] = useState('nurses');
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('recommended');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize nurses from JSON
  const [allNurses] = useState(nurseData.nurses);
  const [filteredNurses, setFilteredNurses] = useState(nurseData.nurses);
  const [metadata] = useState(nurseData.metadata);

  // Get unique specialties for filter dropdown
  const specialties = [...new Set(allNurses.flatMap(nurse => nurse.specialties))];

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...allNurses];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(nurse =>
        nurse.name.toLowerCase().includes(term) ||
        nurse.specialty.toLowerCase().includes(term) ||
        nurse.specialties.some(s => s.toLowerCase().includes(term)) ||
        nurse.description.toLowerCase().includes(term) ||
        nurse.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Shift filter
    if (shiftFilter !== 'all') {
      filtered = filtered.filter(nurse =>
        nurse.shifts.some(shift => shift.type === shiftFilter && shift.available)
      );
    }

    // Specialty filter
    if (specialtyFilter !== 'all') {
      filtered = filtered.filter(nurse =>
        nurse.specialties.includes(specialtyFilter)
      );
    }

    // Availability filter
    if (availabilityFilter) {
      filtered = filtered.filter(nurse => nurse.availability.availableNow);
    }

    // Price range filter
    filtered = filtered.filter(nurse =>
      nurse.pricing.hourlyRate >= priceRange.min &&
      nurse.pricing.hourlyRate <= priceRange.max
    );

    // Sorting
    switch(sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricing.hourlyRate - b.pricing.hourlyRate);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricing.hourlyRate - a.pricing.hourlyRate);
        break;
      case 'experience':
        filtered.sort((a, b) => b.experience.years - a.experience.years);
        break;
      case 'distance':
        filtered.sort((a, b) => a.location.distance - b.location.distance);
        break;
      default:
        // Recommended - keep original order but boost popular/bookedRecently
        filtered.sort((a, b) => {
          if (a.features.bookedRecently && !b.features.bookedRecently) return -1;
          if (!a.features.bookedRecently && b.features.bookedRecently) return 1;
          return b.rating.average - a.rating.average;
        });
    }

    setFilteredNurses(filtered);
  }, [searchTerm, shiftFilter, specialtyFilter, availabilityFilter, priceRange, sortBy, allNurses]);

  const emergencyContacts = [
    { name: 'Emergency', number: '911', icon: <FaAmbulance />, color: '#DC2626' },
    { name: 'Stroke Helpline', number: '1-888-4-STROKE', icon: <FaHeartbeat />, color: '#E63E4E' }
  ];

  const handlePlayVideo = (nurseId) => {
    setPlayingVideo(nurseId);
    setTimeout(() => setPlayingVideo(null), 3000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setShiftFilter('all');
    setSpecialtyFilter('all');
    setAvailabilityFilter(false);
    setPriceRange({ min: 0, max: 100 });
    setSortBy('recommended');
  };

  // Get unique shift types for filter
  const shiftTypes = ['all', ...new Set(allNurses.flatMap(nurse => nurse.shifts.map(s => s.type)))];

  return (
    <div className="life-sync">
      {/* Header */}
      <div className="ls-header">
        <div className="header-top">
          <h1>
            Stroke Care Nurses
          </h1>
          <div className="header-stats">
            <span className="stat-badge">
              <FaUserNurse /> {filteredNurses.length} Available
            </span>
            <span className="stat-badge">
              <FaHeartbeat /> 24/7
            </span>
          </div>
        </div>
        <p className="header-subtitle">
          Find experienced nurses for in-home stroke care
        </p>
      </div>

      {/* Emergency Banner */}
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
          <h2>Stroke Emergency?</h2>
          <p>Call 911 immediately. Every minute counts.</p>
          <a href="tel:911" className="emergency-call-btn">
            <FaPhone /> CALL 911
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
        <>
          {/* Search and Filter Bar */}
          <div className="search-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, specialty, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter /> Filters
              </button>
            </div>

            {/* Quick Filter Tabs */}
            <div className="filter-tabs">
              {shiftTypes.map(shift => (
                <button 
                  key={shift}
                  className={`filter-tab ${shiftFilter === shift ? 'active' : ''}`}
                  onClick={() => setShiftFilter(shift)}
                >
                  {shift === 'all' ? 'All Shifts' : shift}
                </button>
              ))}
              <button 
                className={`filter-tab ${availabilityFilter ? 'active' : ''}`}
                onClick={() => setAvailabilityFilter(!availabilityFilter)}
              >
                Available Now
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="advanced-filters">
                <div className="filter-header">
                  <h3>Advanced Filters</h3>
                  <button onClick={clearFilters} className="clear-filters">
                    <FaTimes /> Clear All
                  </button>
                </div>
                
                <div className="filter-grid">
                  <div className="filter-group">
                    <label>Specialty</label>
                    <select 
                      value={specialtyFilter}
                      onChange={(e) => setSpecialtyFilter(e.target.value)}
                    >
                      <option value="all">All Specialties</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Sort By</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="experience">Most Experienced</option>
                      <option value="distance">Nearest</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Price Range (per hour)</label>
                    <div className="price-range">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      />
                      <div className="price-values">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="results-count">
            <p>{filteredNurses.length} nurses found</p>
          </div>

          {/* Nurse Cards */}
          <div className="nurse-list">
            {filteredNurses.map(nurse => (
              <div key={nurse.id} className="nurse-card">
                {/* Video Column */}
                <div className="card-video">
                  <div className="video-thumbnail">
                    <img src={nurse.media.videoThumbnail} alt={nurse.name} />
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
                      <span className="badge super-badge">
                        <FaAward /> Super Nurse
                      </span>
                    )}
                    {nurse.features.bookedRecently && (
                      <span className="badge popular-badge">
                        <FaCheck /> Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Info */}
                <div className="card-middle">
                  <div className="nurse-header">
                    <h3 className="nurse-name">{nurse.name}</h3>
                    <span className="response-time">{nurse.features.responseTime}</span>
                  </div>
                  
                  <div className="nurse-title">
                    {nurse.title} · {nurse.specialty}
                  </div>
                  
                  <div className="certifications">
                    {nurse.certifications.slice(0, 2).map((cert, i) => (
                      <span key={i} className="cert-tag">
                        <FaCertificate /> {cert.name}
                      </span>
                    ))}
                  </div>
                  
                  <p className="nurse-description">{nurse.description}</p>
                  
                  <div className="details-row">
                    <span className="detail-item">
                      <FaBriefcase /> {nurse.experience.years} years
                    </span>
                    <span className="detail-item">
                      <FaMapMarkerAlt /> {nurse.location.distance} miles
                    </span>
                  </div>
                  
                  <div className="shifts">
                    {nurse.shifts.map(shift => (
                      <span key={shift.duration} className="shift-tag">
                        {shift.duration}hr (${shift.rate}/hr)
                      </span>
                    ))}
                  </div>

                  <div className="languages">
                    {nurse.languages.map((lang, i) => (
                      <span key={i} className="language-tag">{lang.language}</span>
                    ))}
                  </div>
                </div>

                {/* Booking */}
                <div className="card-right">
                  <div className="price-section">
                    <span className="price">${nurse.pricing.hourlyRate}</span>
                    <span className="price-unit">/hr</span>
                  </div>
                  
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(nurse.rating.average) ? 'star-filled' : 'star-empty'} 
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      {nurse.rating.average} ({nurse.rating.count})
                    </span>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="book-btn">
                      Book Now <FaChevronRight />
                    </button>
                    <button className="message-btn">
                      <FaComments /> Message
                    </button>
                  </div>
                  
                  <div className="contact-row">
                    <a href={`tel:${nurse.contact.phone}`} className="contact-link">
                      <FaPhone />
                    </a>
                    <a href={`mailto:${nurse.contact.email}`} className="contact-link">
                      <FaEnvelope />
                    </a>
                    <a href="#" className="contact-link">
                      <FaVideo />
                    </a>
                  </div>
                  
                  <a href="#" className="view-profile">
                    View Profile <FaArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredNurses.length === 0 && (
            <div className="no-results">
              <p>No nurses match your search criteria.</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear all filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LifeSync;