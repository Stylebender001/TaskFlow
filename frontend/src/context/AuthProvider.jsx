import React, { useState, useMemo } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch(err) {
      console.error("Failed to parse user:", err);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  const login = ({ user, role, token, profileCompleted }) => {
    setUser(user);
    setRole(role);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    localStorage.setItem("profileCompleted", profileCompleted);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  const completeProfile = async (updatedUserData) => {
    try {
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUserData
      }));
      
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...updatedUserData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("profileCompleted", "true");
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Profile completion failed:", error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      role,
      login,
      logout,
      completeProfile,
    }),
    [user, role]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};