"use client";

import type React from "react";
import {useState, useEffect} from "react";
import {ThemeContext, type Theme} from "@/context/theme-store";
const THEME_STORAGE_KEY = "theme";
const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

const getStoredThemePreference = (): Theme | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themePreference, setThemePreference] = useState<Theme | null>(
    getStoredThemePreference,
  );
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const theme = themePreference ?? systemTheme;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (themePreference) {
      localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [themePreference]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setThemePreference(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
