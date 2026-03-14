import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
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
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("❌ Error loading user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
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

      const response = await authAPI.login({ email, password });

      const { user, token } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update state - this will trigger re-render in all subscribers
      setUser(user);

      return { success: true, user };
    } catch (err) {
      const errorMessage = err.message || "Login failed";
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
      console.log("📝 Attempting registration for:", userData.email);

      const response = await authAPI.register(userData);
      console.log("📥 Register response:", response);

      const { user, token } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update state
      setUser(user);

      console.log("✅ Registration successful, user saved:", user);
      return { success: true, user };
    } catch (err) {
      console.error("❌ Registration error:", err);
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("🚪 Logging out");

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");

    // Clear state
    setUser(null);
    setError(null);

    // Optional: Call logout API
    authAPI.logout().catch(console.error);
  };

  // ✅ UPDATED GOOGLE AUTH FUNCTION
  const googleAuth = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔐 Google auth for:", userData.email);
      console.log("🔍 API Base URL:", import.meta.env.VITE_API_URL);

      // Use authAPI instead of hardcoded fetch
      const response = await authAPI.googleAuth({
        email: userData.email,
        name: userData.name,
        googleId: userData.googleId,
        picture: userData.picture,
        role: userData.role,
      });

      console.log("📥 Google auth response:", response);

      // response is already formatted by api.js
      const { user, token } = response.data;

      // Make sure picture is properly saved
      const userWithPicture = {
        ...user,
        picture: user.picture || userData.picture,
      };

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithPicture));

      setUser(userWithPicture);

      return { success: true, user: userWithPicture };
    } catch (err) {
      console.error("❌ Google auth error:", err);
      // err is already the error message from api.js
      const errorMessage = err.message || "Google authentication failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // For development - quick login helper
  const devLogin = () => {
    const testUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      riskLevel: "low",
      role: "user",
    };
    const testToken = "dev-token-123";

    localStorage.setItem("token", testToken);
    localStorage.setItem("user", JSON.stringify(testUser));
    setUser(testUser);
    console.log("🧪 Dev login successful");
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    googleAuth,
    logout,
    devLogin, // Only for development
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};