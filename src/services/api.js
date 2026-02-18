// Mock API service - with proper responses
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for consistent responses
const createResponse = (success, data, message = '') => {
  return Promise.resolve({
    data: {
      success,
      data,
      message
    }
  });
};

// Auth API
export const authAPI = {
  register: (data) => {
    console.log('📝 Mock register:', data);
    return createResponse(true, {
      user: { 
        id: Date.now(), 
        name: data.name, 
        email: data.email,
        riskLevel: 'low',
        role: 'user',
        createdAt: new Date().toISOString()
      },
      token: 'mock-token-' + Date.now()
    }, 'Registration successful');
  },
  
  login: (data) => {
    console.log('🔐 Mock login:', data);
    return createResponse(true, {
      user: { 
        id: 1, 
        name: data.email === 'test@example.com' ? 'Test User' : data.email.split('@')[0],
        email: data.email,
        riskLevel: 'low',
        role: 'user',
        lastLogin: new Date().toISOString()
      },
      token: 'mock-token-' + Date.now()
    }, 'Login successful');
  },
  
  forgotPassword: (email) => {
    console.log('📧 Mock forgot password:', email);
    return createResponse(true, null, 'Reset email sent');
  },
  
  resetPassword: (token, password) => {
    console.log('🔑 Mock reset password:', { token, password });
    return createResponse(true, null, 'Password reset successful');
  },
  
  logout: () => {
    console.log('🚪 Mock logout');
    return createResponse(true, null, 'Logged out');
  },
  
  verifyEmail: (token) => {
    console.log('✅ Mock verify email:', token);
    return createResponse(true, { verified: true }, 'Email verified');
  }
};

// User API
export const userAPI = {
  getProfile: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return createResponse(true, user);
  },
  updateProfile: (data) => {
    console.log('📝 Mock update profile:', data);
    return createResponse(true, data, 'Profile updated');
  },
  changePassword: (data) => {
    console.log('🔑 Mock change password');
    return createResponse(true, null, 'Password changed');
  }
};

// Symptom API
export const symptomAPI = {
  submitAssessment: (data) => {
    console.log('📊 Mock submit assessment:', data);
    
    // Calculate mock risk based on age
    let riskLevel = 'low';
    let score = 15;
    let factors = ['Age', 'No significant risk factors'];
    
    if (data.demographics?.age > 60) {
      riskLevel = 'high';
      score = 75;
      factors = ['Age over 60', 'Consider consulting a doctor'];
    } else if (data.demographics?.age > 45) {
      riskLevel = 'moderate';
      score = 45;
      factors = ['Age over 45', 'Monitor blood pressure'];
    }
    
    return createResponse(true, {
      _id: 'assessment-' + Date.now(),
      createdAt: new Date().toISOString(),
      analysis: {
        riskLevel,
        score,
        factors,
        recommendations: riskLevel === 'high' 
          ? ['Consult doctor immediately', 'Monitor symptoms']
          : ['Maintain healthy lifestyle', 'Regular checkups']
      }
    });
  },
  
  getHistory: () => {
    return createResponse(true, [
      {
        _id: '1',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        analysis: { riskLevel: 'low', score: 15 }
      },
      {
        _id: '2',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        analysis: { riskLevel: 'low', score: 12 }
      }
    ]);
  },
  
  getAssessment: (id) => {
    return createResponse(true, {
      _id: id,
      createdAt: new Date().toISOString(),
      demographics: { age: 35, sex: 'male', bmi: 22.5 },
      medicalHistory: { hasHighBP: false },
      lifestyle: { smokingStatus: 'never' },
      analysis: { riskLevel: 'low', score: 15, factors: ['Age'] }
    });
  },
  
  analyzeSymptoms: (symptoms) => {
    console.log('🔍 Mock analyze symptoms:', symptoms);
    const text = symptoms.toLowerCase();
    const hasStrokeSymptoms = text.includes('face') || 
                              text.includes('arm') ||
                              text.includes('speech') ||
                              text.includes('sudden') ||
                              text.includes('weakness');
    
    return createResponse(true, {
      riskLevel: hasStrokeSymptoms ? 'high' : 'low',
      urgentAction: hasStrokeSymptoms,
      message: hasStrokeSymptoms ? '🚨 STROKE SYMPTOMS DETECTED - Call 911 immediately' : '✅ Low risk detected',
      recommendations: hasStrokeSymptoms ? 
        ['Call 911', 'Note time symptoms started', 'Keep person calm'] :
        ['Monitor symptoms', 'Stay hydrated', 'Consult doctor if concerned']
    });
  },
  
  fastTest: (data) => {
    console.log('⚡ Mock FAST test:', data);
    const anySymptom = data.face || data.arms || data.speech;
    return createResponse(true, {
      positive: anySymptom,
      message: anySymptom ? '🚨 STROKE SYMPTOMS DETECTED' : '✅ No stroke symptoms detected',
      action: anySymptom ? 'emergency' : 'monitor',
      instructions: anySymptom ? 'Call 911 immediately' : 'Continue monitoring'
    });
  },
  
  getRiskFactors: () => {
    return createResponse(true, [
      { name: 'Age', description: 'Risk increases with age' },
      { name: 'Blood Pressure', description: 'High blood pressure is a major risk factor' },
      { name: 'Family History', description: 'Family history of stroke increases risk' }
    ]);
  }
};

