import { useState, useEffect } from "react";
import { NURSES } from "../data/nurses";
import "../styles/LifeSync.css";

// ─── Inline SVG Icons (keep as is) ───
const Icon = ({ path, size = 18, style = {}, fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d={path} />
  </svg>
);

const SearchIcon = (p) => (
  <Icon {...p} path="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
);
const FilterIcon = (p) => (
  <Icon {...p} path="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
);
const NurseIcon = (p) => (
  <Icon
    {...p}
    path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
  />
);
const AmbulanceIcon = (p) => (
  <Icon
    {...p}
    path="M10 10H6m-2 4h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 3H9L7.5 6H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2zm0 0v4m16-4v4M6 18h12M6 18a2 2 0 1 0 4 0M14 18a2 2 0 1 0 4 0"
  />
);
const PhoneIcon = (p) => (
  <Icon
    {...p}
    path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.59 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
  />
);
const VideoIcon = (p) => (
  <Icon
    {...p}
    path="M23 7l-7 5 7 5V7zM1 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
  />
);
const MapPinIcon = (p) => (
  <Icon
    {...p}
    path="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
  />
);
const StarIcon = ({ filled, size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#F59E0B" : "none"}
    stroke="#F59E0B"
    strokeWidth="2"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const PlayIcon = (p) => (
  <Icon {...p} path="M5 3l14 9-14 9V3z" fill="currentColor" />
);
const MsgIcon = (p) => (
  <Icon
    {...p}
    path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  />
);
const CloseIcon = (p) => <Icon {...p} path="M18 6L6 18M6 6l12 12" />;
const ChevronRightIcon = (p) => <Icon {...p} path="M9 18l6-6-6-6" />;
const AlertIcon = (p) => (
  <Icon
    {...p}
    path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"
  />
);
const HeartIcon = (p) => (
  <Icon
    {...p}
    path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  />
);
const BriefcaseIcon = (p) => (
  <Icon
    {...p}
    path="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
  />
);
const AwardIcon = (p) => (
  <Icon
    {...p}
    path="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12"
  />
);
const CheckIcon = (p) => <Icon {...p} path="M20 6L9 17l-5-5" />;
const SunIcon = (p) => (
  <Icon
    {...p}
    path="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"
  />
);
const MoonIcon = (p) => (
  <Icon {...p} path="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
);

export default function LifeSync() {
  const [mode, setMode] = useState("nurses");
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [availNow, setAvailNow] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(100);
  const [playingId, setPlayingId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = NURSES.filter((n) => {
    if (search) {
      const t = search.toLowerCase();
      if (
        !n.name.toLowerCase().includes(t) &&
        !n.specialty.toLowerCase().includes(t) &&
        !n.description.toLowerCase().includes(t)
      )
        return false;
    }
    if (shiftFilter !== "all" && !n.shiftTypes.includes(shiftFilter))
      return false;
    if (availNow && !n.availability) return false;
    if (n.hourlyRate > maxPrice) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
    if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
    if (sortBy === "experience") return b.experience - a.experience;
    if (sortBy === "distance") return a.distance - b.distance;
    if (a.bookedRecently && !b.bookedRecently) return -1;
    if (!a.bookedRecently && b.bookedRecently) return 1;
    return b.rating - a.rating;
  });

  const clearFilters = () => {
    setSearch("");
    setShiftFilter("all");
    setAvailNow(false);
    setMaxPrice(100);
    setSortBy("recommended");
  };

  const hasFilters =
    search ||
    shiftFilter !== "all" ||
    availNow ||
    maxPrice < 100 ||
    sortBy !== "recommended";

  return (
    <div className="ls-container">
      {/* ── HEADER ── */}
      <header className="ls-header">
        <div className="ls-header-content">
          <div className="ls-header-top">
            <div>
              <div className="ls-brand">
                <div className="ls-brand-icon">
                  <HeartIcon size={16} />
                </div>
                <span className="ls-brand-text">LifeSync</span>
              </div>
              <h1 className="ls-title">
                Stroke Care
                <span className="ls-title-highlight"> Nurses</span>
              </h1>
              <p className="ls-subtitle">
                Find experienced nurses for in-home stroke care
              </p>
            </div>
            <div className="ls-stats">
              <div className="ls-availability-badge">
                <span className="ls-availability-dot" />
                24/7 Available
              </div>
              <div className="ls-count">{NURSES.length} verified nurses</div>
            </div>
          </div>

          {/* Emergency banner */}
          {/* <div className="ls-emergency-banner" onClick={() => setMode("emergency")}>
            <AlertIcon size={15} className="ls-emergency-icon" />
            <span className="ls-emergency-text">Stroke emergency? </span>
            <span className="ls-emergency-link">Switch to Emergency Mode →</span>
          </div> */}
        </div>
      </header>

      {/* ── MODE TOGGLE ── */}
      <div className="ls-mode-toggle">
        <div className="ls-mode-container">
          {[
            { id: "nurses", label: "Find Nurses" },
            {
              id: "emergency",
              label: "Emergency",
              danger: true,
            },
          ].map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                className={`ls-mode-btn ${active ? "active" : ""} ${
                  tab.danger && active ? "emergency" : ""
                }`}
                onClick={() => setMode(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="ls-main">
        {/* ── EMERGENCY MODE ── */}
        {mode === "emergency" && (
          <div className="ls-emergency-panel">
            <div className="ls-emergency-card">
              <div className="ls-emergency-icon-large">
                <AlertIcon size={32} />
              </div>
              <h2 className="ls-emergency-title">Stroke Emergency?</h2>
              <p className="ls-emergency-description">
                Call 119 immediately. Every minute counts — time is brain
                tissue.
              </p>
              <a href="tel:911" className="ls-emergency-call-btn">
                <PhoneIcon size={18} /> CALL 119 NOW
              </a>
              <div className="ls-emergency-contacts">
                {[
                  {
                    name: "Emergency Medical Ambulance Service",
                    number: "119",
                    color: "#7C3AED",
                  },
                  {
                    name: "Direct Calmette Hospital Emergency",
                    number: "+855-23-426-948",
                    color: "#0284C7",
                  },
                ].map((c, i) => (
                  <a
                    key={i}
                    href={`tel:${c.number}`}
                    className="ls-emergency-contact"
                  >
                    <div
                      className="ls-contact-icon-wrapper"
                      style={{ background: `${c.color}14`, color: c.color }}
                    >
                      <PhoneIcon size={15} />
                    </div>
                    <div className="ls-contact-details">
                      <div className="ls-contact-name">{c.name}</div>
                      <div className="ls-contact-number">{c.number}</div>
                    </div>
                  </a>
                ))}
              </div>
              <button className="ls-back-btn" onClick={() => setMode("nurses")}>
                ← Back to Nurse Directory
              </button>
            </div>
          </div>
        )}

        {/* ── NURSES MODE ── */}
        {mode === "nurses" && (
          <div className="ls-search-section">
            {/* Search bar */}
            <div className="ls-search-wrapper">
              <div className="ls-search-icon">
                <SearchIcon size={16} />
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialty, condition..."
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

            {/* Quick shift tabs */}
            <div className="ls-filter-tabs">
              {[
                { id: "all", label: "All Shifts" },
                {
                  id: "day",
                  label: (
                    <>
                      <SunIcon size={11} /> Day
                    </>
                  ),
                },
                {
                  id: "night",
                  label: (
                    <>
                      <MoonIcon size={11} /> Night
                    </>
                  ),
                },
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
                className={`ls-availability-tab ${availNow ? "active" : ""}`}
                onClick={() => setAvailNow((v) => !v)}
              >
                <span
                  className={`ls-availability-dot-small ${
                    availNow ? "active" : ""
                  }`}
                />
                Available Now
              </button>
            </div>

            {/* Advanced filters panel */}
            {showFilters && (
              <div className="ls-advanced-filters">
                <div className="ls-filter-header">
                  <span className="ls-filter-title">Advanced Filters</span>
                  <button className="ls-clear-btn" onClick={clearFilters}>
                    <CloseIcon size={10} /> Clear all
                  </button>
                </div>
                <div className="ls-filter-grid">
                  <div className="ls-filter-group">
                    <label className="ls-filter-label">Sort By</label>
                    <select
                      className="ls-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
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
                      <input
                        type="range"
                        className="ls-range-input"
                        min={20}
                        max={100}
                        step={5}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(+e.target.value)}
                      />
                      <span className="ls-price-value">${maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results count */}
            <div className="ls-results">
              <p className="ls-results-count">
                <span className="ls-results-number">{filtered.length}</span>{" "}
                nurses found
              </p>
              {hasFilters && (
                <button
                  className="ls-clear-filters-link"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Nurse cards */}
            <div className="ls-nurse-list">
              {filtered.map((nurse, idx) => (
                <div
                  key={nurse.id}
                  className="ls-nurse-card"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div className="ls-card-inner">
                    {/* Video/Image column */}
                    <div className="ls-card-video">
                      <img
                        src={nurse.image}
                        alt={nurse.name}
                        className="ls-video-img"
                      />
                      <div className="ls-video-overlay" />
                      <button
                        className="ls-play-btn"
                        onClick={() =>
                          setPlayingId(playingId === nurse.id ? null : nurse.id)
                        }
                      >
                        {playingId === nurse.id ? (
                          <span className="ls-pause-icon" />
                        ) : (
                          <PlayIcon size={14} className="ls-play-icon" />
                        )}
                      </button>

                      {/* Badges */}
                      <div className="ls-badges">
                        {nurse.badges.includes("Super Nurse") && (
                          <span className="ls-badge-super">
                            <AwardIcon size={9} /> Super Nurse
                          </span>
                        )}
                        {nurse.bookedRecently && (
                          <span className="ls-badge-popular">
                            <CheckIcon size={9} /> Popular
                          </span>
                        )}
                      </div>

                      {/* Availability dot */}
                      <div className="ls-availability">
                        <span
                          className={`ls-availability-dot-large ${
                            !nurse.availability ? "busy" : ""
                          }`}
                        />
                        <span className="ls-availability-text">
                          {nurse.availability ? "Available" : "Busy"}
                        </span>
                      </div>
                    </div>

                    {/* Main info */}
                    <div className="ls-card-content">
                      <div className="ls-card-header">
                        <div>
                          <h3 className="ls-nurse-name">{nurse.name}</h3>
                          <div className="ls-nurse-credentials">
                            {nurse.title} · {nurse.specialty}
                          </div>
                        </div>
                        <div className="ls-price-block">
                          <div className="ls-price">${nurse.hourlyRate}</div>
                          <div className="ls-price-unit">/hr</div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="ls-rating">
                        <div className="ls-stars">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <StarIcon
                              key={i}
                              filled={i <= Math.floor(nurse.rating)}
                              size={11}
                            />
                          ))}
                        </div>
                        <span className="ls-rating-value">
                          {nurse.rating}{" "}
                          <span className="ls-rating-count">
                            ({nurse.reviews})
                          </span>
                        </span>
                      </div>

                      <p className="ls-description">{nurse.description}</p>

                      {/* Meta chips */}
                      <div className="ls-meta-chips">
                        <span className="ls-chip">
                          <BriefcaseIcon size={10} className="ls-chip-icon" />{" "}
                          {nurse.experience}y exp
                        </span>
                        <span className="ls-chip">
                          <MapPinIcon size={10} className="ls-chip-icon" />{" "}
                          {nurse.distance} mi
                        </span>
                        {nurse.certifications.slice(0, 2).map((c, i) => (
                          <span key={i} className="ls-cert-chip">
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Shift tags */}
                      <div className="ls-shift-tags">
                        {nurse.shifts.map((s, i) => (
                          <span key={i} className="ls-shift-tag">
                            {s.duration}hr · ${s.rate}/hr
                          </span>
                        ))}
                      </div>

                      {/* Response time + actions */}
                      <div className="ls-response-time">
                        <span className="ls-response-badge">
                          ⚡ {nurse.responseTime}
                        </span>
                        <div className="ls-actions">
                          <button className="ls-message-btn">
                            <MsgIcon size={12} /> Message
                          </button>
                          <button className="ls-book-btn">
                            Book Now <ChevronRightIcon size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer row with contact links */}
                  <div className="ls-card-footer">
                    <div className="ls-contact-links">
                      {[
                        {
                          icon: <PhoneIcon size={13} />,
                          label: "Call",
                          href: `tel:+15551234567`,
                        },
                        {
                          icon: <VideoIcon size={13} />,
                          label: "Video",
                          href: "#",
                        },
                      ].map((a, i) => (
                        <a key={i} href={a.href} className="ls-contact-link">
                          {a.icon} {a.label}
                        </a>
                      ))}
                    </div>
                    <div className="ls-languages">
                      {nurse.languages.map((lang, i) => (
                        <span key={i} className="ls-language-tag">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="ls-empty-state">
                <div className="ls-empty-icon">
                  <SearchIcon size={22} />
                </div>
                <p className="ls-empty-title">No nurses match your search</p>
                <p className="ls-empty-message">
                  Try adjusting your filters or search term.
                </p>
                <button className="ls-empty-clear-btn" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
            )}

            {/* Bottom spacer */}
            <div style={{ height: 32 }} />
          </div>
        )}
      </div>
    </div>
  );
}
