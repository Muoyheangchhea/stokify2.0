import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/HealthAdvisor.css";
import API_BASE_URL from '../services/config'; 

// ─── API base (matches your existing strokeService setup) ─────────────────────
const API_URL = API_BASE_URL;

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const I = {
  Heart:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  Activity: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Droplets: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
  Moon:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Apple:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>,
  Chat:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  X:        () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Send:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  Sparkles: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
  Refresh:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Check:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  User:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bot:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>,
  Zap:      () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Chart:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>,
  ClipboardList: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>,
  Loader:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{animation:'ha-spin 1s linear infinite'}}><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>,
  ArrowRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  History:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>,
};

// ─── Claude API helper ────────────────────────────────────────────────────────
async function callClaude(systemPrompt, userMsg, history = []) {
  // This will still have CORS issues - you'll need a backend proxy for this
  console.warn('Claude API call attempted - this will fail due to CORS');
  return 'Claude API is not available due to CORS. Please set up a backend proxy.';
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('token'); }
function getUser()  {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

// ─── Category config ──────────────────────────────────────────────────────────
const CATS = [
  { id: 'cardiovascular', label: 'Heart Health',   Icon: 'Heart',    color: '#E63E4E', bg: 'rgba(230,62,78,0.07)' },
  { id: 'nutrition',      label: 'Nutrition',      Icon: 'Apple',    color: '#16a34a', bg: 'rgba(22,163,74,0.07)' },
  { id: 'activity',       label: 'Activity',       Icon: 'Activity', color: '#ea580c', bg: 'rgba(234,88,12,0.07)' },
  { id: 'sleep',          label: 'Sleep & Stress', Icon: 'Moon',     color: '#7c3aed', bg: 'rgba(124,58,237,0.07)' },
  { id: 'bloodsugar',     label: 'Blood Sugar',    Icon: 'Droplets', color: '#0284c7', bg: 'rgba(2,132,199,0.07)' },
];

const DEFAULT_GOALS = [
  { id: 1, label: 'Days with 30-min exercise',    target: 20, done: 0, color: '#ea580c', Icon: 'Activity' },
  { id: 2, label: 'Days following balanced diet', target: 25, done: 0, color: '#16a34a', Icon: 'Apple'    },
  { id: 3, label: 'Days with 7+ hours sleep',     target: 22, done: 0, color: '#7c3aed', Icon: 'Moon'     },
  { id: 4, label: 'Blood pressure check days',    target: 15, done: 0, color: '#E63E4E', Icon: 'Heart'    },
];

const SUGGESTED_QS = [
  'What foods should I avoid?',
  'How can I lower my blood pressure?',
  'Best exercises for my risk level?',
  'What does my BMI mean?',
  'Warning signs I should watch for?',
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Blurred ghost of the dashboard sitting behind the gate card
function GhostDashboard() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
      <div style={{ filter:'blur(6px)', opacity:.35, transform:'scale(1.02)', transformOrigin:'top center', padding:'36px 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:28 }}>
          <div>
            <div style={{ width:220, height:36, borderRadius:10, background:'#e2e8f0', marginBottom:8 }} />
            <div style={{ width:300, height:16, borderRadius:6, background:'#edf0f6' }} />
          </div>
          <div style={{ width:140, height:38, borderRadius:100, background:'#fca5a5' }} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:28 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background:'white', borderRadius:16, padding:16, border:'1px solid #edf0f6' }}>
              <div style={{ width:'60%', height:11, borderRadius:5, background:'#edf0f6', marginBottom:8 }} />
              <div style={{ width:'45%', height:28, borderRadius:8, background:'#e2e8f0' }} />
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          {[100,110,95,130,105].map((w,i) => (
            <div key={i} style={{ width:w, height:36, borderRadius:100, background: i===0 ? '#fca5a5' : '#edf0f6' }} />
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:13, background:'white', borderRadius:24, padding:26, border:'1px solid #edf0f6' }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ borderRadius:16, padding:17, background:'#f8f9fc', border:'1px solid #edf0f6' }}>
              <div style={{ width:'40%', height:16, borderRadius:6, background:'#e2e8f0', marginBottom:10 }} />
              <div style={{ width:'90%', height:12, borderRadius:5, background:'#edf0f6', marginBottom:6 }} />
              <div style={{ width:'70%', height:12, borderRadius:5, background:'#edf0f6', marginBottom:6 }} />
              <div style={{ width:'55%', height:12, borderRadius:5, background:'#edf0f6' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ isLoggedIn, user, onGoToAssessment, onDismiss }) {
  const step = isLoggedIn ? 1 : 0;
  const name = user?.name?.split(' ')[0];

  const steps = [
    { label: 'Sign in or create a free account', done: isLoggedIn },
    { label: 'Complete your 5-minute stroke risk assessment', done: false },
    { label: 'Unlock your full AI Health Advisor dashboard', done: false },
  ];

  return (
    <div className="ha-gate" style={{ position:'relative', minHeight:'100vh' }}>
      <GhostDashboard />
      <div style={{
        position:'absolute', inset:0,
        background:'rgba(248,249,252,0.55)',
        backdropFilter:'blur(2px)',
      }} />
      <div className="ha-gate-card" style={{ position:'relative', zIndex:2 }}>
        <button className="ha-gate-close" onClick={onDismiss} aria-label="Close">
          <I.X />
        </button>
        <h2 className="ha-gate-title">
          {isLoggedIn && name
            ? <>Hi {name}! Your <span>Health Advisor</span> is waiting</>
            : <>Complete your assessment to unlock <span>Health Advisor</span></>
          }
        </h2>
        <p className="ha-gate-desc">
          {isLoggedIn
            ? "Your personalised AI insights, monthly health tracker, and chatbot are ready — all you need to do is take the stroke risk assessment first."
            : "Get personalised AI health insights, a monthly tracker, and an AI chatbot — all tailored to your stroke risk profile. Start with a free assessment."
          }
        </p>
        <div className="ha-gate-steps">
          {steps.map((s, i) => (
            <div key={i} className={`ha-gate-step ${s.done ? 'done' : ''}`}>
              <span className="ha-gate-step-num">
                {s.done ? <I.Check /> : i + 1}
              </span>
              <span style={{ flex:1 }}>{s.label}</span>
              {i === step && !s.done && (
                <span style={{
                  fontSize:'.6rem', fontWeight:700, padding:'2px 8px',
                  borderRadius:100, background:'rgba(230,62,78,.1)', color:'#E63E4E',
                  whiteSpace:'nowrap',
                }}>
                  You are here
                </span>
              )}
            </div>
          ))}
        </div>
        <button className="ha-gate-btn primary" onClick={onGoToAssessment}>
          <I.ClipboardList />
          {isLoggedIn ? 'Start Stroke Risk Assessment' : 'Take the Free Assessment'}
          <I.ArrowRight />
        </button>
        <p style={{ fontSize:'.72rem', color:'#b0bac8', marginTop:14, lineHeight:1.5 }}>
          Takes about 5 minutes · No medical equipment needed · Results are instant
        </p>
      </div>
    </div>
  );
}

// MAIN DASHBOARD
function AdvisorDashboard({ report, user, onGoToAssessment }) {
  const { risk, patientInfo, vitalSigns, factors } = report;

  const [activeTab,   setActiveTab]   = useState('cardiovascular');
  const [insights,    setInsights]    = useState({});
  const [loadingTab,  setLoadingTab]  = useState(null);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [messages,    setMessages]    = useState([{
    role: 'bot',
    text: `Hi${user?.name ? ' ' + user.name.split(' ')[0] : ''}! I've reviewed your ${risk.level.toLowerCase()} stroke risk assessment (score: ${risk.score}%). Ask me anything about your results or how to improve your health.`,
    time: getTime(),
  }]);
  const [chatInput,   setChatInput]   = useState('');
  const [chatBusy,    setChatBusy]    = useState(false);
  const [goals,       setGoals]       = useState(DEFAULT_GOALS);
  const [ticked,      setTicked]      = useState({});
  const msgsEnd = useRef(null);

  const sysPrompt = `You are a compassionate health advisor for Strokify, a stroke risk app used in Cambodia.

Patient profile:
- Name: ${user?.name || 'Patient'}
- Risk: ${risk.level} (${risk.score}%)
- Age: ${patientInfo?.age}, Sex: ${patientInfo?.sex}
- BMI: ${patientInfo?.bmi} (${patientInfo?.bmiCategory})
- BP: ${vitalSigns?.bloodPressure} — ${vitalSigns?.bpStatus}
- Glucose: ${vitalSigns?.glucose} mg/dL
- Top risk factors: ${(factors || []).map(f => f.factor).join(', ')}

Instructions:
- Keep replies concise (3–5 sentences max)
- Be warm, supportive, and practical
- Tailor advice to Southeast Asian lifestyle and diet (Cambodian context when relevant)
- Always suggest consulting a doctor for clinical decisions
- Plain text only — no markdown, no bullet points`;

  useEffect(() => { msgsEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadInsight = useCallback(async (tabId) => {
    if (insights[tabId] || loadingTab === tabId) return;
    setLoadingTab(tabId);
    
    // Mock insights for now since Claude API has CORS issues
    setTimeout(() => {
      const mockInsights = {
        cardiovascular: [
          { title: 'Monitor Blood Pressure', detail: 'Check your blood pressure regularly at home, especially if you have a family history of hypertension.', priority: 'high' },
          { title: 'Reduce Sodium Intake', detail: 'Limit salty foods like prahok, fish sauce, and processed foods common in Cambodian cuisine.', priority: 'high' },
          { title: 'Regular Heart Check-ups', detail: 'Schedule annual check-ups with your doctor to monitor heart health.', priority: 'medium' },
          { title: 'Know the Warning Signs', detail: 'Learn the signs of heart attack and stroke - chest pain, shortness of breath, and arm pain.', priority: 'medium' }
        ],
        nutrition: [
          { title: 'Balanced Diet', detail: 'Aim for a mix of vegetables, lean proteins, and whole grains in your daily meals.', priority: 'high' },
          { title: 'Limit Sugary Drinks', detail: 'Reduce consumption of sweetened beverages which can spike blood sugar.', priority: 'high' },
          { title: 'Portion Control', detail: 'Be mindful of portion sizes, especially with rice and fried foods.', priority: 'medium' },
          { title: 'Healthy Snacks', detail: 'Choose fresh fruits like mango, banana, or dragonfruit instead of processed snacks.', priority: 'medium' }
        ],
        activity: [
          { title: 'Daily Walking', detail: 'Start with 15-20 minute walks daily and gradually increase duration.', priority: 'high' },
          { title: 'Stay Active', detail: 'Incorporate movement throughout your day - take stairs, walk to market, or do household chores.', priority: 'high' },
          { title: 'Find Activities You Enjoy', detail: 'Try dancing, swimming, or cycling to make exercise more enjoyable.', priority: 'medium' },
          { title: 'Exercise with Others', detail: 'Join community exercise groups or walk with friends for motivation.', priority: 'low' }
        ],
        sleep: [
          { title: 'Consistent Sleep Schedule', detail: 'Go to bed and wake up at the same time each day, even on weekends.', priority: 'high' },
          { title: 'Create a Relaxing Routine', detail: 'Develop a pre-sleep routine like reading, gentle stretching, or meditation.', priority: 'high' },
          { title: 'Limit Screen Time', detail: 'Avoid phones and screens at least 1 hour before bedtime.', priority: 'medium' },
          { title: 'Manage Stress', detail: 'Practice deep breathing or mindfulness to reduce daily stress.', priority: 'medium' }
        ],
        bloodsugar: [
          { title: 'Monitor Glucose Levels', detail: 'Check your blood sugar regularly if diabetic or pre-diabetic.', priority: 'high' },
          { title: 'Choose Complex Carbs', detail: 'Opt for brown rice, whole grains, and vegetables over white rice and sugary foods.', priority: 'high' },
          { title: 'Eat Regular Meals', detail: 'Don\'t skip meals - eat at consistent times to maintain stable blood sugar.', priority: 'medium' },
          { title: 'Stay Hydrated', detail: 'Drink plenty of water throughout the day to help manage blood sugar.', priority: 'medium' }
        ]
      };
      
      setInsights(prev => ({ ...prev, [tabId]: mockInsights[tabId] || mockInsights.cardiovascular }));
      setLoadingTab(null);
    }, 1000);
  }, [insights, loadingTab]);

  const sendMsg = useCallback(async (txt) => {
    const msg = txt || chatInput.trim();
    if (!msg || chatBusy) return;
    setChatInput('');
    setMessages(p => [...p, { role: 'user', text: msg, time: getTime() }]);
    setChatBusy(true);
    
    // Mock response for now
    setTimeout(() => {
      setMessages(p => [...p, { 
        role: 'bot', 
        text: "I'm sorry, the AI chat feature is currently being set up. Please check back soon! In the meantime, review the health insights above for personalized recommendations.", 
        time: getTime() 
      }]);
      setChatBusy(false);
    }, 1000);
  }, [chatInput, chatBusy]);

  const logGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id && g.done < g.target ? { ...g, done: g.done + 1 } : g));
    setTicked(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setTicked(prev => ({ ...prev, [id]: false })), 700);
  };

  const cat     = CATS.find(c => c.id === activeTab);
  const CatIcon = I[cat?.Icon] || I.Heart;
  const riskGrad =
    risk.level === 'Low'  ? 'linear-gradient(135deg,#10B981,#34d399)' :
    risk.level === 'High' ? 'linear-gradient(135deg,#EF4444,#f87171)' :
                            'linear-gradient(135deg,#F59E0B,#fbbf24)';

  const assessedDate = report.generatedAt
    ? new Date(report.generatedAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    : 'Recently';

  return (
    <div className="ha-wrap">
      <div className="ha-top">
        <div>
          <h1 className="ha-title">Health <span>Advisor</span></h1>
          <p className="ha-sub">
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]}. ` : ''}
            AI-powered insights tailored to your stroke risk profile.
          </p>
        </div>
        <div className="ha-risk-pill" style={{ background: riskGrad }}>
          <span className="ha-rdot" />
          {risk.level} Risk · {risk.score}%
        </div>
      </div>

      <div className="ha-assessed-bar">
        <div className="ha-assessed-left">
          <I.History />
          <div>
            <div className="ha-assessed-label">Last assessment</div>
            <div className="ha-assessed-date">{assessedDate}</div>
          </div>
        </div>
        <button className="ha-reassess-btn" onClick={onGoToAssessment}>
          <I.Refresh /> Retake Assessment
        </button>
      </div>

      <div className="ha-sum">
        {[
          { label: 'BMI',           val: patientInfo?.bmi || '—',       sub: patientInfo?.bmiCategory || '—',  col: patientInfo?.bmiCategory === 'Healthy weight' ? '#10B981' : '#F59E0B' },
          { label: 'Blood Pressure',val: vitalSigns?.bloodPressure || '—', sub: vitalSigns?.bpStatus || '—',   col: vitalSigns?.bpStatus === 'Normal' ? '#10B981' : '#F59E0B' },
          { label: 'Glucose',       val: vitalSigns?.glucose || '—',    sub: 'mg/dL',                          col: parseInt(vitalSigns?.glucose) > 125 ? '#EF4444' : parseInt(vitalSigns?.glucose) > 100 ? '#F59E0B' : '#10B981' },
          { label: 'Risk Score',    val: `${risk.score}%`,              sub: '10-yr estimate',                 col: risk.color || '#F59E0B' },
        ].map(({ label, val, sub, col }) => (
          <div className="ha-sc" key={label}>
            <div className="ha-sl">{label}</div>
            <div className="ha-sv" style={{ color: col }}>{val}</div>
            <div className="ha-ss">{sub}</div>
          </div>
        ))}
      </div>

      <div className="ha-sh"><I.Sparkles />AI-Powered Health Insights</div>
      <div className="ha-tabs">
        {CATS.map(c => {
          const TabIco = I[c.Icon];
          return (
            <button
              key={c.id}
              className={`ha-tab ${activeTab === c.id ? 'on' : ''}`}
              style={activeTab === c.id ? { background: c.color, borderColor: c.color } : {}}
              onClick={() => { setActiveTab(c.id); loadInsight(c.id); }}
            >
              <span className="ha-ti"><TabIco /></span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="ha-panel" style={{ borderTopColor: cat?.color, borderTopWidth: 3 }}>
        <div className="ha-ph">
          <div className="ha-pico" style={{ background: cat?.bg, color: cat?.color }}><CatIcon /></div>
          <div>
            <div className="ha-pt">{cat?.label} Recommendations</div>
            <div className="ha-ps">Personalised for your profile · Powered by AI</div>
          </div>
          <button className="ha-regen" onClick={() => {
            setInsights(prev => { const n = { ...prev }; delete n[activeTab]; return n; });
            setTimeout(() => loadInsight(activeTab), 60);
          }}>
            <I.Refresh /> Refresh
          </button>
        </div>

        {loadingTab === activeTab ? (
          <div className="ha-ig">
            {[0,1,2,3].map(i => (
              <div key={i} style={{ borderRadius: 16, padding: 17, border: '1px solid #edf0f6' }}>
                <div className="ha-skel" style={{ height: 18, width: '38%', marginBottom: 10, borderRadius: 6 }} />
                <div className="ha-skel" style={{ height: 14, width: '85%', marginBottom: 6, borderRadius: 5 }} />
                <div className="ha-skel" style={{ height: 14, width: '60%', borderRadius: 5 }} />
              </div>
            ))}
          </div>
        ) : !insights[activeTab] ? (
          <div style={{ textAlign: 'center', padding: '36px 0', color: '#a8b3c4' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>✨</div>
            <p style={{ fontSize: '.88rem' }}>Click on a tab to load personalized insights…</p>
          </div>
        ) : (
          <div className="ha-ig">
            {insights[activeTab].map((item, i) => {
              const pc = item.priority === 'high' ? '#EF4444' : item.priority === 'low' ? '#10B981' : '#F59E0B';
              const pb = item.priority === 'high' ? 'rgba(239,68,68,.08)' : item.priority === 'low' ? 'rgba(16,185,129,.08)' : 'rgba(245,158,11,.08)';
              return (
                <div key={i} className="ha-ic" style={{ background: cat?.bg, borderColor: `${cat?.color}22` }}>
                  <style>{`.ha-ic:nth-child(${i+1})::before { background: ${cat?.color}; }`}</style>
                  <div className="ha-icp" style={{ background: pb, color: pc }}>
                    <I.Zap />{item.priority} priority
                  </div>
                  <div className="ha-ict">{item.title}</div>
                  <div className="ha-icd">{item.detail}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="ha-sh"><I.Calendar />Monthly Health Tracker</div>
      <div className="ha-goals">
        {goals.map(g => {
          const GIco = I[g.Icon] || I.Activity;
          const pct  = Math.round((g.done / g.target) * 100);
          return (
            <div className="ha-gc" key={g.id}>
              <div className="ha-gh">
                <div className="ha-gi" style={{ background: `${g.color}14`, color: g.color }}><GIco /></div>
                <div className="ha-glabel">{g.label}</div>
                <div className="ha-gcount" style={{ color: g.color }}>{g.done}/{g.target}</div>
              </div>
              <div className="ha-gbar">
                <div className="ha-gfill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${g.color},${g.color}99)` }} />
              </div>
              <button
                className="ha-gbtn"
                style={{
                  color: ticked[g.id] || g.done >= g.target ? g.color : '#6b7280',
                  borderColor: ticked[g.id] || g.done >= g.target ? `${g.color}44` : '#edf0f6',
                }}
                onClick={() => logGoal(g.id)}
                disabled={g.done >= g.target}
              >
                {g.done >= g.target ? <><I.Check />Completed!</> : ticked[g.id] ? <><I.Check />Logged!</> : '+ Log Today'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="ha-sh"><I.Chart />Your Risk Factor Breakdown</div>
      <div className="ha-panel">
        {(factors || []).length === 0 ? (
          <p style={{ fontSize: '.85rem', color: '#a8b3c4', textAlign: 'center', padding: '20px 0' }}>No risk factors recorded.</p>
        ) : (factors || []).map((f, i) => {
          const fc  = f.impact === 'high' ? '#EF4444' : f.impact === 'moderate' ? '#F59E0B' : '#10B981';
          const pct = Math.min(Math.round((f.points / 30) * 100), 100);
          return (
            <div className="ha-rf" key={i}>
              <div className="ha-rfh">
                <span className="ha-rfn">{f.factor}</span>
                <span className="ha-rfl" style={{ background: `${fc}14`, color: fc }}>{f.impact}</span>
              </div>
              <div className="ha-rfbar">
                <div className="ha-rfill" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${fc},${fc}88)` }} />
              </div>
            </div>
          );
        })}
      </div>

      <button className="ha-fab" onClick={() => setChatOpen(o => !o)}>
        <I.Chat /><span>Ask Health AI</span>
      </button>

      {chatOpen && (
        <div className="ha-cw">
          <div className="ha-cwh">
            <div className="ha-cav"><I.Bot /></div>
            <div>
              <div className="ha-cn">Health AI Assistant</div>
              <div className="ha-csub">Powered by AI · Always available</div>
            </div>
            <button className="ha-cxbtn" onClick={() => setChatOpen(false)}><I.X /></button>
          </div>

          <div className="ha-msgs">
            {messages.map((m, i) => (
              <div key={i} className={`ha-m ${m.role === 'user' ? 'u' : ''}`}>
                <div className="ha-mico" style={m.role === 'bot'
                  ? { background: 'rgba(230,62,78,.1)', color: '#E63E4E' }
                  : { background: 'linear-gradient(135deg,#E63E4E,#ff6b7a)', color: 'white' }
                }>
                  {m.role === 'bot' ? <I.Bot /> : <I.User />}
                </div>
                <div>
                  <div className="ha-mb">{m.text}</div>
                  <div className="ha-mt">{m.time}</div>
                </div>
              </div>
            ))}
            {chatBusy && (
              <div className="ha-m">
                <div className="ha-mico" style={{ background: 'rgba(230,62,78,.1)', color: '#E63E4E' }}><I.Bot /></div>
                <div className="ha-typing">
                  <span className="ha-td"/><span className="ha-td"/><span className="ha-td"/>
                </div>
              </div>
            )}
            <div ref={msgsEnd} />
          </div>

          {messages.length <= 2 && (
            <div className="ha-sug">
              <div className="ha-sugt">Suggested questions</div>
              <div className="ha-sugc">
                {SUGGESTED_QS.map(q => (
                  <button key={q} className="ha-chip" onClick={() => sendMsg(q)}>{q}</button>
                ))}
              </div>
            </div>
          )}

          <div className="ha-cinput">
            <input
              className="ha-ci"
              placeholder="Ask about your health..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
            />
            <button className="ha-csend" onClick={() => sendMsg()} disabled={!chatInput.trim() || chatBusy}>
              {chatBusy ? <I.Loader /> : <I.Send />}
            </button>
          </div>
          <div className="ha-disc">⚕ Not a substitute for professional medical advice</div>
        </div>
      )}
    </div>
  );
}

// ROOT COMPONENT
export default function HealthAdvisor({ onGoToAssessment }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [report, setReport] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const goAssess = onGoToAssessment || (() => { navigate('/symptom-detector'); });

  useEffect(() => {
    async function init() {
      console.log('Initializing Health Advisor...');
      
      // Check sessionStorage for report from assessment
      const storedReport = sessionStorage.getItem('healthAdvisorReport');
      if (storedReport) {
        try {
          const parsedReport = JSON.parse(storedReport);
          console.log('✅ Found stored report:', parsedReport);
          setReport(parsedReport);
          setStatus('ready');
          // Clear it after reading
          sessionStorage.removeItem('healthAdvisorReport');
          return; // Stop here - don't fetch from backend
        } catch (e) {
          console.error('Failed to parse stored report:', e);
        }
      }

      // Check auth
      const token = getToken();
      const u = getUser();
      setUser(u);
      setIsLoggedIn(!!token);

      if (!token) {
        console.log('No token, showing empty state');
        setStatus('empty');
        return;
      }

      // Only try to fetch from backend if no stored report
      console.log('Fetching from backend...');
      const data = await fetchLatestAssessment();
      if (!data) {
        console.log('No data from backend, showing empty state');
        setStatus('empty');
        return;
      }

      console.log('✅ Found data from backend:', data);
      setReport(data);
      setStatus('ready');
    }
    
    init();
  }, []); // Empty dependency array - run once on mount

  const handleDismissGate = () => {
    setStatus('gate-dismissed');
  };

  return (
    <div className="ha">
      <div className="ha-blob ha-b1" />
      <div className="ha-blob ha-b2" />

      {status === 'loading' && (
        <div className="ha-loading">
          <div className="ha-loading-spinner" />
          <p className="ha-loading-text">Loading your health data…</p>
        </div>
      )}

      {status === 'empty' && (
        <EmptyState
          isLoggedIn={isLoggedIn}
          user={user}
          onGoToAssessment={goAssess}
          onDismiss={handleDismissGate}
        />
      )}

      {status === 'gate-dismissed' && (
        <div className="ha-wrap" style={{ opacity: 0.7 }}>
          <div className="ha-top">
            <div>
              <h1 className="ha-title">Health <span>Advisor</span></h1>
              <p className="ha-sub">AI-powered insights tailored to your stroke risk profile.</p>
            </div>
            <div className="ha-risk-pill" style={{ background: 'linear-gradient(135deg,#94a3b8,#cbd5e1)' }}>
              <span className="ha-rdot" />No Data · —%
            </div>
          </div>
          <div className="ha-assessed-bar">
            <div className="ha-assessed-left">
              <I.History />
              <div>
                <div className="ha-assessed-label">Last assessment</div>
                <div className="ha-assessed-date">Not available</div>
              </div>
            </div>
            <button className="ha-reassess-btn" onClick={goAssess}>
              <I.Refresh /> Take Assessment
            </button>
          </div>
          <div className="ha-sum">
            {[1,2,3,4].map(i => (
              <div className="ha-sc" key={i}>
                <div className="ha-skel" style={{ height: 16, width: '60%', marginBottom: 8, borderRadius: 5 }} />
                <div className="ha-skel" style={{ height: 28, width: '45%', borderRadius: 8 }} />
              </div>
            ))}
          </div>
          <div className="ha-tabs">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="ha-skel" style={{ width: 110, height: 36, borderRadius: 100 }} />
            ))}
          </div>
          <div className="ha-panel">
            <div className="ha-ph">
              <div className="ha-skel" style={{ width: 46, height: 46, borderRadius: 13 }} />
              <div>
                <div className="ha-skel" style={{ width: 180, height: 20, borderRadius: 6, marginBottom: 5 }} />
                <div className="ha-skel" style={{ width: 220, height: 14, borderRadius: 5 }} />
              </div>
            </div>
            <div className="ha-ig">
              {[1,2,3,4].map(i => (
                <div key={i} style={{ borderRadius: 16, padding: 17, border: '1px solid #edf0f6' }}>
                  <div className="ha-skel" style={{ height: 18, width: '38%', marginBottom: 10, borderRadius: 6 }} />
                  <div className="ha-skel" style={{ height: 14, width: '85%', marginBottom: 6, borderRadius: 5 }} />
                  <div className="ha-skel" style={{ height: 14, width: '60%', borderRadius: 5 }} />
                </div>
              ))}
            </div>
          </div>
          <div className="ha-sh"><I.Calendar />Monthly Health Tracker</div>
          <div className="ha-goals">
            {[1,2,3,4].map(i => (
              <div key={i} className="ha-gc">
                <div className="ha-gh">
                  <div className="ha-skel" style={{ width: 33, height: 33, borderRadius: 9 }} />
                  <div className="ha-skel" style={{ flex: 1, height: 18, borderRadius: 6 }} />
                </div>
                <div className="ha-skel" style={{ height: 5, borderRadius: 100, marginBottom: 11 }} />
                <div className="ha-skel" style={{ width: '100%', height: 30, borderRadius: 10 }} />
              </div>
            ))}
          </div>
          <button className="ha-fab" style={{ opacity: 0.6, pointerEvents: 'none' }}>
            <I.Chat /><span>Ask Health AI</span>
          </button>
        </div>
      )}

      {status === 'ready' && report && (
        <AdvisorDashboard
          report={report}
          user={user}
          onGoToAssessment={goAssess}
        />
      )}
    </div>
  );
}