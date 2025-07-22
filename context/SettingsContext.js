'use client'

import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const SettingsContext = createContext();

// Provider component
export const SettingsProvider = ({ children }) => {
  // Initialize state from localStorage
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return {}; // for SSR

    const stored = localStorage.getItem("checkinState");
    return stored
      ? JSON.parse(stored)
      : {
          checkIn: false,
          checkOut: false,
          notificationsEnabled: true,
        };
  });

  // Persist to localStorage on state change
  useEffect(() => {
    localStorage.setItem("checkinState", JSON.stringify(state));
  }, [state]);

  // Update specific values
  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ state, updateState }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to consume the SettingContext
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context
}