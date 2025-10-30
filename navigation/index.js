import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";
import { useTransaction } from "../context/TransactionsContext";
import * as Splash from "expo-splash-screen";
import BottomTabs from "./BottomTabs";
import SplashScreen from "../screens/SplashScreen/SplashScreen";

Splash.preventAutoHideAsync(); // stop Expo from auto-hiding early

const AppNavigation = () => {
  const { theme } = useContext(ThemeContext);
  const { isInitialDataLoaded } = useTransaction();
  const { isThemeLoaded } = useContext(ThemeContext);
  const [showSplash, setShowSplash] = useState(true);

  const isReady = isInitialDataLoaded && isThemeLoaded;

  useEffect(() => {
    if (isReady) {
      // Hide splash after a short delay (simulate 10s testing)
      const timer = setTimeout(async () => {
        setShowSplash(false);
        await Splash.hideAsync(); // now hide Expo’s splash
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <NavigationContainer>
        {showSplash ? <SplashScreen /> : <BottomTabs />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigation;
