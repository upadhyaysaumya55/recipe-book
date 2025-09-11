// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create the context
const AuthContext = createContext();

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Restore user on refresh from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  // 🔑 Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("❌ Invalid email or password");
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setCurrentUser(foundUser);
  };

  // 📝 Register function
  const register = ({ email, password, name }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate accounts
    if (users.find((u) => u.email === email)) {
      throw new Error("⚠️ Account already exists with this email");
    }

    const newUser = { email, password, name };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  // 🚪 Logout function
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    alert("✅ Logged out successfully!");
  };

  // ✅ Provide state + functions to the app
  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for consuming the context easily
export const useAuth = () => useContext(AuthContext);
