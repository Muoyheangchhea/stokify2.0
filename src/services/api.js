import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['x-auth-token'] = token;
    }
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response || error);
    
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Helper to format response consistently
const formatResponse = (response) => {
  return {
    data: response.data,
    success: true,
    message: response.data?.message || 'Success'
  };
};

// Auth API
export const authAPI = {
  register: async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  login: async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve({ success: true, message: 'Logged out' });
  },
  
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    try {
      const response = await api.get('/protected/profile');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  updateProfile: async (data) => {
    try {
      const response = await api.put('/protected/profile', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  changePassword: async (data) => {
    try {
      const response = await api.post('/protected/change-password', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getAllUsers: async () => {
    try {
      const response = await api.get('/protected/users');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getUserStats: async () => {
    try {
      const response = await api.get('/protected/stats');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getUserById: async (id) => {
    try {
      const response = await api.get(`/protected/patient/${id}`);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  updateUserRole: async (id, role) => {
    try {
      const response = await api.put(`/protected/user/${id}/role`, { role });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/protected/user/${id}`);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Symptom API
export const symptomAPI = {
  submitAssessment: async (data) => {
    try {
      const response = await api.post('/symptom/analyze', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getHistory: async () => {
    try {
      const response = await api.get('/symptom/history');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getAssessment: async (id) => {
    try {
      const response = await api.get(`/symptom/${id}`);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  analyzeSymptoms: async (symptoms) => {
    try {
      const response = await api.post('/symptom/analyze-text', { symptoms });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  fastTest: async (data) => {
    try {
      const response = await api.post('/symptom/fast-test', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getRiskFactors: async () => {
    try {
      const response = await api.get('/symptom/risk-factors');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Health Advisor API
export const healthAdvisorAPI = {
  getDailyTip: async () => {
    try {
      const response = await api.get('/health/tip');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  askQuestion: async (question) => {
    try {
      const response = await api.post('/health/ask', { question });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getRecommendations: async () => {
    try {
      const response = await api.get('/health/recommendations');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// LifeSync API
export const lifeSyncAPI = {
  getNearbyCaregivers: async (lat, lng, radius) => {
    try {
      const response = await api.get('/lifesync/caregivers', {
        params: { lat, lng, radius }
      });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getAlerts: async () => {
    try {
      const response = await api.get('/lifesync/alerts');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getAppointments: async () => {
    try {
      const response = await api.get('/lifesync/appointments');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  createAppointment: async (data) => {
    try {
      const response = await api.post('/lifesync/appointments', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  markAlertRead: async (id) => {
    try {
      const response = await api.put(`/lifesync/alerts/${id}/read`);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Contact API
export const contactAPI = {
  submitContactForm: async (data) => {
    try {
      const response = await api.post('/contact', data);
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getFAQ: async () => {
    try {
      const response = await api.get('/contact/faq');
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  subscribeNewsletter: async (email) => {
    try {
      const response = await api.post('/contact/newsletter', { email });
      return formatResponse(response);
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Export all APIs
export default {
  authAPI,
  userAPI,
  symptomAPI,
  healthAdvisorAPI,
  lifeSyncAPI,
  contactAPI
};