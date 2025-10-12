import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Dimensions,
  Appearance,
} from "react-native";
import { DarkModeTheme, LightTheme } from "../../theme";
import { ThemeContext } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");

const ScreenHeader = ({ title, subtitle, style }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
    >
      <Text
        style={[styles.title, { color: theme.colors.text }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 12,
    paddingTop: 8, // Works with StatusBar on iOS/Android
    paddingBottom: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10, // Always on top
    borderBottomWidth: 1,
    borderBottomColor: "rgba(156, 163, 175, 0.4)",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
});
