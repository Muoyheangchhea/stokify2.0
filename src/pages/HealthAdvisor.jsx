import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

// ─── Inline SVG Icons ───
const Icon = ({ path, size = 18, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d={path} />
  </svg>
);
const HeartIcon = (p) => (
  <Icon
    {...p}
    path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  />
);
const RunIcon = (p) => (
  <Icon
    {...p}
    path="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0M5.88 8.17l1.41 1.42 1.41-1.42L7.3 6.75zM20 12h-4l-2-4-4 3-2 5h12M8 19l-2 3M16 19l2 3"
  />
);
const BedIcon = (p) => (
  <Icon {...p} path="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2M2 15h20" />
);
const DropIcon = (p) => (
  <Icon {...p} path="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
);
const ActivityIcon = (p) => <Icon {...p} path="M22 12h-4l-3 9L9 3l-3 9H2" />;
const SendIcon = (p) => (
  <Icon {...p} path="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
);
const BotIcon = (p) => (
  <Icon
    {...p}
    path="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M5 14v7h14v-7M9 18h2v2H9zm4 0h2v2h-2z"
  />
);
const UserIcon = (p) => (
  <Icon
    {...p}
    path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
  />
);
const XIcon = (p) => <Icon {...p} path="M18 6L6 18M6 6l12 12" />;
const CheckIcon = (p) => <Icon {...p} path="M20 6L9 17l-5-5" />;
const ArrowIcon = (p) => <Icon {...p} path="M5 12h14M12 5l7 7-7 7" />;
const ZapIcon = (p) => <Icon {...p} path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
const WeightIcon = (p) => (
  <Icon
    {...p}
    path="M12 3a1 1 0 0 1 1 1v1h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5V4a1 1 0 0 1 1-1z"
  />
);
const AlertIcon = (p) => (
  <Icon
    {...p}
    path="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"
  />
);
const LeafIcon = (p) => (
  <Icon
    {...p}
    path="M2 22c1.25-1.25 2.5-2.5 3.75-5 1.25-2.5 3.75-7.5 6.25-9.17C14.5 6.17 17 7 19 9c2 2 3 4.5 3 7-2.5 0-5-.5-7-2-2-1.5-3-4-3-4s-.5 2.5-2 5c-1.5 2.5-3 5-8 7z"
  />
);

// ─── Strokify Brand Tokens ───
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
  // category accents
  nutrition: "#16A34A",
  exercise: "#EA580C",
  sleep: "#7C3AED",
  mental: "#DB2777",
  water: "#0284C7",
  steps: "#D97706",
};

// ─── Helper to get first name ───
const getFirstName = (fullName) => {
  if (!fullName) return "User";
  return fullName.split(" ")[0];
};

