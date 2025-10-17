import { View, Text } from "react-native";
import React, { useContext } from "react";
import ScreenLayout from "../../components/layout/ScreenLayout";
import { ThemeContext } from "../../context/ThemeContext";
import SplashScreen from "../SplashScreen/SplashScreen";

export default function Profile() {
  const { theme } = useContext(ThemeContext);

  return (
    <SplashScreen />
    // <ScreenLayout>
    //   <Text>Profile</Text>
    // </ScreenLayout>
  );
}
