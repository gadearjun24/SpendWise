import React, { useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../context/ThemeContext";
import { useTransaction } from "../../context/TransactionsContext";
import logo from "../../assets/icons/logo.png";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const { theme, isDark, isThemeLoaded } = useContext(ThemeContext);
  const { isInitialDataLoaded } = useTransaction();



  // 🪄 Start with fade=0 for fade-in, scale=0.8 for bounce effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Play entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

  }, [isThemeLoaded, isInitialDataLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      {/* Gradient Background */}
      <LinearGradient
        colors={
          isDark
            ? ["#0f172a", "#1e293b", "#334155"]
            : ["#ecfdf5", "#d1fae5", "#a7f3d0"]
        }
        style={styles.gradientBackground}
      />

      {/* Main Content */}
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View
            style={[
              styles.logoWrapper,
              {
                backgroundColor: isDark ? "#0f172a" : "#fff",
                shadowColor: isDark ? "#10b981" : "#34d399",
              },
            ]}
          >
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>

          {/* App Name */}
          <Animated.Text
            style={[
              styles.appName,
              {
                color: theme.colors.text,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            Spend<Text style={{ color: "#10b981" }}>Wise</Text>
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text
            style={[
              styles.tagline,
              {
                color: theme.colors.textSecondary,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            Smart Spending Starts Here 💸
          </Animated.Text>
        </Animated.View>

        {/* Footer Text */}
        <Animated.Text
          style={[
            styles.loadingText,
            {
              opacity: fadeAnim,
              color: theme.colors.textSecondary,
            },
          ]}
        >
          Loading your insights...
        </Animated.Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    width,
    height,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logo: {
    width: 90,
    height: 90,
  },
  appName: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 15,
    marginTop: 10,
    fontStyle: "italic",
    textAlign: "center",
  },
  loadingText: {
    position: "absolute",
    bottom: 70,
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