export default function HealthAdvisor() {
  const { user } = useAuth();
  const userName = user?.name || "User";
  const firstName = getFirstName(userName);

  // User data - in a real app, this would come from your API/context
  const userData = {
    name: userName,
    age: 35,
    bmi: 22.5,
    bloodPressure: "118/76",
    heartRate: 72,
    sleepHours: 7.5,
    waterIntake: 6,
    steps: 7234,
  };

  const wellnessCategories = [
    {
      id: "nutrition",
      title: "Nutrition",
      color: B.nutrition,
      score: 85,
      tips: [
        "Add one serving of vegetables to each meal",
        "Choose whole grains over refined carbs",
        "Limit processed foods to 1–2 times/week",
        "Include lean protein in every meal",
      ],
      recommendations: [
        {
          title: "Mediterranean Diet",
          description: "Rich in fruits, vegetables, and healthy fats",
          action: "Try a Greek salad with olive oil today",
        },
        {
          title: "Hydration Goal",
          description: "Aim for 8 glasses of water daily",
          action: "Keep a water bottle at your desk",
        },
      ],
    },
    {
      id: "exercise",
      title: "Activity",
      color: B.exercise,
      score: 62,
      tips: [
        "Take the stairs instead of the elevator",
        "Walk for 10 minutes after each meal",
        "Try 20 minutes of stretching today",
        "Aim for 150 minutes of cardio weekly",
      ],
      recommendations: [
        {
          title: "Daily Walk",
          description: "30-minute brisk walk burns ~150 calories",
          action: "Schedule a walk during your lunch break",
        },
        {
          title: "Strength Training",
          description: "2–3 sessions per week builds muscle mass",
          action: "Try 15 minutes of bodyweight exercises",
        },
      ],
    },
    {
      id: "sleep",
      title: "Sleep",
      color: B.sleep,
      score: 78,
      tips: [
        "Maintain a consistent sleep schedule",
        "Avoid screens 1 hour before bed",
        "Keep your bedroom cool and dark",
        "Limit caffeine after 2 PM",
      ],
      recommendations: [
        {
          title: "Sleep Routine",
          description: "7–9 hours of quality sleep is optimal",
          action: "Try going to bed 15 minutes earlier",
        },
        {
          title: "Wind-Down Ritual",
          description: "A calming pre-sleep routine improves quality",
          action: "Read a book or practice deep breathing",
        },
      ],
    },
    {
      id: "mental",
      title: "Mental",
      color: B.mental,
      score: 71,
      tips: [
        "Practice 5 minutes of mindfulness daily",
        "Take short breaks during work",
        "Connect with friends or family",
        "Write down three things you're grateful for",
      ],
      recommendations: [
        {
          title: "Stress Management",
          description: "Chronic stress directly affects physical health",
          action: "Try a 5-minute breathing exercise now",
        },
        {
          title: "Social Connection",
          description: "Strong relationships improve longevity",
          action: "Call a friend you haven't spoken to recently",
        },
      ],
    },
  ];

  const quickStats = [
    {
      label: "BMI",
      value: userData.bmi,
      unit: "",
      color: B.nutrition,
      icon: <WeightIcon size={16} />,
    },
    {
      label: "Blood Pressure",
      value: userData.bloodPressure,
      unit: "mmHg",
      color: B.exercise,
      icon: <HeartIcon size={16} />,
    },
    {
      label: "Heart Rate",
      value: userData.heartRate,
      unit: "bpm",
      color: B.mental,
      icon: <ActivityIcon size={16} />,
    },
    {
      label: "Sleep",
      value: userData.sleepHours,
      unit: "hrs",
      color: B.sleep,
      icon: <BedIcon size={16} />,
    },
    {
      label: "Water",
      value: userData.waterIntake,
      unit: "/ 8 gl",
      color: B.water,
      icon: <DropIcon size={16} />,
    },
    {
      label: "Steps",
      value: userData.steps.toLocaleString(),
      unit: "steps",
      color: B.steps,
      icon: <RunIcon size={16} />,
    },
  ];

  const suggestedQuestions = [
    "How's my BMI?",
    "Blood pressure check",
    "Improve my sleep",
    "Am I hydrated enough?",
    "Step count tips",
    "Managing stress",
  ];

  const generateResponse = (q) => {
    q = q.toLowerCase();
    if (q.includes("bmi") || q.includes("weight"))
      return `Your BMI of ${userData.bmi} is in the healthy range (18.5–24.9). Well-balanced for your height — keep it up!`;
    if (q.includes("blood pressure") || q.includes("bp"))
      return `Your blood pressure (${userData.bloodPressure}) is optimal. Continue with regular exercise and a low-sodium diet.`;
    if (q.includes("heart rate") || q.includes("pulse"))
      return `Your resting heart rate of ${userData.heartRate} bpm is in the healthy range (60–100 bpm). Great cardiovascular fitness.`;
    if (q.includes("sleep") || q.includes("tired"))
      return `You're getting ${userData.sleepHours} hours — right in the 7–9 recommended range. Consistent bedtimes, even on weekends, will improve quality further.`;
    if (q.includes("water") || q.includes("hydrat"))
      return `You're at ${userData.waterIntake}/8 glasses today. A visible water bottle on your desk is one of the easiest habit nudges you can make.`;
    if (q.includes("step") || q.includes("walk") || q.includes("exercise"))
      return `You've logged ${userData.steps.toLocaleString()} steps — just ${(10000 - userData.steps).toLocaleString()} away from 10,000. A short evening walk would close that gap.`;
    if (q.includes("stress") || q.includes("anxiet") || q.includes("mental"))
      return `Try box breathing: inhale 4 counts, hold 4, exhale 4. Even 5 minutes of mindfulness daily measurably reduces cortisol.`;
    if (q.includes("risk") || q.includes("overall") || q.includes("healthy"))
      return `Your overall health risk is low. Blood pressure and heart rate are both optimal. Key focus: water intake and daily steps.`;
    const defaults = [
      `I can analyze your BMI (${userData.bmi}), blood pressure (${userData.bloodPressure}), sleep, hydration, and activity. What would you like to explore?`,
      `Your biggest opportunity is your step count and hydration. Would you like tips on either?`,
      `Your health data looks solid. Ask me about any metric — heart rate, sleep quality, nutrition, or stress management.`,
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  // ─── Circular Progress ───
  function CircleProgress({ score, color, size = 88 }) {
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const [dash, setDash] = useState(0);
    useEffect(() => {
      const t = setTimeout(() => setDash((score / 100) * circ), 60);
      return () => clearTimeout(t);
    }, [score, circ]);
    return (
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={B.gray100}
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ - dash}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
    );
  }

  const [activeCategory, setActiveCategory] = useState("nutrition");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: `Hi ${firstName}! I'm your AI Health Advisor. Ask me anything about your health metrics, wellness goals, or lifestyle habits.`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing]);

  const activeCat = wellnessCategories.find((c) => c.id === activeCategory);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const sendMessage = (text = null) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInteracted(true);
    setMessages((p) => [
      ...p,
      {
        id: Date.now(),
        type: "user",
        content: msg,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          type: "bot",
          content: generateResponse(msg),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setTyping(false);
    }, 1400);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: B.gray50,
        fontFamily: "'DM Sans',-apple-system, BlinkMacSystemFont, sans-serif",
        color: B.gray900,
        paddingBottom: "80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${B.pinkDark}; border-radius: 10px; }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px) scale(0.97); } to { opacity:1; transform:none; } }
        @keyframes bounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .s-stat:hover { border-color:${B.pinkDark}!important; transform:translateY(-2px)!important; box-shadow:0 8px 24px rgba(230,62,78,0.1)!important; }
        .s-rec:hover  { transform:translateY(-2px)!important; box-shadow:0 8px 20px rgba(0,0,0,0.07)!important; }
        .s-tab:hover  { background:${B.pink}!important; border-color:${B.pinkDark}!important; }
        .s-sug:hover  { background:${B.pink}!important; border-color:${B.pinkDark}!important; color:${B.red}!important; }
        .s-chatbtn:hover { transform:translateY(-3px)!important; box-shadow:0 16px 40px rgba(230,62,78,0.45)!important; }
        input::placeholder { color:${B.gray300}!important; }
        @media(max-width:640px){
          .s-stats-grid { grid-template-columns:repeat(2,1fr)!important; }
          .s-score-row  { flex-direction:column!important; }
          .s-chatbtn-lbl{ display:none!important; }
          .s-chatbtn    { padding:14px!important; border-radius:50%!important; }
          .s-chatwin    { width:calc(100vw - 32px)!important; right:16px!important; left:16px!important; bottom:80px!important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px 24px 0" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: B.gray900,
              }}
            >
              Good morning, <span style={{ color: B.red }}>{firstName}</span>
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: B.gray400,
                marginTop: "6px",
                fontWeight: "400",
              }}
            >
              {today}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "100px",
              fontSize: "0.8rem",
              color: "#16A34A",
              fontWeight: "600",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 8px #22C55E44",
                display: "inline-block",
              }}
            />
            Health Risk: Low
          </div>
        </div>

        {/* Daily Tip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "18px 22px",
            background: B.pinkLight,
            border: `1px solid ${B.pinkDark}`,
            borderRadius: "18px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              background: B.pink,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: B.red,
              flexShrink: 0,
            }}
          >
            <DropIcon size={20} />
          </div>
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: "700",
                color: B.red,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "3px",
              }}
            >
              Daily Tip
            </div>
            <div
              style={{ fontSize: "0.9rem", color: B.gray700, lineHeight: 1.45 }}
            >
              Start your day with a glass of water — it boosts your metabolism
              by up to 30% in the first hour.
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 40px" }}
      >
        <div
          className="s-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
            gap: "12px",
          }}
        >
          {quickStats.map((s, i) => (
            <div
              key={i}
              className="s-stat"
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "18px",
                border: `1px solid ${B.gray200}`,
                transition: "all 0.2s ease",
                cursor: "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    background: `${s.color}14`,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: s.color,
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: s.color,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  color: B.gray400,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: "4px",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "1.45rem",
                  fontWeight: "700",
                  color: s.color,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              {s.unit && (
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: B.gray400,
                    marginTop: "2px",
                  }}
                >
                  {s.unit}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── WELLNESS CATEGORIES ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 48px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "clamp(1.1rem,2.5vw,1.35rem)",
              fontWeight: "700",
              color: B.gray900,
              letterSpacing: "-0.02em",
            }}
          >
            Wellness Categories
          </h2>
          <p
            style={{ fontSize: "0.82rem", color: B.gray400, marginTop: "4px" }}
          >
            Personalized insights based on your health profile
          </p>
        </div>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "4px",
            marginBottom: "20px",
            scrollbarWidth: "none",
          }}
        >
          {wellnessCategories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className="s-tab"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 18px",
                  background: active ? B.pink : "#fff",
                  border: `1px solid ${active ? B.pinkDark : B.gray200}`,
                  borderRadius: "100px",
                  color: active ? B.red : B.gray500,
                  fontSize: "0.82rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {cat.title}
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "100px",
                    fontSize: "0.68rem",
                    background: active ? `${cat.color}14` : B.gray100,
                    color: active ? cat.color : B.gray400,
                    fontWeight: "700",
                  }}
                >
                  {cat.score}%
                </span>
              </button>
            );
          })}
        </div>
        {/* Category Card */}
        {activeCat && (
          <div
            style={{
              background: "#fff",
              border: `1px solid ${B.gray200}`,
              borderRadius: "24px",
              padding: "clamp(20px,4vw,32px)",
            }}
          >
            <div
              className="s-score-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "28px",
                paddingBottom: "28px",
                borderBottom: `1px solid ${B.gray100}`,
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <CircleProgress
                  score={activeCat.score}
                  color={activeCat.color}
                  size={88}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    fontSize: "1.05rem",
                    fontWeight: "700",
                    color: activeCat.color,
                  }}
                >
                  {activeCat.score}%
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: activeCat.color,
                    marginBottom: "5px",
                  }}
                >
                  {activeCat.title} Score
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: B.gray500,
                    lineHeight: 1.5,
                  }}
                >
                  Your {activeCat.title.toLowerCase()} habits are{" "}
                  {activeCat.score >= 80
                    ? "excellent — keep it up!"
                    : activeCat.score >= 60
                      ? "good, with room to grow."
                      : "developing — let's improve together."}
                </div>
              </div>
            </div>
            {/* Tips */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: "700",
                  color: B.gray400,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                Quick Tips
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                  gap: "10px",
                }}
              >
                {activeCat.tips.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "9px",
                      padding: "12px 14px",
                      background: B.pinkLight,
                      border: `1px solid ${B.pinkDark}`,
                      borderRadius: "12px",
                    }}
                  >
                    <CheckIcon
                      size={13}
                      style={{
                        color: activeCat.color,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: B.gray700,
                        lineHeight: 1.5,
                      }}
                    >
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Recommendations */}
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: "700",
                  color: B.gray400,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                Recommendations
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                  gap: "12px",
                }}
              >
                {activeCat.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="s-rec"
                    style={{
                      padding: "18px",
                      background: B.gray50,
                      border: `1px solid ${B.gray200}`,
                      borderTop: `3px solid ${activeCat.color}`,
                      borderRadius: "16px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "6px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: "700",
                          color: B.gray900,
                        }}
                      >
                        {rec.title}
                      </div>
                      <ArrowIcon
                        size={13}
                        style={{
                          color: activeCat.color,
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: B.gray500,
                        marginBottom: "12px",
                        lineHeight: 1.5,
                      }}
                    >
                      {rec.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 12px",
                        background: `${activeCat.color}0e`,
                        border: `1px solid ${activeCat.color}20`,
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        color: activeCat.color,
                      }}
                    >
                      <ZapIcon size={11} />
                      {rec.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── DAILY GOALS ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 48px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "clamp(1.1rem,2.5vw,1.35rem)",
              fontWeight: "700",
              color: B.gray900,
              letterSpacing: "-0.02em",
            }}
          >
            Daily Goals
          </h2>
          <p
            style={{ fontSize: "0.82rem", color: B.gray400, marginTop: "4px" }}
          >
            Track your progress toward today's targets
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: "14px",
          }}
        >
          {[
            {
              label: "Steps",
              value: `${userData.steps.toLocaleString()} / 10,000`,
              pct: (userData.steps / 10000) * 100,
              color: B.steps,
              icon: <RunIcon size={15} />,
            },
            {
              label: "Water Intake",
              value: `${userData.waterIntake} / 8 glasses`,
              pct: (userData.waterIntake / 8) * 100,
              color: B.water,
              icon: <DropIcon size={15} />,
            },
            {
              label: "Sleep",
              value: `${userData.sleepHours} / 8 hrs`,
              pct: (userData.sleepHours / 8) * 100,
              color: B.sleep,
              icon: <BedIcon size={15} />,
            },
            {
              label: "Fruits & Veg",
              value: "4 / 5 servings",
              pct: 80,
              color: B.nutrition,
              icon: <LeafIcon size={15} />,
            },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                padding: "18px",
                background: "#fff",
                border: `1px solid ${B.gray200}`,
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "14px",
                }}
              >
                <span style={{ color: p.color }}>{p.icon}</span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: B.gray600,
                    flex: 1,
                    fontWeight: "500",
                  }}
                >
                  {p.label}
                </span>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: B.gray800,
                    fontWeight: "600",
                  }}
                >
                  {p.value}
                </span>
              </div>
              <div
                style={{
                  height: "5px",
                  background: B.gray100,
                  borderRadius: "100px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: mounted ? `${Math.min(p.pct, 100)}%` : "0%",
                    background: `linear-gradient(90deg,${p.color}88,${p.color})`,
                    borderRadius: "100px",
                    transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HEALTH INSIGHTS ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 48px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "clamp(1.1rem,2.5vw,1.35rem)",
              fontWeight: "700",
              color: B.gray900,
              letterSpacing: "-0.02em",
            }}
          >
            Health Insights
          </h2>
          <p
            style={{ fontSize: "0.82rem", color: B.gray400, marginTop: "4px" }}
          >
            AI-powered analysis of your metrics
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "14px",
          }}
        >
          {[
            {
              positive: true,
              icon: <ActivityIcon size={16} />,
              title: "Blood Pressure Optimal",
              text: `Your reading (${userData.bloodPressure}) is ideal. Keep up your current habits.`,
            },
            {
              positive: false,
              icon: <RunIcon size={16} />,
              title: "Boost Daily Steps",
              text: `You're at ${userData.steps.toLocaleString()} steps. Reaching 10,000 improves cardiovascular health significantly.`,
            },
            {
              positive: true,
              icon: <BedIcon size={16} />,
              title: "Sleep Quality is Good",
              text: `${userData.sleepHours} hours meets recommendations. Consistent timing would further boost recovery.`,
            },
            {
              positive: false,
              icon: <DropIcon size={16} />,
              title: "Hydration Gap",
              text: `You're at ${userData.waterIntake}/8 glasses. A visible water bottle on your desk is proven to increase intake.`,
            },
          ].map((ins, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                padding: "18px",
                background: ins.positive ? "#F0FDF4" : B.pinkLight,
                border: `1px solid ${ins.positive ? "#BBF7D0" : B.pinkDark}`,
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  flexShrink: 0,
                  background: ins.positive ? "#DCFCE7" : B.pink,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: ins.positive ? "#16A34A" : B.red,
                }}
              >
                {ins.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    color: B.gray900,
                    marginBottom: "4px",
                  }}
                >
                  {ins.title}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: B.gray500,
                    lineHeight: 1.5,
                  }}
                >
                  {ins.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUOTE ── */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 48px" }}
      >
        <div
          style={{
            padding: "clamp(24px,5vw,48px)",
            background: `linear-gradient(145deg,${B.pinkLight},#fff)`,
            border: `1px solid ${B.pinkDark}`,
            borderRadius: "24px",
            textAlign: "center",
          }}
        >
          <LeafIcon size={28} style={{ color: B.red, opacity: 0.3 }} />
          <p
            style={{
              fontSize: "clamp(1rem,2.5vw,1.25rem)",
              fontStyle: "italic",
              color: B.gray600,
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "12px auto",
            }}
          >
            "The greatest wealth is health. Small daily improvements lead to
            stunning long-term results."
          </p>
          <p style={{ fontSize: "0.8rem", color: B.gray400 }}>— Virgil</p>
        </div>
      </div>

      {/* ── CHAT BUTTON ── */}
      <button
        className="s-chatbtn"
        onClick={() => setChatOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 22px",
          background: `linear-gradient(135deg,${B.red},${B.redLight})`,
          color: "#fff",
          border: "none",
          borderRadius: "100px",
          fontSize: "0.88rem",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(230,62,78,0.35)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex: 200,
          letterSpacing: "0.01em",
        }}
      >
        <BotIcon size={18} />
        <span className="s-chatbtn-lbl">
          {chatOpen ? "Close Chat" : "Ask Health AI"}
        </span>
      </button>

      {/* ── CHAT WINDOW ── */}
      {chatOpen && (
        <div
          className="s-chatwin"
          style={{
            position: "fixed",
            bottom: "92px",
            right: "28px",
            width: "clamp(300px,90vw,390px)",
            height: "580px",
            background: "#fff",
            border: `1px solid ${B.gray200}`,
            borderRadius: "24px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.14)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 199,
            animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${B.pinkDark}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: B.pinkLight,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: `linear-gradient(135deg,${B.red},${B.redLight})`,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <BotIcon size={16} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: "700",
                    color: B.gray900,
                  }}
                >
                  AI Health Advisor
                </div>
                <div style={{ fontSize: "0.7rem", color: B.gray400 }}>
                  Always here for your wellness questions
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: B.pink,
                border: `1px solid ${B.pinkDark}`,
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                color: B.red,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <XIcon size={13} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: B.gray50,
            }}
          >
            {messages.map((m) => {
              const isUser = m.type === "user";
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    flexDirection: isUser ? "row-reverse" : "row",
                    maxWidth: "88%",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      flexShrink: 0,
                      background: isUser
                        ? `linear-gradient(135deg,${B.red},${B.redLight})`
                        : B.pink,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isUser ? "#fff" : B.red,
                    }}
                  >
                    {isUser ? <UserIcon size={13} /> : <BotIcon size={13} />}
                  </div>
                  <div>
                    <div
                      style={{
                        padding: "10px 14px",
                        background: isUser
                          ? `linear-gradient(135deg,${B.red},${B.redLight})`
                          : "#fff",
                        border: `1px solid ${isUser ? "transparent" : B.gray200}`,
                        borderRadius: isUser
                          ? "16px 4px 16px 16px"
                          : "4px 16px 16px 16px",
                        fontSize: "0.82rem",
                        color: isUser ? "#fff" : B.gray700,
                        lineHeight: 1.55,
                      }}
                    >
                      {m.content}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: B.gray400,
                        marginTop: "3px",
                        textAlign: isUser ? "right" : "left",
                      }}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
            {typing && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignSelf: "flex-start",
                  maxWidth: "88%",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    flexShrink: 0,
                    background: B.pink,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: B.red,
                  }}
                >
                  <BotIcon size={13} />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#fff",
                    border: `1px solid ${B.gray200}`,
                    borderRadius: "4px 16px 16px 16px",
                  }}
                >
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: B.red,
                          display: "block",
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested */}
          {!interacted && (
            <div
              style={{
                padding: "10px 14px",
                borderTop: `1px solid ${B.gray100}`,
                background: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  color: B.gray400,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Suggested
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="s-sug"
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: "6px 12px",
                      background: B.pinkLight,
                      border: `1px solid ${B.pinkDark}`,
                      borderRadius: "100px",
                      color: B.gray600,
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontWeight: "500",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px 14px",
              borderTop: `1px solid ${B.gray100}`,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your health..."
              style={{
                flex: 1,
                padding: "10px 14px",
                background: B.pinkLight,
                border: `1px solid ${B.pinkDark}`,
                borderRadius: "100px",
                color: B.gray900,
                fontSize: "0.82rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = B.red)}
              onBlur={(e) => (e.target.style.borderColor = B.pinkDark)}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              style={{
                width: "38px",
                height: "38px",
                background: input.trim()
                  ? `linear-gradient(135deg,${B.red},${B.redLight})`
                  : B.gray100,
                border: "none",
                borderRadius: "50%",
                color: input.trim() ? "#fff" : B.gray300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "not-allowed",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              <SendIcon size={14} />
            </button>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderTop: `1px solid ${B.pinkDark}`,
              fontSize: "0.65rem",
              color: B.gray400,
              background: B.pinkLight,
            }}
          >
            <AlertIcon size={11} style={{ color: B.red, flexShrink: 0 }} />
            AI-generated. Always consult a healthcare professional for medical
            concerns.
          </div>
        </div>
      )}
    </div>
  );
}
