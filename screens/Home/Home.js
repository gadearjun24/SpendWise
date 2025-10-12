import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import { PieChart, BarChart } from "react-native-gifted-charts";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Sun,
  CheckCircle,
} from "lucide-react-native"; // Added Sun and CheckCircle for more style
import ScreenLayout from "../../components/layout/ScreenLayout";
import { ThemeContext } from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);

  // Updated colors for a more vibrant, modern palette
  const summaryData = [
    {
      label: "Total Spent",
      value: "₹1,250",
      color: "#f43f5e", // Rose Red
      icon: TrendingDown,
    },
    {
      label: "Total Income",
      value: "₹2,300",
      color: "#10b981", // Emerald Green
      icon: TrendingUp,
    },
    {
      label: "Net Balance",
      value: "₹1,050",
      color: "#3b82f6", // Royal Blue
      icon: Wallet,
    },
  ];

  // Updated spending data colors for a more appealing pie chart
  const spendingData = [
    { value: 40, color: "#f97316", text: "Food" }, // Orange
    { value: 25, color: "#6366f1", text: "Bills" }, // Indigo
    { value: 20, color: "#d946ef", text: "Shopping" }, // Fuchsia
    { value: 15, color: "#06b6d4", text: "Travel" }, // Cyan
  ];

  const weeklySpending = [
    { value: 40, label: "S" },
    { value: 55, label: "M" },
    { value: 50, label: "T" },
    { value: 45, label: "W" },
    { value: 40, label: "T" },
    { value: 60, label: "F" },
    { value: 70, label: "S" },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: "Zomato",
      type: "Food",
      amount: "-₹450",
      color: "#f43f5e",
      time: "Yesterday",
    },
    {
      id: 2,
      name: "Amazon Prime",
      type: "Shopping",
      amount: "-₹1,200",
      color: "#f43f5e",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "Monthly Salary",
      type: "Income",
      amount: "+₹2,300",
      color: "#10b981",
      time: "3 days ago",
    },
  ];

  // // Determine greeting based on time (simple placeholder logic)
  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good Morning";
  //   if (hour < 18) return "Good Afternoon";
  //   return "Good Evening";
  // };

  // Determine greeting text and icon
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12)
      return { text: "Good Morning", icon: "wb-sunny", color: "#fbbf24" };
    if (hour < 18)
      return { text: "Good Afternoon", icon: "wb-cloudy", color: "#3b82f6" };
    return { text: "Good Evening", icon: "nights-stay", color: "#f97316" };
  };

  const { text, icon, color } = getGreeting();

  return (
    <>
      <ScreenLayout>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <MaterialIcons name={icon} size={24} color={color} />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[
                  styles.greeting,
                  {
                    color: theme.colors.text,
                    width: 200,
                  },
                ]}
              >
                {text}, Arjun
              </Text>
            </View>
            <Text
              style={[styles.dateText, { color: theme.colors.textSecondary }]}
            >
              {new Date().toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </View>
          <View
            style={[
              styles.syncChip,
              {
                backgroundColor: theme.dark ? "#166534" : "#dcfce7", // Darker green background in dark mode
              },
            ]}
          >
            <CheckCircle
              size={14}
              color={theme.dark ? "#4ade80" : "#16a34a"}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{
                color: theme.dark ? "#4ade80" : "#16a34a",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              Synced
            </Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                style={[
                  styles.summaryCard,
                  { backgroundColor: theme.colors.surface },
                ]}
                // Stronger shadow effect
                elevation={4}
              >
                <View style={{ alignItems: "center" }}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: `${item.color}25` }, // More vivid background
                    ]}
                  >
                    <Icon color={item.color} size={24} />
                  </View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      styles.summaryLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={[styles.summaryValue, { color: item.color }]}>
                    {item.value}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>

        {/* Spending Breakdown (Pie Chart) */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Category Spending
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PieChart
              data={spendingData}
              radius={85} // Larger chart
              innerRadius={50}
              donut
              focusOnPress
              backgroundColor={theme.colors.background}
              centerLabelComponent={() => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontWeight: "800",
                      fontSize: 18,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    ₹3,000
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: 12,
                    }}
                  >
                    Total Spend
                  </Text>
                </View>
              )}
            />
            {/* Legend placed to the right */}
            <View style={styles.legendContainerVertical}>
              {spendingData.map((item, i) => (
                <View key={i} style={styles.legendItemVertical}>
                  <View
                    style={[
                      styles.legendColor,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={{ color: theme.colors.text, fontSize: 14 }}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Weekly Trend (Bar Chart) */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Weekly Spending Trend
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 4, paddingVertical: 10 }}>
              <BarChart
                data={weeklySpending}
                barWidth={22} // Wider bars
                spacing={12} // Increased spacing
                frontColor="#3b82f6" // Use a vibrant blue
                roundedTop
                hideYAxisText
                hideRules
                height={180}
                width={screenWidth - 70} // Make it slightly wider than screen for scroll
                xAxisLabelTextStyle={{
                  color: theme.colors.textSecondary,
                  fontWeight: "600",
                }}
                yAxisTextStyle={{ color: theme.colors.textSecondary }}
                showReferenceLine1
                referenceLine1Position={50}
                referenceLine1Color={"#f43f5e"}
                referenceLine1StrokeWidth={1}
                referenceLine1Type={"dash"}
              />
            </View>
          </ScrollView>
        </View>

        {/* Recent Transactions */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Transactions
          </Text>
          <FlatList
            style={{
              paddingBottom: 8,
            }}
            data={recentTransactions}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.transactionItem,
                  {
                    backgroundColor: theme.colors.background, // Use background for contrast
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={[
                      styles.transactionIconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <Wallet size={20} color={item.color} />
                  </View>
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={[
                        styles.transactionName,
                        { color: theme.colors.text },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.transactionType,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {item.time} • {item.type}
                    </Text>
                  </View>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.transactionAmount, { color: item.color }]}
                >
                  {item.amount}
                </Text>
              </View>
            )}
          />
        </View>
      </ScreenLayout>

      {/* Floating Add Button */}
      <FAB
        icon="plus"
        color="#fff"
        style={[styles.fab, { backgroundColor: "#3b82f6" }]} // Vibrant Blue FAB
        onPress={() => console.log("Add Transaction")}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // --- Header Styles ---
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24, // More space below header
    paddingTop: 10,
    paddingHorizontal: 8, // Consistent padding for screen edges
  },
  greeting: {
    fontSize: 22, // Larger, more impactful greeting
    fontWeight: "700", // Bolder text
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    opacity: 0.8,
  },
  syncChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16, // More rounded chip
  },
  // --- Summary Card Styles ---
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4, // Apply padding to the container
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20, // More rounded, modern look
    paddingVertical: 18, // Increased padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  iconCircle: {
    padding: 10, // Larger icon area
    borderRadius: 30,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14, // Slightly larger label
    fontWeight: "500",
    opacity: 0.8,
  },
  summaryValue: {
    fontSize: 16, // Larger value text
    fontWeight: "700", // Extra bold value
    marginTop: 6,
  },
  // --- Section Styles ---
  sectionContainer: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 20, // Consistent rounded corners
    padding: 16, // Increased padding
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  sectionTitle: {
    fontSize: 18, // Larger section title
    fontWeight: "600",
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1, // Subtle separator
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  // --- Pie Chart & Legend Styles ---
  legendContainerVertical: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "40%", // Allocate space for legend
  },
  legendItemVertical: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4, // Tighter vertical list
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  // --- Transaction List Styles ---
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16, // Increased padding
    borderRadius: 16, // More rounded list items
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  transactionIconContainer: {
    padding: 8,
    borderRadius: 10,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionType: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "400",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  // --- FAB Style ---
  fab: {
    position: "absolute",
    right: 24, // Adjusted position
    bottom: 60, // Adjusted position
    borderRadius: 30, // Ensure it's perfectly round
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Stronger shadow for floating effect
    shadowColor: "#3b82f6", // Blue shadow for FAB
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
