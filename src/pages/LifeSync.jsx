import { useState, useEffect } from "react";

// ─── Brand Tokens ───
const B = {
  red: "#E63E4E",
  redLight: "#FF6B7A",
  redDark: "#B31E2C",
  pink: "#FFE5E8",
  pinkLight: "#FFF1F3",
  pinkDark: "#FFB8C1",
  gray50: "#F8FAFC",
  gray100: "#F1F5F9",
  gray200: "#E2E8F0",
  gray300: "#CBD5E1",
  gray400: "#94A3B8",
  gray500: "#64748B",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1E293B",
  gray900: "#0F172A",
  green: "#16A34A",
  greenLight: "#DCFCE7",
  greenBorder: "#BBF7D0",
};

// ─── Inline SVG Icon ───
const Icon = ({ path, size = 18, style = {}, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={path} />
  </svg>
);

const SearchIcon = (p) => <Icon {...p} path="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const FilterIcon = (p) => <Icon {...p} path="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
const NurseIcon = (p) => <Icon {...p} path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />;
const AmbulanceIcon = (p) => <Icon {...p} path="M10 10H6m-2 4h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 3H9L7.5 6H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2zm0 0v4m16-4v4M6 18h12M6 18a2 2 0 1 0 4 0M14 18a2 2 0 1 0 4 0" />;
const PhoneIcon = (p) => <Icon {...p} path="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.59 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />;
const VideoIcon = (p) => <Icon {...p} path="M23 7l-7 5 7 5V7zM1 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />;
const MapPinIcon = (p) => <Icon {...p} path="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 10a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />;
const StarIcon = ({ filled, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const PlayIcon = (p) => <Icon {...p} path="M5 3l14 9-14 9V3z" fill="currentColor" />;
const MsgIcon = (p) => <Icon {...p} path="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const CloseIcon = (p) => <Icon {...p} path="M18 6L6 18M6 6l12 12" />;
const ChevronRightIcon = (p) => <Icon {...p} path="M9 18l6-6-6-6" />;
const AlertIcon = (p) => <Icon {...p} path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />;
const HeartIcon = (p) => <Icon {...p} path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
const BriefcaseIcon = (p) => <Icon {...p} path="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />;
const AwardIcon = (p) => <Icon {...p} path="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />;
const CheckIcon = (p) => <Icon {...p} path="M20 6L9 17l-5-5" />;
const SunIcon = (p) => <Icon {...p} path="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />;
const MoonIcon = (p) => <Icon {...p} path="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;

// ─── Mock nurse data ───
const NURSES = [
  {
    id: 1, name: "Sarah Mitchell", title: "RN, BSN", specialty: "Stroke Rehabilitation",
    description: "Specialized in post-stroke recovery with a compassionate approach to restoring independence.",
    experience: 12, distance: 2.4, rating: 4.9, reviews: 127,
    hourlyRate: 45, availability: true, responseTime: "Responds in ~10 min",
    shifts: [{ duration: 4, rate: 45 }, { duration: 8, rate: 42 }, { duration: 12, rate: 38 }],
    certifications: ["CRRN", "BLS/ACLS"],
    languages: ["English", "Spanish"],
    badges: ["Super Nurse"],
    bookedRecently: true,
    shiftTypes: ["day", "night"],
    image: "https://i.pinimg.com/736x/bc/52/5b/bc525b0185a8880c22be1ab9be7beb57.jpg",
  },
  {
    id: 2, name: "James Okafor", title: "MSN, CRRN", specialty: "Neurological Care",
    description: "Expert in neuro rehab with 15+ years helping stroke survivors regain quality of life.",
    experience: 15, distance: 3.1, rating: 4.8, reviews: 89,
    hourlyRate: 52, availability: true, responseTime: "Responds in ~5 min",
    shifts: [{ duration: 8, rate: 52 }, { duration: 12, rate: 48 }],
    certifications: ["CRRN", "CNRN"],
    languages: ["English", "French"],
    badges: ["Super Nurse", "Top Rated"],
    bookedRecently: true,
    shiftTypes: ["day"],
    image: "https://i.pinimg.com/736x/78/24/ae/7824aee055909922aba22bddfd00ab02.jpg",
  },
  {
    id: 3, name: "Mei Lin Chen", title: "RN, CRRN", specialty: "Physical Therapy Support",
    description: "Bridges gap between nursing and physical therapy for holistic stroke patient care.",
    experience: 8, distance: 1.7, rating: 4.7, reviews: 64,
    hourlyRate: 38, availability: false, responseTime: "Responds in ~30 min",
    shifts: [{ duration: 4, rate: 38 }, { duration: 8, rate: 35 }],
    certifications: ["CRRN", "BLS"],
    languages: ["English", "Mandarin"],
    badges: [],
    bookedRecently: false,
    shiftTypes: ["night"],
    image: "https://i.pinimg.com/1200x/64/da/80/64da801438affd53e73f50bdbe814248.jpg",
  },
  {
    id: 4, name: "Robert Vasquez", title: "BSN, CNRN", specialty: "Critical Care",
    description: "ICU-trained nurse specializing in acute post-stroke monitoring and early intervention.",
    experience: 10, distance: 4.2, rating: 4.6, reviews: 52,
    hourlyRate: 48, availability: true, responseTime: "Responds in ~15 min",
    shifts: [{ duration: 8, rate: 48 }, { duration: 12, rate: 44 }],
    certifications: ["CNRN", "CCRN"],
    languages: ["English", "Spanish"],
    badges: ["Top Rated"],
    bookedRecently: false,
    shiftTypes: ["day", "night"],
    image: "https://i.pinimg.com/736x/14/ce/18/14ce18fed65364e29a6bf537f8cfca43.jpg",
  },
  {
    id: 5, name: "Priya Nair", title: "MSN, RN", specialty: "Geriatric Stroke Care",
    description: "Dedicated to elderly stroke patients, focusing on dignity, safety, and recovery.",
    experience: 9, distance: 5.0, rating: 4.8, reviews: 78,
    hourlyRate: 41, availability: true, responseTime: "Responds in ~20 min",
    shifts: [{ duration: 4, rate: 41 }, { duration: 8, rate: 39 }],
    certifications: ["RN-BC", "BLS"],
    languages: ["English", "Hindi"],
    badges: [],
    bookedRecently: true,
    shiftTypes: ["day"],
    image: "https://i.pinimg.com/736x/95/56/06/955606469451935fd46f57e0a2f44488.jpg",
  },
];

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

  useEffect(() => { setMounted(true); }, []);

  const filtered = NURSES
    .filter(n => {
      if (search) {
        const t = search.toLowerCase();
        if (!n.name.toLowerCase().includes(t) &&
          !n.specialty.toLowerCase().includes(t) &&
          !n.description.toLowerCase().includes(t)) return false;
      }
      if (shiftFilter !== "all" && !n.shiftTypes.includes(shiftFilter)) return false;
      if (availNow && !n.availability) return false;
      if (n.hourlyRate > maxPrice) return false;
      return true;
    })
    .sort((a, b) => {
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
    setSearch(""); setShiftFilter("all"); setAvailNow(false); setMaxPrice(100); setSortBy("recommended");
  };

  const hasFilters = search || shiftFilter !== "all" || availNow || maxPrice < 100 || sortBy !== "recommended";

  return (
    <div style={{
      minHeight: "100vh",
      background: B.gray50,
      fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif",
      color: B.gray900,
      paddingBottom: "40px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${B.pinkDark}; border-radius: 10px; }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.12);} }
        @keyframes spin { to { transform:rotate(360deg); } }
        .nc:hover { border-color:${B.pinkDark}!important; box-shadow:0 8px 32px rgba(230,62,78,0.1)!important; transform:translateY(-2px)!important; }
        .ftab:hover { background:${B.pink}!important; border-color:${B.pinkDark}!important; color:${B.red}!important; }
        .bookbtn:hover { background:${B.redDark}!important; transform:translateY(-1px)!important; box-shadow:0 8px 20px rgba(230,62,78,0.35)!important; }
        .msgbtn:hover { background:${B.pink}!important; border-color:${B.pinkDark}!important; color:${B.red}!important; }
        select { appearance:none; -webkit-appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:32px!important; }
        input[type=range] { -webkit-appearance:none; width:100%; height:4px; border-radius:4px; background:${B.gray200}; outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:${B.red}; cursor:pointer; border:2px solid white; box-shadow:0 2px 8px rgba(230,62,78,0.3); }
        .emgbtn:hover { transform:scale(1.02)!important; box-shadow:0 12px 32px rgba(220,38,38,0.45)!important; }
        @media(max-width:640px){
          .nurse-card-inner { flex-direction:column!important; }
          .card-video-col { width:100%!important; height:200px!important; }
          .card-right-col { width:100%!important; padding:14px!important; flex-direction:row!important; align-items:center!important; justify-content:space-between!important; flex-wrap:wrap!important; gap:12px!important; }
          .price-block { flex-direction:row!important; align-items:center!important; gap:6px!important; }
          .rating-block { display:none!important; }
        }
        @media(max-width:480px){
          .filter-grid-inner { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(160deg, #fff 0%, ${B.pinkLight} 100%)`, borderBottom: `1px solid ${B.pinkDark}`, padding: "clamp(20px,5vw,36px) clamp(16px,5vw,32px) 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${B.red},${B.redLight})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <HeartIcon size={16} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: B.red, textTransform: "uppercase", letterSpacing: "0.1em" }}>LifeSync</span>
              </div>
              <h1 style={{ fontSize: "clamp(1.6rem,5vw,2.4rem)", fontWeight: 800, color: B.gray900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Stroke Care<br /><span style={{ color: B.red }}>Nurses</span>
              </h1>
              <p style={{ fontSize: "0.85rem", color: B.gray400, marginTop: 6, fontWeight: 400 }}>
                Find experienced nurses for in-home stroke care
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#F0FDF4", border: `1px solid ${B.greenBorder}`, borderRadius: 100, fontSize: "0.75rem", color: B.green, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E44", display: "inline-block" }} />
                24/7 Available
              </div>
              <div style={{ fontSize: "0.75rem", color: B.gray400, fontWeight: 500 }}>{NURSES.length} verified nurses</div>
            </div>
          </div>

          {/* Emergency banner */}
          <div onClick={() => setMode("emergency")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: B.pink, border: `1px solid ${B.pinkDark}`, borderRadius: "14px 14px 0 0", cursor: "pointer", marginTop: 8, transition: "all 0.2s" }}>
            <AlertIcon size={15} style={{ color: B.red, flexShrink: 0, animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.82rem", color: B.redDark, fontWeight: 600 }}>Stroke emergency? </span>
            <span style={{ fontSize: "0.82rem", color: B.red, fontWeight: 700, textDecoration: "underline", marginLeft: 2 }}>Switch to Emergency Mode →</span>
          </div>
        </div>
      </div>

      {/* ── MODE TOGGLE ── */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${B.gray200}`, padding: "0 clamp(16px,5vw,32px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {[
            { id: "nurses", label: "Find Nurses", icon: <NurseIcon size={15} /> },
            { id: "emergency", label: "Emergency", icon: <AmbulanceIcon size={15} />, danger: true },
          ].map(tab => {
            const active = mode === tab.id;
            return (
              <button key={tab.id} onClick={() => setMode(tab.id)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "14px 20px",
                background: "none", border: "none", borderBottom: active ? `2px solid ${tab.danger ? "#DC2626" : B.red}` : "2px solid transparent",
                color: active ? (tab.danger ? "#DC2626" : B.red) : B.gray400,
                fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                marginBottom: -1, letterSpacing: "0.01em",
              }}>
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,32px)" }}>

        {/* ── EMERGENCY MODE ── */}
        {mode === "emergency" && (
          <div style={{ padding: "40px 0", animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "#fff", borderRadius: 24, border: `1px solid ${B.gray200}`, overflow: "hidden", textAlign: "center", padding: "clamp(24px,6vw,48px)" }}>
              <div style={{ width: 72, height: 72, background: "#FEF2F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#DC2626" }}>
                <AlertIcon size={32} />
              </div>
              <h2 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 800, color: B.gray900, marginBottom: 8, letterSpacing: "-0.02em" }}>Stroke Emergency?</h2>
              <p style={{ color: B.gray500, marginBottom: 28, fontSize: "0.9rem", lineHeight: 1.6 }}>Call 911 immediately. Every minute counts — time is brain tissue.</p>
              <a href="tel:911" className="emgbtn" style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
                background: "linear-gradient(135deg,#DC2626,#EF4444)", color: "#fff",
                borderRadius: 100, textDecoration: "none", fontSize: "1rem", fontWeight: 800,
                letterSpacing: "0.05em", boxShadow: "0 8px 24px rgba(220,38,38,0.35)", transition: "all 0.25s",
              }}>
                <PhoneIcon size={18} /> CALL 911 NOW
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 28 }}>
                {[
                  { name: "Stroke Helpline", number: "1-888-478-7653", color: B.red },
                  { name: "Poison Control", number: "1-800-222-1222", color: "#7C3AED" },
                ].map((c, i) => (
                  <a key={i} href={`tel:${c.number}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: B.gray50, border: `1px solid ${B.gray200}`, borderRadius: 14, textDecoration: "none" }}>
                    <div style={{ width: 36, height: 36, background: `${c.color}14`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, flexShrink: 0 }}>
                      <PhoneIcon size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: B.gray800 }}>{c.name}</div>
                      <div style={{ fontSize: "0.72rem", color: c.color, fontWeight: 600 }}>{c.number}</div>
                    </div>
                  </a>
                ))}
              </div>
              <button onClick={() => setMode("nurses")} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 24, padding: "10px 20px", background: B.pinkLight, border: `1px solid ${B.pinkDark}`, borderRadius: 100, color: B.red, fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
                ← Back to Nurse Directory
              </button>
            </div>
          </div>
        )}

        {/* ── NURSES MODE ── */}
        {mode === "nurses" && (
          <div style={{ paddingTop: 20 }}>
            {/* Search bar */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: B.gray400, pointerEvents: "none" }}>
                <SearchIcon size={16} />
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, specialty, condition..."
                style={{ width: "100%", padding: "12px 48px 12px 40px", background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 14, fontSize: "0.88rem", color: B.gray800, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = B.red}
                onBlur={e => e.target.style.borderColor = B.gray200}
              />
              <button onClick={() => setShowFilters(v => !v)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: showFilters ? B.pink : B.gray100, border: `1px solid ${showFilters ? B.pinkDark : B.gray200}`, borderRadius: 10, color: showFilters ? B.red : B.gray500, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                <FilterIcon size={12} /> Filters
                {hasFilters && <span style={{ width: 7, height: 7, borderRadius: "50%", background: B.red, display: "inline-block" }} />}
              </button>
            </div>

            {/* Quick shift tabs */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 12, scrollbarWidth: "none" }}>
              {[{ id: "all", label: "All Shifts" }, { id: "day", label: <><SunIcon size={11} /> Day</> }, { id: "night", label: <><MoonIcon size={11} /> Night</> }].map(t => (
                <button key={t.id} className="ftab" onClick={() => setShiftFilter(t.id)} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "7px 14px", background: shiftFilter === t.id ? B.pink : "#fff",
                  border: `1px solid ${shiftFilter === t.id ? B.pinkDark : B.gray200}`,
                  borderRadius: 100, color: shiftFilter === t.id ? B.red : B.gray500, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                }}>{t.label}</button>
              ))}
              <button className="ftab" onClick={() => setAvailNow(v => !v)} style={{
                display: "flex", alignItems: "center", gap: 4, padding: "7px 14px", background: availNow ? B.greenLight : "#fff",
                border: `1px solid ${availNow ? B.greenBorder : B.gray200}`,
                borderRadius: 100, color: availNow ? B.green : B.gray500, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: availNow ? "#22C55E" : B.gray300, display: "inline-block" }} />
                Available Now
              </button>
            </div>

            {/* Advanced filters panel */}
            {showFilters && (
              <div style={{ background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 16, padding: 16, marginBottom: 14, animation: "slideDown 0.25s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: B.gray700 }}>Advanced Filters</span>
                  <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: B.pinkLight, border: `1px solid ${B.pinkDark}`, borderRadius: 8, color: B.red, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>
                    <CloseIcon size={10} /> Clear all
                  </button>
                </div>
                <div className="filter-grid-inner" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: "0.68rem", fontWeight: 700, color: B.gray400, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Sort By</label>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: "100%", padding: "9px 12px", background: B.gray50, border: `1px solid ${B.gray200}`, borderRadius: 10, fontSize: "0.82rem", color: B.gray700, fontFamily: "inherit", cursor: "pointer", outline: "none" }}>
                      <option value="recommended">Recommended</option>
                      <option value="rating">Highest Rated</option>
                      <option value="price-low">Price: Low→High</option>
                      <option value="price-high">Price: High→Low</option>
                      <option value="experience">Most Experienced</option>
                      <option value="distance">Nearest</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.68rem", fontWeight: 700, color: B.gray400, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Max Price/hr</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="range" min={20} max={100} step={5} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} />
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: B.red, whiteSpace: "nowrap", minWidth: 38 }}>${maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results count */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontSize: "0.78rem", color: B.gray400, fontWeight: 500 }}>
                <span style={{ fontWeight: 700, color: B.gray700 }}>{filtered.length}</span> nurses found
              </p>
              {hasFilters && (
                <button onClick={clearFilters} style={{ fontSize: "0.72rem", color: B.red, fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Clear filters</button>
              )}
            </div>

            {/* Nurse cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map((nurse, idx) => (
                <div key={nurse.id} className="nc" style={{
                  background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 20,
                  overflow: "hidden", transition: "all 0.25s ease",
                  animation: `fadeIn 0.35s ease ${idx * 0.06}s both`,
                }}>
                  <div className="nurse-card-inner" style={{ display: "flex" }}>
                    {/* Video/Image column */}
                    <div className="card-video-col" style={{ width: 130, flexShrink: 0, position: "relative", background: B.gray900, overflow: "hidden" }}>
                      <img src={nurse.image} alt={nurse.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 180 }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
                      <button onClick={() => setPlayingId(playingId === nurse.id ? null : nurse.id)}
                        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: B.red, backdropFilter: "blur(4px)" }}>
                        {playingId === nurse.id ? <span style={{ width: 12, height: 12, display: "block", borderLeft: "3px solid currentColor", borderRight: "3px solid currentColor" }} /> : <PlayIcon size={14} />}
                      </button>
                      {/* Badges */}
                      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                        {nurse.badges.includes("Super Nurse") && (
                          <span style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", background: "rgba(230,62,78,0.9)", borderRadius: 6, fontSize: "0.6rem", fontWeight: 700, color: "#fff", backdropFilter: "blur(4px)" }}>
                            <AwardIcon size={9} /> Super Nurse
                          </span>
                        )}
                        {nurse.bookedRecently && (
                          <span style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", background: "rgba(0,0,0,0.6)", borderRadius: 6, fontSize: "0.6rem", fontWeight: 700, color: "#fff", backdropFilter: "blur(4px)" }}>
                            <CheckIcon size={9} /> Popular
                          </span>
                        )}
                      </div>
                      {/* Availability dot */}
                      <div style={{ position: "absolute", bottom: 8, left: 8, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: nurse.availability ? "#22C55E" : B.gray400, display: "inline-block", boxShadow: nurse.availability ? "0 0 8px #22C55E88" : "none" }} />
                        <span style={{ fontSize: "0.62rem", color: "#fff", fontWeight: 600 }}>{nurse.availability ? "Available" : "Busy"}</span>
                      </div>
                    </div>

                    {/* Main info */}
                    <div style={{ flex: 1, padding: "14px 14px 14px 16px", minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                        <div>
                          <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: B.gray900, letterSpacing: "-0.01em" }}>{nurse.name}</h3>
                          <div style={{ fontSize: "0.72rem", color: B.gray500, fontWeight: 500 }}>{nurse.title} · {nurse.specialty}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: B.red, letterSpacing: "-0.02em", lineHeight: 1 }}>${nurse.hourlyRate}</div>
                          <div style={{ fontSize: "0.62rem", color: B.gray400 }}>/hr</div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 1 }}>
                          {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} filled={i <= Math.floor(nurse.rating)} size={11} />)}
                        </div>
                        <span style={{ fontSize: "0.72rem", color: B.gray500, fontWeight: 600 }}>{nurse.rating} <span style={{ fontWeight: 400 }}>({nurse.reviews})</span></span>
                      </div>

                      <p style={{ fontSize: "0.78rem", color: B.gray500, lineHeight: 1.5, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {nurse.description}
                      </p>

                      {/* Meta chips */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", background: B.gray100, borderRadius: 6, fontSize: "0.68rem", color: B.gray600, fontWeight: 600 }}>
                          <BriefcaseIcon size={10} /> {nurse.experience}y exp
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", background: B.gray100, borderRadius: 6, fontSize: "0.68rem", color: B.gray600, fontWeight: 600 }}>
                          <MapPinIcon size={10} /> {nurse.distance} mi
                        </span>
                        {nurse.certifications.slice(0, 2).map((c, i) => (
                          <span key={i} style={{ padding: "3px 9px", background: B.pinkLight, border: `1px solid ${B.pinkDark}`, borderRadius: 6, fontSize: "0.65rem", color: B.red, fontWeight: 700 }}>{c}</span>
                        ))}
                      </div>

                      {/* Shift tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                        {nurse.shifts.map((s, i) => (
                          <span key={i} style={{ padding: "2px 8px", background: B.gray50, border: `1px solid ${B.gray200}`, borderRadius: 5, fontSize: "0.65rem", color: B.gray500, fontWeight: 500 }}>
                            {s.duration}hr·${s.rate}/hr
                          </span>
                        ))}
                      </div>

                      {/* Response time + actions */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.68rem", color: B.green, fontWeight: 600 }}>⚡ {nurse.responseTime}</span>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="msgbtn" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 10, color: B.gray600, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                            <MsgIcon size={12} /> Message
                          </button>
                          <button className="bookbtn" style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", background: `linear-gradient(135deg,${B.red},${B.redLight})`, border: "none", borderRadius: 10, color: "#fff", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                            Book Now <ChevronRightIcon size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer row with contact links */}
                  <div style={{ borderTop: `1px solid ${B.gray100}`, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: B.gray50 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[
                        { icon: <PhoneIcon size={13} />, label: "Call", href: `tel:+15551234567` },
                        { icon: <VideoIcon size={13} />, label: "Video", href: "#" },
                      ].map((a, i) => (
                        <a key={i} href={a.href} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 8, color: B.gray500, fontSize: "0.7rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = B.pinkDark; e.currentTarget.style.color = B.red; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = B.gray200; e.currentTarget.style.color = B.gray500; }}>
                          {a.icon} {a.label}
                        </a>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {nurse.languages.map((lang, i) => (
                        <span key={i} style={{ padding: "3px 8px", background: "#fff", border: `1px solid ${B.gray200}`, borderRadius: 6, fontSize: "0.62rem", color: B.gray400, fontWeight: 600 }}>{lang}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", borderRadius: 20, border: `1px solid ${B.gray200}` }}>
                <div style={{ width: 56, height: 56, background: B.pinkLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: B.red }}>
                  <SearchIcon size={22} />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: B.gray700, marginBottom: 6 }}>No nurses match your search</p>
                <p style={{ fontSize: "0.82rem", color: B.gray400, marginBottom: 18 }}>Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} style={{ padding: "10px 20px", background: `linear-gradient(135deg,${B.red},${B.redLight})`, border: "none", borderRadius: 100, color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
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