import React, { useContext } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

const ScreenLayout = ({ children, style }) => {
  const { theme, isDark } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, ...style },
      ]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    paddingTop: 0,
  },
});

export default ScreenLayout;
