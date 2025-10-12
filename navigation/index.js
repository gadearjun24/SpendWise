import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./BottomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

const AppNavigation = () => {
  const { theme, isDark } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigation;
