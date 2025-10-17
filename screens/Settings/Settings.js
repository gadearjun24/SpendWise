import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import ScreenHeader from "../../components/common/ScreenHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";

const Settings = () => {
  // Assuming ThemeContext provides:
  // theme: { colors: { background, surface, text, textSecondary, primary } }
  // isDark: boolean
  // toggleTheme: function
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  // Grouped Settings Options for a cleaner UI
  const settingsGroups = [
    {
      title: "Appearance",
      options: [
        {
          label: "Dark Mode",
          icon: "brightness-4", // Updated icon for theme
          type: "switch",
          color: theme.colors.primary,
        },
      ],
    },
    {
      title: "Account & Security",
      options: [
        {
          label: "Notifications",
          icon: "notifications-active", // Updated icon
          type: "button",
          action: () => console.log("Notifications pressed"),
          color: "#f59e0b", // Amber/Yellow
        },
        {
          label: "Account Details",
          icon: "person-outline", // Updated icon
          type: "button",
          action: () => console.log("Account pressed"),
          color: "#3b82f6", // Blue
        },
        {
          label: "Privacy & Security",
          icon: "security", // Updated icon
          type: "button",
          action: () => console.log("Privacy pressed"),
          color: "#ef4444", // Red
        },
      ],
    },
    {
      title: "Support",
      options: [
        {
          label: "Help & FAQ",
          icon: "help-outline",
          type: "button",
          action: () => console.log("Help pressed"),
          color: "#10b981", // Green
        },
        {
          label: "About App",
          icon: "info-outline",
          type: "button",
          action: () => console.log("About pressed"),
          color: "#6366f1", // Indigo
        },
      ],
    },
  ];

  const renderOption = (item, index, groupLength) => {
    const isLast = index === groupLength - 1;
    const isFirst = index === 0;

    // Determine border radius and style based on position in the group
    let optionStyle = {
      backgroundColor: theme.colors.surface,
      borderBottomWidth: isLast ? 0 : 1, // Hide border on the last item
      borderColor: theme.colors.border, // Use theme border color
    };

    if (isFirst && isLast) {
      optionStyle = { ...optionStyle, borderRadius: 16 };
    } else if (isFirst) {
      optionStyle = {
        ...optionStyle,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      };
    } else if (isLast) {
      optionStyle = {
        ...optionStyle,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomWidth: 0,
      };
    }

    const content = (
      <View style={styles.optionLeft}>
        {/* Colorful Icon Container */}
        <View
          style={[styles.iconCircle, { backgroundColor: `${item.color}20` }]}
        >
          <MaterialIcons name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={[styles.optionLabel, { color: theme.colors.text }]}>
          {item.label}
        </Text>
      </View>
    );

    if (item.type === "switch") {
      return (
        <View key={index} style={[styles.optionContainer, optionStyle]}>
          {content}
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.colors.textSecondary, true: item.color }}
            thumbColor={isDark ? theme.colors.surface : "#fff"}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={item.action}
        style={[styles.optionContainer, optionStyle]}
        activeOpacity={0.8}
      >
        {content}
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScreenHeader
        title="Settings"
        subtitle="Customize your application preferences"
      />
      <ScreenLayout>
        <View style={{ paddingHorizontal: 8, paddingTop: 4 }}>
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.groupWrapper}>
              {/* Group Title */}
              <Text
                style={[
                  styles.groupTitle,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {group.title}
              </Text>
              {/* Options Container (The actual Card) */}
              <View
                style={[
                  styles.groupCard,
                  {
                    backgroundColor: theme.colors.surface,
                    shadowColor: isDark ? theme.colors.text : "#000",
                  },
                ]}
              >
                {group.options.map((item, index) =>
                  renderOption(item, index, group.options.length)
                )}
              </View>
            </View>
          ))}
          <Text
            style={[styles.versionText, { color: theme.colors.textSecondary }]}
          >
            Version 3.2.0 (Build 3)
          </Text>
        </View>
      </ScreenLayout>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  groupWrapper: {
    marginBottom: 25, // Spacing between card groups
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  groupCard: {
    borderRadius: 16,
    overflow: "hidden", // Ensures options inside respect the card's border radius
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // Subtle shadow for elevation
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1, // Subtle border on the card group
    borderColor: "rgba(156,163,175,0.2)",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    minHeight: 60, // Ensure minimum height for touch target
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    padding: 8,
    borderRadius: 14, // Squircle shape
    marginRight: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  versionText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    opacity: 0.7,
  },
});
