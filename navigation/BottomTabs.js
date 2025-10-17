import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Insights from "../screens/Insights/Insights";
import Transactions from "../screens/Transactions/Transactions";
import Settings from "../screens/Settings/Settings";
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const CustomTabBar = ({ state, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const centerButtonSize = 60;
  const sideWidth = width * 0.35; // width for left and right tabs

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 7,
        right: 7,
        height: 60,
        width: "96%",

        backgroundColor: theme.colors.card,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {/* Left tabs */}
      <View
        style={{
          flexDirection: "row",
          width: sideWidth,
          justifyContent: "space-around",
        }}
      >
        {["Transactions", "Insights"].map((name, index) => {
          const isFocused = state.index === index;
          const iconName =
            name === "Transactions" ? "account-balance-wallet" : "bar-chart";
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              style={{ alignItems: "center" }}
            >
              <MaterialIcons
                name={iconName}
                size={22}
                color={
                  isFocused ? theme.colors.primary : theme.colors.textSecondary
                }
              />
              <Text
                style={{
                  fontSize: 11,
                  color: isFocused
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                  marginTop: 2,
                  textAlign: "center",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Right tabs */}
      <View
        style={{
          flexDirection: "row",
          width: sideWidth,
          justifyContent: "space-around",
        }}
      >
        {["Profile", "Settings"].map((name, index) => {
          const isFocused = state.index === index + 3; // right tabs index
          const iconName = name === "Profile" ? "person" : "settings";
          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              style={{ alignItems: "center" }}
            >
              <MaterialIcons
                name={iconName}
                size={22}
                color={
                  isFocused ? theme.colors.primary : theme.colors.textSecondary
                }
              />
              <Text
                style={{
                  fontSize: 11,
                  color: isFocused
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                  marginTop: 2,
                  textAlign: "center",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Center Home button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          position: "absolute",
          top: -centerButtonSize / 2,
          left: width / 2 - centerButtonSize / 2,
          width: centerButtonSize,
          height: centerButtonSize,
          borderRadius: centerButtonSize / 2,
          backgroundColor:
            state.index === 2
              ? theme.colors.primary
              : theme.colors.textSecondary, // change color if focused,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <MaterialIcons name="home" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Insights" component={Insights} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
