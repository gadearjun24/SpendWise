import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "./navigation";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <PaperProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </PaperProvider>
  );
}
