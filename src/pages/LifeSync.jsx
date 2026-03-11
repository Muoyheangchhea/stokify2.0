import { useState, useEffect } from "react";
import { NURSES }    from "../data/nurses";
import { HOSPITALS } from "../data/hospitals";
import "../styles/LifeSync.css";

// ─── SVG Icons ───────────────────────────────────────────────────
const Icon = ({ path, size = 18, style = {}, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={path} />
  </svg>
);
const SearchIcon      = (p) => <Icon {...p} path="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const FilterIcon      = (p) => <Icon {...p} path="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
const PhoneIcon       = (p) => <Icon {...p} path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.59 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />;
const VideoIcon       = (p) => <Icon {...p} path="M23 7l-7 5 7 5V7zM1 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />;
const MapPinIcon      = (p) => <Icon {...p} path="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />;
const StarIcon = ({ filled, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const PlayIcon         = (p) => <Icon {...p} path="M5 3l14 9-14 9V3z" fill="currentColor" />;
const MsgIcon          = (p) => <Icon {...p} path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const CloseIcon        = (p) => <Icon {...p} path="M18 6L6 18M6 6l12 12" />;
const ChevronRightIcon = (p) => <Icon {...p} path="M9 18l6-6-6-6" />;
const AlertIcon        = (p) => <Icon {...p} path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />;
const HeartIcon        = (p) => <Icon {...p} path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
const BriefcaseIcon    = (p) => <Icon {...p} path="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />;
const AwardIcon        = (p) => <Icon {...p} path="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />;
const CheckIcon        = (p) => <Icon {...p} path="M20 6L9 17l-5-5" />;
const SunIcon          = (p) => <Icon {...p} path="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />;
const MoonIcon         = (p) => <Icon {...p} path="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const BedIcon          = (p) => <Icon {...p} path="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 10V6a2 2 0 0 1 2-2h4M6 10V4M18 10V4M2 16h20" />;
const ClockIcon        = (p) => <Icon {...p} path="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2" />;

// ─── Reusable card list renderer ────────────────────────────────
// Both Nurses and Hospitals share exactly the same card structure.
// Data is normalised into a common shape before rendering.

function CardList({ items, onClearFilters }) {
  const [playingId, setPlayingId] = useState(null);

  if (items.length === 0) {
    return (
      <div className="ls-empty-state">
        <div className="ls-empty-icon"><SearchIcon size={22} /></div>
        <p className="ls-empty-title">No results match your search</p>
        <p className="ls-empty-message">Try adjusting your filters or search term.</p>
        <button className="ls-empty-clear-btn" onClick={onClearFilters}>Clear all filters</button>
      </div>
    );
  }

  return (
    <div className="ls-nurse-list">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="ls-nurse-card"
          style={{ animationDelay: `${idx * 0.06}s` }}
        >
          <div className="ls-card-inner">
            {/* ── Image column ── */}
            <div className="ls-card-video">
              <img src={item.image} alt={item.name} className="ls-video-img" />
              <div className="ls-video-overlay" />

              {/* Play btn only for nurses (item.hasVideo) */}
              {item.hasVideo && (
                <button
                  className="ls-play-btn"
                  onClick={() => setPlayingId(playingId === item.id ? null : item.id)}
                >
                  {playingId === item.id
                    ? <span className="ls-pause-icon" />
                    : <PlayIcon size={14} />}
                </button>
              )}

              <div className="ls-badges">
                {item.primaryBadge && (
                  <span className="ls-badge-super"><AwardIcon size={9} /> {item.primaryBadge}</span>
                )}
                {item.bookedRecently && (
                  <span className="ls-badge-popular"><CheckIcon size={9} /> Popular</span>
                )}
              </div>

              <div className="ls-availability">
                <span className={`ls-availability-dot-large ${!item.availability ? "busy" : ""}`} />
                <span className="ls-availability-text">
                  {item.availabilityLabel}
                </span>
              </div>
            </div>

            {/* ── Content column ── */}
            <div className="ls-card-content">
              <div className="ls-card-header">
                <div>
                  <h3 className="ls-nurse-name">{item.name}</h3>
                  <div className="ls-nurse-credentials">{item.credentials}</div>
                </div>
                <div className="ls-price-block">
                  <div className="ls-price">{item.priceLabel}</div>
                  <div className="ls-price-unit">{item.priceUnit}</div>
                </div>
              </div>

              <div className="ls-rating">
                <div className="ls-stars">
                  {[1,2,3,4,5].map((i) => (
                    <StarIcon key={i} filled={i <= Math.floor(item.rating)} size={11} />
                  ))}
                </div>
                <span className="ls-rating-value">
                  {item.rating} <span className="ls-rating-count">({item.reviews})</span>
                </span>
              </div>

              <p className="ls-description">{item.description}</p>

              <div className="ls-meta-chips">
                {item.metaChips.map((chip, i) => (
                  <span key={i} className="ls-chip">
                    {chip.icon} {chip.label}
                  </span>
                ))}
                {item.certifications.map((c, i) => (
                  <span key={i} className="ls-cert-chip">{c}</span>
                ))}
              </div>

              <div className="ls-shift-tags">
                {item.tags.map((t, i) => (
                  <span key={i} className="ls-shift-tag">{t}</span>
                ))}
              </div>

              <div className="ls-response-time">
                <span className="ls-response-badge">⚡ {item.responseTime}</span>
                <div className="ls-actions">
                  <button className="ls-message-btn"><MsgIcon size={12} /> {item.enquireLabel}</button>
                  <button className="ls-book-btn">{item.bookLabel} <ChevronRightIcon size={11} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="ls-card-footer">
            <div className="ls-contact-links">
              {item.footerLinks.map((link, i) => (
                <a key={i} href={link.href} className="ls-contact-link">
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
            <div className="ls-languages">
              {item.languages.map((lang, i) => (
                <span key={i} className="ls-language-tag">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Normalise nurse → common card shape ─────────────────────────
function normaliseNurse(n) {
  return {
    id:              n.id,
    name:            n.name,
    credentials:     `${n.title} · ${n.specialty}`,
    image:           n.image,
    rating:          n.rating,
    reviews:         n.reviews,
    description:     n.description,
    availability:    n.availability,
    availabilityLabel: n.availability ? "Available" : "Busy",
    bookedRecently:  n.bookedRecently,
    responseTime:    n.responseTime,
    priceLabel:      `$${n.hourlyRate}`,
    priceUnit:       "/hr",
    primaryBadge:    n.badges.includes("Super Nurse") ? "Super Nurse" : null,
    certifications:  n.certifications.slice(0, 2),
    hasVideo:        true,
    metaChips: [
      { icon: <BriefcaseIcon size={10} />, label: `${n.experience}y exp` },
      { icon: <MapPinIcon size={10} />,    label: `${n.distance} mi`     },
    ],
    tags:         n.shifts.map((s) => `${s.duration}hr · $${s.rate}/hr`),
    enquireLabel: "Message",
    bookLabel:    "Book Now",
    footerLinks: [
      { icon: <PhoneIcon size={13} />, label: "Call",  href: "tel:+15551234567" },
      { icon: <VideoIcon size={13} />, label: "Video", href: "#"                },
    ],
    languages: n.languages,
  };
}

// ─── Normalise hospital → common card shape ───────────────────────
function normaliseHospital(h) {
  return {
    id:              h.id,
    name:            h.name,
    credentials:     `${h.title} · ${h.type}`,
    image:           h.image,
    rating:          h.rating,
    reviews:         h.reviews,
    description:     h.description,
    availability:    h.availability,
    availabilityLabel: h.availability ? "Open" : "Full",
    bookedRecently:  h.bookedRecently,
    responseTime:    h.responseTime,
    priceLabel:      `${h.distance} km`,
    priceUnit:       "away",
    primaryBadge:    h.strokeUnit ? "Stroke Unit" : (h.badges[0] || null),
    certifications:  h.certifications.slice(0, 2),
    hasVideo:        false,
    metaChips: [
      { icon: <BedIcon size={10} />,    label: `${h.beds} beds`  },
      { icon: <ClockIcon size={10} />,  label: h.operatingHours  },
      { icon: <MapPinIcon size={10} />, label: h.address         },
    ],
    tags:         h.services,
    enquireLabel: "Enquire",
    bookLabel:    "Book Visit",
    footerLinks: [
      { icon: <PhoneIcon size={13} />,  label: "Call",       href: `tel:${h.phone}` },
      { icon: <MapPinIcon size={13} />, label: "Directions", href: "#"              },
    ],
    languages: h.languages,
  };
}

// ─── Main component ──────────────────────────────────────────────
export default function LifeSync() {
  const [mode, setMode] = useState("nurses");

  // Nurse filters
  const [nurseSearch,      setNurseSearch]      = useState("");
  const [shiftFilter,      setShiftFilter]      = useState("all");
  const [nurseAvailNow,    setNurseAvailNow]    = useState(false);
  const [showNurseFilters, setShowNurseFilters] = useState(false);
  const [nurseSortBy,      setNurseSortBy]      = useState("recommended");
  const [maxPrice,         setMaxPrice]         = useState(100);

  // Hospital filters
  const [hospSearch,       setHospSearch]       = useState("");
  const [hospType,         setHospType]         = useState("all");
  const [hospSpecialty,    setHospSpecialty]    = useState("all");
  const [hospAvailNow,     setHospAvailNow]     = useState(false);
  const [hospEmergency,    setHospEmergency]    = useState(false);
  const [showHospFilters,  setShowHospFilters]  = useState(false);
  const [hospSortBy,       setHospSortBy]       = useState("recommended");
  const [maxDistance,      setMaxDistance]      = useState(20);

  useEffect(() => { window.scrollTo(0, 0); }, [mode]);

  // ── Filtered nurses ──
  const filteredNurses = NURSES.filter((n) => {
    if (nurseSearch) {
      const t = nurseSearch.toLowerCase();
      if (!n.name.toLowerCase().includes(t) &&
          !n.specialty.toLowerCase().includes(t) &&
          !n.description.toLowerCase().includes(t)) return false;
    }
    if (shiftFilter !== "all" && !n.shiftTypes.includes(shiftFilter)) return false;
    if (nurseAvailNow && !n.availability) return false;
    if (n.hourlyRate > maxPrice) return false;
    return true;
  }).sort((a, b) => {
    if (nurseSortBy === "rating")     return b.rating - a.rating;
    if (nurseSortBy === "price-low")  return a.hourlyRate - b.hourlyRate;
    if (nurseSortBy === "price-high") return b.hourlyRate - a.hourlyRate;
    if (nurseSortBy === "experience") return b.experience - a.experience;
    if (nurseSortBy === "distance")   return a.distance - b.distance;
    if (a.bookedRecently && !b.bookedRecently) return -1;
    if (!a.bookedRecently && b.bookedRecently) return 1;
    return b.rating - a.rating;
  }).map(normaliseNurse);

  const clearNurseFilters = () => {
    setNurseSearch(""); setShiftFilter("all");
    setNurseAvailNow(false); setMaxPrice(100); setNurseSortBy("recommended");
  };
  const hasNurseFilters = nurseSearch || shiftFilter !== "all" || nurseAvailNow || maxPrice < 100 || nurseSortBy !== "recommended";

  // ── Filtered hospitals ──
  const hospSpecialties = ["all", ...new Set(HOSPITALS.map((h) => h.specialty))];
  const hospTypes       = ["all", ...new Set(HOSPITALS.map((h) => h.type))];

  const filteredHospitals = HOSPITALS.filter((h) => {
    if (hospSearch) {
      const t = hospSearch.toLowerCase();
      if (!h.name.toLowerCase().includes(t) &&
          !h.specialty.toLowerCase().includes(t) &&
          !h.description.toLowerCase().includes(t)) return false;
    }
    if (hospType !== "all" && h.type !== hospType) return false;
    if (hospSpecialty !== "all" && h.specialty !== hospSpecialty) return false;
    if (hospAvailNow && !h.availability) return false;
    if (hospEmergency && !h.emergencyAvailable) return false;
    if (h.distance > maxDistance) return false;
    return true;
  }).sort((a, b) => {
    if (hospSortBy === "rating")   return b.rating - a.rating;
    if (hospSortBy === "distance") return a.distance - b.distance;
    if (hospSortBy === "beds")     return b.beds - a.beds;
    if (a.bookedRecently && !b.bookedRecently) return -1;
    if (!a.bookedRecently && b.bookedRecently) return 1;
    return b.rating - a.rating;
  }).map(normaliseHospital);

  const clearHospFilters = () => {
    setHospSearch(""); setHospType("all"); setHospSpecialty("all");
    setHospAvailNow(false); setHospEmergency(false);
    setMaxDistance(20); setHospSortBy("recommended");
  };
  const hasHospFilters = hospSearch || hospType !== "all" || hospSpecialty !== "all" ||
    hospAvailNow || hospEmergency || maxDistance < 20 || hospSortBy !== "recommended";

  // ── Search section renderer (shared UI, different state/data) ──
  function SearchSection({
    search, setSearch, showFilters, setShowFilters,
    hasFilters, onClearFilters, resultCount, resultLabel,
    quickTabs, advancedFilters, items,
  }) {
    return (
      <div className="ls-search-section">
        {/* Search bar */}
        <div className="ls-search-wrapper">
          <div className="ls-search-icon"><SearchIcon size={16} /></div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${resultLabel}...`}
            className="ls-search-input"
          />
          <button
            className={`ls-filter-toggle ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            <FilterIcon size={12} /> Filters
            {hasFilters && <span className="ls-filter-badge" />}
          </button>
        </div>

        {/* Quick filter tabs */}
        <div className="ls-filter-tabs">
          {quickTabs}
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="ls-advanced-filters">
            <div className="ls-filter-header">
              <span className="ls-filter-title">Advanced Filters</span>
              <button className="ls-clear-btn" onClick={onClearFilters}>
                <CloseIcon size={10} /> Clear all
              </button>
            </div>
            <div className="ls-filter-grid">
              {advancedFilters}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="ls-results">
          <p className="ls-results-count">
            <span className="ls-results-number">{resultCount}</span> {resultLabel} found
          </p>
          {hasFilters && (
            <button className="ls-clear-filters-link" onClick={onClearFilters}>
              Clear filters
            </button>
          )}
        </div>

        <CardList items={items} onClearFilters={onClearFilters} />
        <div style={{ height: 32 }} />
      </div>
    );
  }

  return (
    <div className="ls-container">

      {/* ══ HEADER ══ */}
      <header className="ls-header">
        <div className="ls-header-content">
          <h1 className="ls-title">
            Stroke Care<span className="ls-title-highlight"> Connect</span>
          </h1>
          <p className="ls-subtitle">
            Find verified nurses and partner hospitals for stroke care — all in one place
          </p>
        </div>
      </header>

      {/* ══ MODE TABS ══ */}
      <div className="ls-mode-toggle">
        <div className="ls-mode-container">
          {[
            { id: "nurses",    label: "Nurses"  },
            { id: "hospital",  label: "Hospital"     },
            { id: "emergency", label: "Emergency", danger: true },
          ].map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                className={`ls-mode-btn ${active ? "active" : ""} ${tab.danger && active ? "emergency" : ""}`}
                onClick={() => setMode(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="ls-main">

        {/* ══ EMERGENCY ══ */}
        {mode === "emergency" && (
          <div className="ls-emergency-panel">
            <div className="ls-emergency-card">
              <div className="ls-emergency-icon-large">
                <AlertIcon size={32} />
              </div>
              <h2 className="ls-emergency-title">Stroke Emergency?</h2>
              <p className="ls-emergency-description">
                Call 119 immediately. Every minute counts — time is brain tissue.
              </p>
              <a href="tel:119" className="ls-emergency-call-btn">
                <PhoneIcon size={18} /> CALL 119 NOW
              </a>
              <div className="ls-emergency-contacts">
                {[
                  { name: "Emergency Medical Ambulance", number: "119",             color: "#7C3AED" },
                  { name: "Calmette Hospital Emergency", number: "+855-23-426-948", color: "#0284C7" },
                ].map((c, i) => (
                  <a key={i} href={`tel:${c.number}`} className="ls-emergency-contact">
                    <div className="ls-contact-icon-wrapper" style={{ background: `${c.color}14`, color: c.color }}>
                      <PhoneIcon size={15} />
                    </div>
                    <div className="ls-contact-details">
                      <div className="ls-contact-name">{c.name}</div>
                      <div className="ls-contact-number" style={{ color: c.color }}>{c.number}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ HOSPITAL — identical UI to NURSES ══ */}
        {mode === "hospital" && (
          <SearchSection
            search={hospSearch}         setSearch={setHospSearch}
            showFilters={showHospFilters} setShowFilters={setShowHospFilters}
            hasFilters={hasHospFilters}   onClearFilters={clearHospFilters}
            resultCount={filteredHospitals.length}
            resultLabel="hospitals"
            items={filteredHospitals}
            quickTabs={<>
              {hospTypes.map((t) => (
                <button
                  key={t}
                  className={`ls-filter-tab ${hospType === t ? "active" : ""}`}
                  onClick={() => setHospType(t)}
                >
                  {t === "all" ? "All Types" : t}
                </button>
              ))}
              <button
                className={`ls-availability-tab ${hospAvailNow ? "active" : ""}`}
                onClick={() => setHospAvailNow((v) => !v)}
              >
                <span className={`ls-availability-dot-small ${hospAvailNow ? "active" : ""}`} />
                Open Now
              </button>
              <button
                className={`ls-availability-tab ${hospEmergency ? "active" : ""}`}
                onClick={() => setHospEmergency((v) => !v)}
              >
                <span className={`ls-availability-dot-small ${hospEmergency ? "active" : ""}`} />
                24/7 Emergency
              </button>
            </>}
            advancedFilters={<>
              <div className="ls-filter-group">
                <label className="ls-filter-label">Sort By</label>
                <select className="ls-select" value={hospSortBy} onChange={(e) => setHospSortBy(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest</option>
                  <option value="beds">Most Beds</option>
                </select>
              </div>
              <div className="ls-filter-group">
                <label className="ls-filter-label">Specialty</label>
                <select className="ls-select" value={hospSpecialty} onChange={(e) => setHospSpecialty(e.target.value)}>
                  {hospSpecialties.map((s) => (
                    <option key={s} value={s}>{s === "all" ? "All Specialties" : s}</option>
                  ))}
                </select>
              </div>
              <div className="ls-filter-group">
                <label className="ls-filter-label">Max Distance (km)</label>
                <div className="ls-price-range">
                  <input type="range" className="ls-range-input"
                    min={1} max={20} step={1}
                    value={maxDistance} onChange={(e) => setMaxDistance(+e.target.value)}
                  />
                  <span className="ls-price-value">{maxDistance} km</span>
                </div>
              </div>
            </>}
          />
        )}

        {/* ══ NURSES ══ */}
        {mode === "nurses" && (
          <SearchSection
            search={nurseSearch}          setSearch={setNurseSearch}
            showFilters={showNurseFilters}  setShowFilters={setShowNurseFilters}
            hasFilters={hasNurseFilters}    onClearFilters={clearNurseFilters}
            resultCount={filteredNurses.length}
            resultLabel="nurses"
            items={filteredNurses}
            quickTabs={<>
              {[
                { id: "all",   label: "All Shifts" },
                { id: "day",   label: <><SunIcon size={11} /> Day</>   },
                { id: "night", label: <><MoonIcon size={11} /> Night</> },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`ls-filter-tab ${shiftFilter === t.id ? "active" : ""}`}
                  onClick={() => setShiftFilter(t.id)}
                >
                  {t.label}
                </button>
              ))}
              <button
                className={`ls-availability-tab ${nurseAvailNow ? "active" : ""}`}
                onClick={() => setNurseAvailNow((v) => !v)}
              >
                <span className={`ls-availability-dot-small ${nurseAvailNow ? "active" : ""}`} />
                Available Now
              </button>
            </>}
            advancedFilters={<>
              <div className="ls-filter-group">
                <label className="ls-filter-label">Sort By</label>
                <select className="ls-select" value={nurseSortBy} onChange={(e) => setNurseSortBy(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low→High</option>
                  <option value="price-high">Price: High→Low</option>
                  <option value="experience">Most Experienced</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
              <div className="ls-filter-group">
                <label className="ls-filter-label">Max Price/hr</label>
                <div className="ls-price-range">
                  <input type="range" className="ls-range-input"
                    min={20} max={100} step={5}
                    value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
                  />
                  <span className="ls-price-value">${maxPrice}</span>
                </div>
              </div>
            </>}
          />
        )}

      </div>
    </div>
  );
}