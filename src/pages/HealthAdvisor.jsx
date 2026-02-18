import React, { useState } from 'react';
import { 
  FaHeart, FaApple, FaRunning, FaBed, FaWater, 
  FaSmile, FaBrain, FaTint, FaLeaf, FaSun,
  FaMoon, FaCoffee, FaWeight, FaClock, FaChartLine,
  FaCheck, FaArrowRight, FaInfoCircle, FaShieldAlt,
  FaHeartbeat, FaLungs, FaBolt, FaSeedling, FaRobot,
  FaPaperPlane, FaUser, FaComment, FaLightbulb,
  FaExclamationTriangle, FaQuestionCircle, FaSpinner
} from 'react-icons/fa';
import '../styles/HealthAdvisor.css';

const HealthAdvisor = () => {
  // ---------- User Data (simulated - would come from profile) ----------
  const [userData] = useState({
    name: 'Alex',
    age: 35,
    gender: 'male',
    bmi: 22.5,
    bloodPressure: '118/76',
    heartRate: 72,
    sleepHours: 7.5,
    waterIntake: 6,
    steps: 7234,
    riskLevel: 'low',
    
    // Health conditions
    hasHighBP: false,
    hasDiabetes: false,
    hasHeartDisease: false,
    
    // Lifestyle
    smokingStatus: 'never',
    alcoholConsumption: 'occasional',
    diet: 'balanced',
    physicalActivity: 'moderate',
    
    // Goals
    healthGoals: ['improve_sleep', 'increase_steps', 'better_nutrition']
  });

  // ---------- Chat State ----------
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hi ${userData.name}! I'm your AI Health Advisor. Ask me anything about your health, wellness, or understanding your health data.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false); // New state to track if user has sent a message

  // ---------- Daily Health Tip (rotates) ----------
  const [dailyTip] = useState({
    title: "Morning Hydration",
    content: "Start your day with a glass of water to boost metabolism by up to 30%",
    icon: <FaWater />,
    color: "#3B82F6"
  });

  // ---------- Wellness Categories ----------
  const wellnessCategories = [
    {
      id: 'nutrition',
      title: 'Nutrition',
      icon: <FaApple />,
      color: '#10B981',
      score: 85,
      tips: [
        'Add one serving of vegetables to each meal',
        'Choose whole grains over refined carbs',
        'Limit processed foods to 1-2 times per week',
        'Include lean protein in every meal'
      ],
      recommendations: [
        {
          title: 'Mediterranean Diet',
          description: 'Rich in fruits, vegetables, and healthy fats',
          action: 'Try a Greek salad with olive oil today'
        },
        {
          title: 'Hydration Goal',
          description: 'Aim for 8 glasses of water daily',
          action: 'Keep a water bottle at your desk'
        }
      ]
    },
    {
      id: 'exercise',
      title: 'Physical Activity',
      icon: <FaRunning />,
      color: '#F59E0B',
      score: 62,
      tips: [
        'Take the stairs instead of elevator',
        'Walk for 10 minutes after meals',
        'Try 20 minutes of stretching today',
        'Aim for 150 minutes of cardio weekly'
      ],
      recommendations: [
        {
          title: 'Daily Walk',
          description: '30-minute brisk walk burns ~150 calories',
          action: 'Schedule a walk during lunch break'
        },
        {
          title: 'Strength Training',
          description: '2-3 sessions per week builds muscle',
          action: 'Try 15 minutes of bodyweight exercises'
        }
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep & Recovery',
      icon: <FaBed />,
      color: '#8B5CF6',
      score: 78,
      tips: [
        'Maintain consistent sleep schedule',
        'Avoid screens 1 hour before bed',
        'Keep bedroom cool and dark',
        'Limit caffeine after 2 PM'
      ],
      recommendations: [
        {
          title: 'Sleep Routine',
          description: '7-9 hours of quality sleep is optimal',
          action: 'Try going to bed 15 minutes earlier'
        },
        {
          title: 'Wind-Down Ritual',
          description: 'Create a relaxing pre-sleep routine',
          action: 'Read a book or practice deep breathing'
        }
      ]
    },
    {
      id: 'mental',
      title: 'Mental Wellness',
      icon: <FaBrain />,
      color: '#EC4899',
      score: 71,
      tips: [
        'Practice 5 minutes of mindfulness daily',
        'Take short breaks during work',
        'Connect with friends or family',
        'Write down three things you\'re grateful for'
      ],
      recommendations: [
        {
          title: 'Stress Management',
          description: 'Chronic stress affects physical health',
          action: 'Try a 5-minute breathing exercise'
        },
        {
          title: 'Social Connection',
          description: 'Strong relationships improve wellbeing',
          action: 'Call a friend you haven\'t spoken to'
        }
      ]
    }
  ];

  // ---------- Quick Stats ----------
  const quickStats = [
    { label: 'BMI', value: userData.bmi, unit: '', icon: <FaWeight />, color: '#10B981', status: 'normal' },
    { label: 'Blood Pressure', value: userData.bloodPressure, unit: '', icon: <FaHeartbeat />, color: '#F59E0B', status: 'normal' },
    { label: 'Heart Rate', value: userData.heartRate, unit: 'bpm', icon: <FaHeart />, color: '#EC4899', status: 'normal' },
    { label: 'Sleep', value: userData.sleepHours, unit: 'hrs', icon: <FaBed />, color: '#8B5CF6', status: 'good' },
    { label: 'Water', value: userData.waterIntake, unit: 'glasses', icon: <FaTint />, color: '#3B82F6', status: 'needs-improvement' },
    { label: 'Steps', value: userData.steps.toLocaleString(), unit: '', icon: <FaRunning />, color: '#F59E0B', status: 'good' }
  ];

  // ---------- Active Category State ----------
  const [activeCategory, setActiveCategory] = useState(wellnessCategories[0].id);

  // ---------- Get Active Category Data ----------
  const activeCategoryData = wellnessCategories.find(c => c.id === activeCategory);

  // ---------- AI Response Generator ----------
  const generateResponse = (question) => {
    const q = question.toLowerCase();
    
    // BMI related questions
    if (q.includes('bmi') || q.includes('weight') || q.includes('overweight')) {
      if (userData.bmi < 18.5) {
        return `Your BMI is ${userData.bmi}, which is considered underweight. For your height, gaining ${(18.5 - userData.bmi).toFixed(1)} points would bring you to a healthy range. I recommend consulting with a nutritionist about healthy weight gain strategies.`;
      } else if (userData.bmi >= 18.5 && userData.bmi < 25) {
        return `Great news! Your BMI of ${userData.bmi} is in the healthy weight range (18.5-24.9). Maintain your current habits with balanced nutrition and regular exercise. Would you like specific diet recommendations?`;
      } else if (userData.bmi >= 25 && userData.bmi < 30) {
        return `Your BMI of ${userData.bmi} indicates you're in the overweight range. Losing ${(userData.bmi - 24.9).toFixed(1)} points would bring you to a healthy BMI. Would you like some personalized weight management tips?`;
      } else {
        return `Your BMI of ${userData.bmi} is in the obese range. I strongly recommend consulting with a healthcare provider. Would you like me to suggest some healthy lifestyle changes?`;
      }
    }
    
    // Blood pressure questions
    else if (q.includes('blood pressure') || q.includes('bp') || q.includes('hypertension')) {
      const [systolic, diastolic] = userData.bloodPressure.split('/').map(Number);
      
      if (systolic < 120 && diastolic < 80) {
        return `Your blood pressure (${userData.bloodPressure}) is optimal! This is in the normal range. To maintain this, continue with your current healthy habits like regular exercise and a balanced diet.`;
      } else if (systolic < 130 && diastolic < 80) {
        return `Your blood pressure (${userData.bloodPressure}) is elevated but still within normal range. Consider reducing sodium intake and increasing physical activity.`;
      } else if (systolic < 140 || diastolic < 90) {
        return `Your blood pressure (${userData.bloodPressure}) is in Stage 1 hypertension. I recommend consulting with a doctor and making lifestyle changes like reducing salt, exercising regularly, and managing stress.`;
      } else {
        return `Your blood pressure (${userData.bloodPressure}) is in Stage 2 hypertension. Please consult with a healthcare provider soon. Would you like some immediate tips to help lower your blood pressure?`;
      }
    }
    
    // Heart rate questions
    else if (q.includes('heart rate') || q.includes('pulse') || q.includes('bpm')) {
      if (userData.heartRate < 60) {
        return `Your resting heart rate of ${userData.heartRate} bpm is below the normal range (60-100 bpm). This could be a sign of excellent cardiovascular fitness if you're an athlete, or it could indicate bradycardia. Do you exercise regularly?`;
      } else if (userData.heartRate >= 60 && userData.heartRate <= 100) {
        return `Your resting heart rate of ${userData.heartRate} bpm is within the normal range (60-100 bpm). This indicates good heart health. Regular cardio exercise can help maintain this.`;
      } else {
        return `Your resting heart rate of ${userData.heartRate} bpm is above the normal range. This could be due to stress, caffeine, or dehydration. Try relaxation techniques and ensure you're well-hydrated. If it persists, consult a doctor.`;
      }
    }
    
    // Sleep questions
    else if (q.includes('sleep') || q.includes('insomnia') || q.includes('tired')) {
      if (userData.sleepHours < 7) {
        return `You're currently sleeping ${userData.sleepHours} hours, which is below the recommended 7-9 hours. Lack of sleep can affect mood, cognitive function, and physical health. Would you like some tips to improve your sleep quality?`;
      } else if (userData.sleepHours >= 7 && userData.sleepHours <= 9) {
        return `Great job! You're getting ${userData.sleepHours} hours of sleep, which is within the optimal range. To improve sleep quality, try maintaining a consistent sleep schedule even on weekends.`;
      } else {
        return `You're sleeping ${userData.sleepHours} hours, which is above the recommended range. While sleep needs vary, oversleeping can sometimes indicate underlying health issues. How do you feel during the day?`;
      }
    }
    
    // Hydration questions
    else if (q.includes('water') || q.includes('hydrate') || q.includes('drink')) {
      if (userData.waterIntake < 4) {
        return `You're drinking only ${userData.waterIntake} glasses of water daily. This is below the recommended 8 glasses. Dehydration can cause fatigue and headaches. Try keeping a water bottle at your desk as a reminder.`;
      } else if (userData.waterIntake < 8) {
        return `You're drinking ${userData.waterIntake} out of 8 recommended glasses. You're doing well! Try to add ${8 - userData.waterIntake} more glasses throughout the day. Herbal tea and water-rich foods also count toward hydration.`;
      } else {
        return `Excellent! You're meeting the daily water intake recommendation of 8 glasses. Stay consistent with this healthy habit.`;
      }
    }
    
    // Steps/Exercise questions
    else if (q.includes('step') || q.includes('walk') || q.includes('exercise') || q.includes('activity')) {
      if (userData.steps < 5000) {
        return `You're averaging ${userData.steps.toLocaleString()} steps daily. This is considered sedentary. Try to gradually increase to 10,000 steps. Start with short walks after meals - even 10 minutes helps!`;
      } else if (userData.steps < 7500) {
        return `You're averaging ${userData.steps.toLocaleString()} steps daily. This is lightly active. You're ${(10000 - userData.steps).toLocaleString()} steps away from the 10,000 goal. Consider taking the stairs or parking farther away.`;
      } else if (userData.steps < 10000) {
        return `You're averaging ${userData.steps.toLocaleString()} steps daily. This is moderately active! Just ${(10000 - userData.steps).toLocaleString()} more steps to reach the daily goal. You're almost there!`;
      } else {
        return `Amazing! You're exceeding 10,000 steps daily. This level of activity is excellent for cardiovascular health. Consider adding variety with strength training 2-3 times per week.`;
      }
    }
    
    // Nutrition questions
    else if (q.includes('nutrition') || q.includes('diet') || q.includes('eat') || q.includes('food') || q.includes('meal')) {
      if (userData.diet === 'balanced') {
        return `You reported having a balanced diet, which is great! Based on your health data, focus on maintaining variety in your meals. Would you like specific meal ideas that match your preferences?`;
      } else if (userData.diet === 'high_salt') {
        return `You mentioned eating high-salt foods. Reducing sodium can help maintain healthy blood pressure. Try using herbs and spices instead of salt, and limit processed foods.`;
      } else if (userData.diet === 'high_fat') {
        return `You mentioned eating high-fat foods. Consider incorporating more lean proteins and healthy fats from sources like avocados, nuts, and olive oil. Would you like some healthy recipe ideas?`;
      } else {
        return `You mentioned eating high-sugar foods. Reducing added sugar can improve energy levels and overall health. Try swapping sugary drinks for water with fruit slices.`;
      }
    }
    
    // Mental health questions
    else if (q.includes('stress') || q.includes('anxiety') || q.includes('mental') || q.includes('mind')) {
      return `Managing stress is crucial for overall health. Here are some techniques that might help:
      • Deep breathing: Inhale for 4 counts, hold for 4, exhale for 4
      • Short mindfulness breaks during work
      • Regular physical activity
      • Connecting with friends or family
      
      Would you like me to guide you through a quick relaxation exercise?`;
    }
    
    // Age-related questions
    else if (q.includes('age') || q.includes('old')) {
      return `You're ${userData.age} years old. At this age, focus on:
      • Maintaining cardiovascular health with regular exercise
      • Preserving muscle mass through strength training
      • Getting preventive health screenings
      • Managing stress effectively
      
      Would you like specific recommendations for your age group?`;
    }
    
    // Risk assessment questions
    else if (q.includes('risk') || q.includes('healthy') || q.includes('doing ok')) {
      return `Based on your health data, your overall risk level is ${userData.riskLevel}. 
      
      ✅ What you're doing well:
      • Blood pressure is optimal
      • Heart rate is normal
      • Sleep duration is good
      
      🔍 Areas for improvement:
      • Water intake (${userData.waterIntake}/8 glasses)
      • Daily steps (${userData.steps.toLocaleString()}/10,000)
      
      Would you like personalized recommendations for any specific area?`;
    }
    
    // Health goals questions
    else if (q.includes('goal') || q.includes('improve') || q.includes('better')) {
      return `Based on your health goals, here's what I recommend:
      
      🎯 For better sleep: Maintain consistent bedtime, avoid screens before bed
      🎯 For more steps: Take 10-minute walking breaks throughout the day
      🎯 For better nutrition: Add one vegetable to each meal
      
      Which goal would you like to focus on first?`;
    }
    
    // Smoking questions
    else if (q.includes('smok') || q.includes('cigarette')) {
      if (userData.smokingStatus === 'never') {
        return `Great that you've never smoked! This significantly reduces your risk of heart disease and cancer. Keep avoiding secondhand smoke when possible.`;
      } else if (userData.smokingStatus === 'former') {
        return `Congratulations on quitting smoking! Your health has already started improving. Continue with your smoke-free lifestyle.`;
      } else {
        return `I noticed you're currently smoking. Quitting is the single best thing you can do for your health. Would you like resources to help you quit?`;
      }
    }
    
    // Alcohol questions
    else if (q.includes('alcohol') || q.includes('drink') || q.includes('beer') || q.includes('wine')) {
      if (userData.alcoholConsumption === 'never') {
        return `Great that you don't drink alcohol. This is beneficial for liver health and reduces cancer risk.`;
      } else if (userData.alcoholConsumption === 'occasional') {
        return `You mentioned occasional drinking. For optimal health, limit to 1-2 drinks per occasion and have alcohol-free days each week.`;
      } else {
        return `You mentioned regular drinking. Consider reducing alcohol intake - aim for 2-3 alcohol-free days per week. Would you like strategies to help cut back?`;
      }
    }
    
    // Default response for unrecognized questions
    else {
      const defaultResponses = [
        `That's an interesting question about your health. Based on your profile, I'd recommend focusing on your ${userData.waterIntake < 8 ? 'hydration' : 'daily steps'} goal. Would you like more specific information?`,
        
        `I want to give you the most accurate information. Could you rephrase your question or ask about specific health metrics like BMI, blood pressure, sleep, or nutrition?`,
        
        `Great question! To give you the best answer, could you specify which aspect of health you're most interested in - physical activity, nutrition, sleep, or mental wellness?`,
        
        `Based on your health data, I notice your ${userData.waterIntake < 8 ? 'water intake could improve' : 'step count is good but could increase'}. Is that something you'd like to discuss?`,
        
        `I'm here to help with any health questions! You can ask about your BMI (${userData.bmi}), blood pressure (${userData.bloodPressure}), sleep (${userData.sleepHours} hrs), or specific wellness goals.`
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  // ---------- Handle Send Message ----------
  const handleSendMessage = (suggestedQuestion = null) => {
    const messageToSend = suggestedQuestion || inputMessage;
    
    if (!messageToSend.trim()) return;

    // Mark that user has interacted (to hide suggested questions)
    setHasUserInteracted(true);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(messageToSend);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // ---------- Handle Suggested Question Click ----------
  const handleSuggestedClick = (question) => {
    handleSendMessage(question);
  };

  // ---------- Handle Key Press ----------
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ---------- Reset Interaction When Chat Closes ----------
  const handleChatClose = () => {
    setChatOpen(false);
    setHasUserInteracted(false); // Reset so suggested questions show again when reopened
  };

  // ---------- Suggested Questions ----------
  const suggestedQuestions = [
    "How's my BMI?",
    "What's my blood pressure?",
    "How can I improve my sleep?",
    "Am I drinking enough water?",
    "How many steps should I take?",
    "Tips for reducing stress"
  ];

  return (
    <div className="health-advisor">
      {/* Header Section */}
      <div className="advisor-header">
        <div className="header-content">
          <div className="greeting-section">
            <h1 className="greeting">
              Hello, {userData.name} 👋
            </h1>
            <p className="date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="risk-badge">
            <span className={`risk-indicator ${userData.riskLevel}`}></span>
            <span className="risk-text">Health Risk: {userData.riskLevel === 'low' ? 'Low' : userData.riskLevel === 'moderate' ? 'Moderate' : 'High'}</span>
            <FaInfoCircle className="info-icon" />
          </div>
        </div>
      </div>

      {/* Daily Tip Banner */}
      <div className="daily-tip-banner">
        <div className="tip-icon" style={{ backgroundColor: `${dailyTip.color}20`, color: dailyTip.color }}>
          {dailyTip.icon}
        </div>
        <div className="tip-content">
          <span className="tip-label">Daily Wellness Tip</span>
          <p className="tip-text">{dailyTip.content}</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value-wrapper">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-unit">{stat.unit}</span>
              </div>
            </div>
            <div className={`stat-status ${stat.status}`}></div>
          </div>
        ))}
      </div>

      {/* Wellness Categories */}
      <div className="wellness-section">
        <div className="section-header">
          <h2 className="section-title">Wellness Categories</h2>
          <p className="section-subtitle">Personalized recommendations based on your health profile</p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {wellnessCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ 
                borderBottomColor: activeCategory === category.id ? category.color : 'transparent',
                color: activeCategory === category.id ? category.color : '#5F5F61'
              }}
            >
              <span className="tab-icon" style={{ color: category.color }}>
                {category.icon}
              </span>
              <span className="tab-label">{category.title}</span>
              <div className="category-score" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                {category.score}%
              </div>
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        {activeCategoryData && (
          <div className="category-content">
            {/* Score Overview */}
            <div className="score-overview" style={{ borderLeftColor: activeCategoryData.color }}>
              <div className="score-circle" style={{ background: `conic-gradient(${activeCategoryData.color} ${activeCategoryData.score * 3.6}deg, #F0F1F2 0deg)` }}>
                <div className="score-inner" style={{ backgroundColor: `${activeCategoryData.color}10` }}>
                  <span className="score-number" style={{ color: activeCategoryData.color }}>{activeCategoryData.score}%</span>
                </div>
              </div>
              <div className="score-description">
                <h3 style={{ color: activeCategoryData.color }}>{activeCategoryData.title} Score</h3>
                <p>Your {activeCategoryData.title.toLowerCase()} habits are {activeCategoryData.score >= 80 ? 'excellent' : activeCategoryData.score >= 60 ? 'good' : 'needing improvement'}.</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="quick-tips">
              <h4>Quick Tips</h4>
              <div className="tips-grid">
                {activeCategoryData.tips.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <FaCheck className="tip-check" style={{ color: activeCategoryData.color }} />
                    <span className="tip-text">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="recommendations">
              <h4>Personalized Recommendations</h4>
              <div className="recommendations-grid">
                {activeCategoryData.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card" style={{ borderTopColor: activeCategoryData.color }}>
                    <div className="recommendation-header">
                      <h5>{rec.title}</h5>
                      <button className="action-btn" style={{ color: activeCategoryData.color }}>
                        <FaArrowRight />
                      </button>
                    </div>
                    <p className="recommendation-description">{rec.description}</p>
                    <div className="recommendation-action">
                      <FaBolt className="action-icon" style={{ color: activeCategoryData.color }} />
                      <span>{rec.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Progress */}
      <div className="weekly-progress">
        <div className="section-header">
          <h2 className="section-title">Weekly Progress</h2>
          <p className="section-subtitle">Your health goals this week</p>
        </div>

        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-header">
              <FaRunning className="progress-icon" style={{ color: '#F59E0B' }} />
              <span className="progress-label">Steps Goal</span>
              <span className="progress-value">{userData.steps.toLocaleString()} / 10,000</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(userData.steps / 10000) * 100}%`, backgroundColor: '#F59E0B' }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <FaWater className="progress-icon" style={{ color: '#3B82F6' }} />
              <span className="progress-label">Water Intake</span>
              <span className="progress-value">{userData.waterIntake} / 8 glasses</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(userData.waterIntake / 8) * 100}%`, backgroundColor: '#3B82F6' }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <FaBed className="progress-icon" style={{ color: '#8B5CF6' }} />
              <span className="progress-label">Sleep</span>
              <span className="progress-value">{userData.sleepHours} / 8 hours</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${(userData.sleepHours / 8) * 100}%`, backgroundColor: '#8B5CF6' }}></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-header">
              <FaApple className="progress-icon" style={{ color: '#10B981' }} />
              <span className="progress-label">Fruits & Veggies</span>
              <span className="progress-value">4 / 5 servings</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '80%', backgroundColor: '#10B981' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="health-insights">
        <div className="section-header">
          <h2 className="section-title">Health Insights</h2>
          <p className="section-subtitle">AI-powered analysis of your health data</p>
        </div>

        <div className="insights-grid">
          <div className="insight-card positive">
            <div className="insight-icon">
              <FaHeartbeat />
            </div>
            <div className="insight-content">
              <h4>Blood Pressure is Optimal</h4>
              <p>Your recent readings ({userData.bloodPressure}) are in the ideal range. Keep up the good work!</p>
            </div>
          </div>

          <div className="insight-card neutral">
            <div className="insight-icon">
              <FaRunning />
            </div>
            <div className="insight-content">
              <h4>Increase Daily Steps</h4>
              <p>You're averaging {userData.steps.toLocaleString()} steps. Aim for 10,000 to improve cardiovascular health.</p>
            </div>
          </div>

          <div className="insight-card positive">
            <div className="insight-icon">
              <FaBed />
            </div>
            <div className="insight-content">
              <h4>Sleep Quality is Good</h4>
              <p>Your sleep duration ({userData.sleepHours} hrs) meets recommendations. Consistent timing would help.</p>
            </div>
          </div>

          <div className="insight-card neutral">
            <div className="insight-icon">
              <FaTint />
            </div>
            <div className="insight-content">
              <h4>Hydration Goal</h4>
              <p>You're at {userData.waterIntake}/8 glasses. Try keeping a water bottle visible as a reminder.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="motivation-section">
        <div className="quote-card">
          <FaLeaf className="quote-icon" />
          <p className="quote-text">
            "The greatest wealth is health. Small daily improvements lead to stunning results."
          </p>
          <p className="quote-author">— Virgil</p>
        </div>
      </div>

      {/* AI Chat Assistant Button */}
      <button 
        className={`chat-toggle-btn ${chatOpen ? 'open' : ''}`}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? <FaComment /> : <FaRobot />}
        <span>Ask Health AI</span>
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <FaRobot className="chat-header-icon" />
              <div>
                <h3>AI Health Assistant</h3>
                <p>Ask me anything about your health</p>
              </div>
            </div>
            <button className="chat-close" onClick={handleChatClose}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <p>{message.content}</p>
                  <span className="message-time">{message.timestamp}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions - Only show if user hasn't interacted yet */}
          {!hasUserInteracted && (
            <div className="suggested-questions">
              <p className="suggested-title">Suggested questions to get started:</p>
              <div className="suggested-grid">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="suggested-question"
                    onClick={() => handleSuggestedClick(question)}
                  >
                    <FaLightbulb className="suggested-icon" />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>

          <div className="chat-disclaimer">
            <FaExclamationTriangle />
            <span>AI-generated advice. Always consult a doctor for medical concerns.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthAdvisor;