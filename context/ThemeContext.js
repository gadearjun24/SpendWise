import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkModeTheme, LightTheme } from "../theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);
  const [isDark, setIsDark] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        setIsThemeLoaded(false);
        const storedTheme = await AsyncStorage.getItem("@theme_preference");
        if (storedTheme !== null) {
          const dark = storedTheme === "dark";
          setIsDark(dark);
          setTheme(dark ? DarkModeTheme : LightTheme);
        } else {
          // If no stored theme, use system preference
          const systemTheme = Appearance.getColorScheme();
          const dark = systemTheme === "dark";
          setIsDark(dark);
          setTheme(dark ? DarkModeTheme : LightTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }finally{
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      setTheme(newIsDark ? DarkModeTheme : LightTheme);
      await AsyncStorage.setItem(
        "@theme_preference",
        newIsDark ? "dark" : "light"
      );
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme,isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};
