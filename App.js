import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "./navigation";
import { ThemeProvider } from "./context/ThemeContext";
import { TransactionProvider } from "./context/TransactionsContext";

export default function App() {
  return (
    <PaperProvider>
      <ThemeProvider>
        <TransactionProvider>
        <AppNavigation />
        </TransactionProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
