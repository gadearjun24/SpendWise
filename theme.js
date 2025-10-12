import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3B82F6", // Blue accent
    secondary: "#10B981", // Green accent
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#111827", // Dark text
    error: "#EF4444", // Red
    surface: "#FFFFFF",
    text: "#111827",
    textSecondary: "#6b7280",
  },
};

export const DarkModeTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3B82F6",
    secondary: "#10B981",
    background: "#1F2937",
    card: "#374151",
    text: "#F9FAFB",
    error: "#EF4444",
    surface: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
  },
};
