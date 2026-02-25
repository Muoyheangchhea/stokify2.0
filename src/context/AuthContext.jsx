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
  const googleAuth = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "🔐 Google auth for:",
        userData.email,
        "Role:",
        userData.role,
      );

      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          googleId: userData.googleId,
          picture: userData.picture,
          role: userData.role,
        }),
      });

      const data = await response.json();
      console.log("📥 Google auth response:", data);

      if (!response.ok) {
        // Handle 409 Conflict (user already exists)
        if (response.status === 409) {
          return { success: false, error: "User already exists" };
        }
        // Handle 404 Not Found (user doesn't exist)
        if (response.status === 404) {
          return { success: false, error: "User not found" };
        }
        return {
          success: false,
          error: data.message || "Google authentication failed",
        };
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      console.error("❌ Google auth error:", err);
      setError(err.message);
      return { success: false, error: err.message };
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
