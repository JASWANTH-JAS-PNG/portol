import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const ACCENT_COLORS = [
  { name: "Purple", primary: "#5b4fcf", dark: "#493ea8" },
  { name: "Blue", primary: "#2f6fed", dark: "#2555bd" },
  { name: "Teal", primary: "#17a398", dark: "#12857b" },
  { name: "Pink", primary: "#e0507a", dark: "#b83f63" },
  { name: "Orange", primary: "#e08b2f", dark: "#b96f22" },
];

function readStored(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => readStored("portol-theme", "light"));
  const [accentName, setAccentName] = useState(() => readStored("portol-accent", "Purple"));
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("portol-theme", theme);
    } catch {
      // ignore storage failures (e.g. private browsing)
    }
  }, [theme]);

  useEffect(() => {
    const accent = ACCENT_COLORS.find((c) => c.name === accentName) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty("--color-primary", accent.primary);
    document.documentElement.style.setProperty("--color-primary-dark", accent.dark);
    try {
      localStorage.setItem("portol-accent", accentName);
    } catch {
      // ignore storage failures (e.g. private browsing)
    }
  }, [accentName]);

  const value = {
    theme,
    setTheme,
    accentName,
    setAccentName,
    isLoggedIn,
    logout: () => setIsLoggedIn(false),
    login: () => setIsLoggedIn(true),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