// Health Advisor API
export const healthAdvisorAPI = {
  getDailyTip: () => {
    const tips = [
      { title: 'Morning Hydration', content: 'Start your day with a glass of water to boost metabolism by up to 30%', icon: '💧', color: '#3B82F6' },
      { title: 'Take a Walk', content: 'A 30-minute walk daily can reduce stroke risk by 25%', icon: '🚶', color: '#10B981' },
      { title: 'Sleep Well', content: '7-8 hours of sleep helps maintain heart health', icon: '😴', color: '#8B5CF6' },
      { title: 'Reduce Salt', content: 'Cutting salt intake can lower blood pressure', icon: '🧂', color: '#F59E0B' }
    ];
    return createResponse(true, tips[Math.floor(Math.random() * tips.length)]);
  },
  
  askQuestion: (question) => {
    console.log('❓ Mock ask question:', question);
    const responses = [
      "Based on your health data, I'd recommend focusing on hydration. You're currently at 6/8 glasses daily.",
      "Your blood pressure (118/76) is in the optimal range. Great job!",
      "For better sleep, try reducing screen time 1 hour before bed.",
      "Stress management tip: Even 5 minutes of deep breathing can lower cortisol levels.",
      "Your heart rate (72 bpm) is normal for your age.",
      "To improve your nutrition score, try adding more leafy greens to your diet."
    ];
    return createResponse(true, {
      answer: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toISOString()
    });
  },
  
  getRecommendations: () => {
    return createResponse(true, {
      nutrition: ['Add vegetables to each meal', 'Choose whole grains'],
      exercise: ['Walk 30 minutes daily', 'Take stairs instead of elevator'],
      sleep: ['Maintain consistent sleep schedule', 'Avoid screens before bed']
    });
  }
};

// LifeSync API
export const lifeSyncAPI = {
  getNearbyCaregivers: (lat, lng, radius) => {
    console.log('📍 Mock get nearby caregivers:', { lat, lng, radius });
    return createResponse(true, [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        type: 'Neurologist',
        specialty: 'Stroke Neurology',
        distance: '2.3 miles',
        rating: 4.9,
        available: true,
        emergency24x7: true,
        phone: '+1 (555) 123-4567',
        image: '👩‍⚕️'
      },
      {
        id: 2,
        name: 'Dr. Michael Rodriguez',
        type: 'Interventional Neurologist',
        specialty: 'Thrombectomy',
        distance: '3.1 miles',
        rating: 4.8,
        available: false,
        emergency24x7: true,
        phone: '+1 (555) 234-5678',
        image: '👨‍⚕️'
      },
      {
        id: 3,
        name: 'Dr. Emily Watson',
        type: 'Rehab Specialist',
        specialty: 'Stroke Recovery',
        distance: '1.8 miles',
        rating: 4.7,
        available: true,
        emergency24x7: false,
        phone: '+1 (555) 345-6789',
        image: '👩‍⚕️'
      }
    ]);
  },
  
  getAlerts: () => {
    return createResponse(true, [
      {
        _id: '1',
        severity: 'high',
        message: 'Margaret missed evening medication',
        time: '30 minutes ago',
        read: false
      },
      {
        _id: '2',
        severity: 'medium',
        message: 'Robert\'s blood pressure elevated',
        time: '2 hours ago',
        read: true
      }
    ]);
  },
  
  getAppointments: () => {
    return createResponse(true, [
      {
        _id: '1',
        caregiverName: 'Dr. Sarah Chen',
        date: '2024-02-20',
        time: '10:30 AM',
        type: 'Check-up',
        status: 'confirmed'
      }
    ]);
  },
  
  markAlertRead: (id) => {
    console.log('✅ Mock mark alert read:', id);
    return createResponse(true, null, 'Alert marked as read');
  }
};

// Contact API
export const contactAPI = {
  submitContactForm: (data) => {
    console.log('📧 Mock contact form:', data);
    return createResponse(true, null, 'Message sent successfully! We\'ll respond within 24 hours.');
  },
  
  getFAQ: () => {
    return createResponse(true, [
      { question: 'Is Strokify free?', answer: 'Yes, Strokify is completely free for all users.' },
      { question: 'How accurate is the symptom detector?', answer: 'Our AI model has 95% accuracy.' },
      { question: 'Can I monitor family members?', answer: 'Yes, you can create family accounts.' }
    ]);
  },
  
  subscribeNewsletter: (email) => {
    console.log('📬 Mock newsletter subscribe:', email);
    return createResponse(true, null, 'Successfully subscribed to newsletter!');
  }
};

// Export all APIs
const api = {
  authAPI,
  userAPI,
  symptomAPI,
  healthAdvisorAPI,
  lifeSyncAPI,
  contactAPI
};

export default api;