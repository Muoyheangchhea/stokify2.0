import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          console.log('✅ User loaded from storage:', JSON.parse(storedUser));
        } else {
          console.log('ℹ️ No stored user found');
        }
      } catch (error) {
        console.error('❌ Error loading user:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔐 Attempting login for:', email);
      
      const response = await authAPI.login({ email, password });
      console.log('📥 Login response:', response.data);
      
      if (response.data.success) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update state
        setUser(user);
        
        console.log('✅ Login successful, user saved:', user);
        return { success: true };
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      console.log('📝 Attempting registration for:', userData.email);
      
      const response = await authAPI.register(userData);
      console.log('📥 Register response:', response.data);
      
      if (response.data.success) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update state
        setUser(user);
        
        console.log('✅ Registration successful, user saved:', user);
        return { success: true };
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out');
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setUser(null);
    setError(null);
  };

  // For development - quick login helper
  const devLogin = () => {
    const testUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      riskLevel: 'low',
      role: 'user'
    };
    const testToken = 'dev-token-123';
    
    localStorage.setItem('token', testToken);
    localStorage.setItem('user', JSON.stringify(testUser));
    setUser(testUser);
    console.log('🧪 Dev login successful');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    devLogin, // Only for development
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};