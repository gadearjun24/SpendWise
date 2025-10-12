import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions, // Added for responsive chart width
} from "react-native";
import ScreenLayout from "../../components/layout/ScreenLayout";
import { PieChart, BarChart, LineChart } from "react-native-gifted-charts";
import { DarkModeTheme, LightTheme } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";
import ScreenHeader from "../../components/common/ScreenHeader";
import { ThemeContext } from "../../context/ThemeContext";

// Get screen width for responsive charting
const screenWidth = Dimensions.get("window").width;

const InsightsScreen = () => {
  const { theme, isDark } = useContext(ThemeContext);

  // Dummy Data
  const summaryCards = [
    {
      label: "Total Income",
      value: "₹2,300",
      color: "#10b981", // Emerald green
      icon: "trending-up",
    },
    {
      label: "Total Expense",
      value: "₹3,221", // Red
      color: "#ef4444",
      icon: "trending-down",
    },
    { label: "Net Savings", value: "₹1,050", color: "#3b82f6", icon: "wallet" }, // Blue
    // {
    //   label: "Spending Limit",
    //   value: "₹500 left",
    //   color: "#f59e0b", // Amber
    //   icon: "bar-chart",
    // },
  ];

  // Updated category colors for a more vibrant pie chart
  const categoryData = [
    { value: 40, color: "#ff6384", text: "Food" }, // Pink
    { value: 25, color: "#36a2eb", text: "Bills" }, // Bright Blue
    { value: 20, color: "#ffce56", text: "Shopping" }, // Yellow
    { value: 15, color: "#4bc0c0", text: "Travel" }, // Teal
  ];

  const trendData = [
    { value: 40, label: "S" },
    { value: 55, label: "M" },
    { value: 50, label: "T" },
    { value: 45, label: "W" },
    { value: 40, label: "T" },
    { value: 60, label: "F" },
    { value: 70, label: "S" },
  ];

  const topVendors = [
    { name: "Amazon", amount: "+1,200" },
    { name: "Zomato", amount: "-450" },
    { name: "Netflix", amount: "-300" },
  ];

  const alerts = [
    "Highest expense category this month: Food",
    "You saved ₹2,500 more than last month",
    "Subscription renewals this week",
  ];

  return (
    <>
      <ScreenHeader
        title={"Insights"}
        subtitle={"Detailed view of your finances"}
      />
      <ScreenLayout>
        {/* Summary Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10, paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingRight: 20 }} // Add padding to the end
        >
          {summaryCards.map((card, idx) => (
            <View
              key={idx}
              style={[
                styles.summaryCard,
                {
                  backgroundColor: theme.colors.surface,
                  marginHorizontal: 4, // Tighter spacing
                  marginBottom: 12,
                },
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: `${card.color}20` }, // Slightly more intense transparent color
                ]}
              >
                <MaterialIcons name={card.icon} size={24} color={card.color} />
              </View>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: theme.colors.textSecondary, fontWeight: "500" },
                ]}
              >
                {card.label}
              </Text>
              <Text style={[styles.summaryValue, { color: card.color }]}>
                {card.value}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Category Breakdown */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface, marginHorizontal: 10 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Category Breakdown
          </Text>
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <PieChart
              data={categoryData}
              radius={80} // Slightly larger
              innerRadius={45} // Slightly larger inner radius
              donut
              backgroundColor={theme.colors.background}
              centerLabelComponent={() => (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    100%
                  </Text>
                  <Text
                    style={{ color: theme.colors.textSecondary, fontSize: 12 }}
                  >
                    Expense
                  </Text>
                </View>
              )}
            />
          </View>
          <View style={styles.legendContainer}>
            {categoryData.map((item, i) => (
              <View key={i} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={{ color: theme.colors.text }}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Trends */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface, marginHorizontal: 10 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Weekly Spending Trend
          </Text>
          <View style={{ paddingHorizontal: 4, paddingBottom: 8 }}>
            <BarChart
              data={trendData}
              barWidth={20} // Slightly wider bars
              spacing={16} // Increased spacing
              initialSpacing={10}
              endSpacing={10}
              frontColor="#6366f1" // Indigo color
              roundedTop
              hideYAxisText
              is // Increased width calculation
              xAxisLabelTextStyle={{
                color: theme.colors.textSecondary,
                fontSize: 12,
                fontWeight: "500",
              }}
              yAxisTextStyle={{ color: theme.colors.textSecondary }}
              height={180} // Increased height
              noOfSections={4}
              barBorderRadius={5}
              showReferenceLine1
              referenceLine1Position={50}
              referenceLine1Color={"#f87171"} // Light red for spending limit
              referenceLine1StrokeWidth={1}
              referenceLine1Type={"dash"}
              yAxisLabelPrefix={"₹"}
            />
          </View>
        </View>

        {/* Top Vendors */}
        <View
          style={[
            styles.sectionContainer,
            {
              backgroundColor: theme.colors.surface,
              paddingVertical: 12,
              marginHorizontal: 10,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Top Vendors
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          >
            {topVendors.map((vendor, idx) => {
              // Determine if the amount is income or expense
              const isIncome = vendor.amount.startsWith("+");
              const cardBg = isIncome
                ? isDark
                  ? "#1f3f2f" // dark green for income
                  : "#d1fae5" // light green for income
                : isDark
                ? "#4b1f1f" // dark red for expense
                : "#fee2e2"; // light red for expense

              const textColor = isIncome
                ? isDark
                  ? "#4ade80" // Lighter green text for dark mode
                  : "#065f46"
                : isDark
                ? "#fca5a5" // Lighter red text for dark mode
                : "#b91c1c";

              return (
                <View
                  key={idx}
                  style={[
                    styles.vendorCard,
                    {
                      margin: 4,
                      backgroundColor: cardBg,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: textColor,
                      fontWeight: "700", // Bolder text
                      fontSize: 16, // Larger font size
                      marginBottom: 4,
                    }}
                  >
                    {vendor.name}
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontWeight: "600",
                      fontSize: 14, // Slightly larger amount
                    }}
                  >
                    ₹{vendor.amount.replace(/[\+\-]/, "")}{" "}
                    {/* Clean up sign for display and add ₹ */}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Insights / Alerts */}
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: theme.colors.surface, marginHorizontal: 10 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Personalized Insights
          </Text>
          {alerts.map((text, idx) => (
            <View
              key={idx}
              style={[
                styles.alertCard,
                {
                  backgroundColor: theme.colors.background,
                },
              ]}
            >
              <MaterialIcons
                name={idx === 1 ? "check-circle-outline" : "lightbulb-outline"}
                size={20}
                color={idx === 1 ? "#10b981" : "#f59e0b"}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.alertText, { color: theme.colors.text }]}>
                {text}
              </Text>
            </View>
          ))}
        </View>
      </ScreenLayout>
    </>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  // --- Enhanced Summary Card Styles ---
  summaryCard: {
    width: 150, // Slightly wider card
    borderRadius: 20, // More rounded corners
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "flex-start", // Align text to the left
    justifyContent: "space-between",
    elevation: 8, // Increased shadow for floating effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  iconCircle: {
    padding: 10, // Larger icon area
    borderRadius: 25,
    marginBottom: 10,
    alignSelf: "flex-start", // Align icon left
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.8,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 20, // Larger value text
    fontWeight: "800", // Extra bold value
    marginTop: 4,
  },
  // --- Enhanced Section Styles ---
  sectionContainer: {
    marginVertical: 14, // Slightly more space
    borderRadius: 20, // Consistent with summary cards
    padding: 16, // More padding inside
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  sectionTitle: {
    fontSize: 18, // Slightly larger title
    fontWeight: "700",
    marginBottom: 10,
    borderBottomWidth: 1, // Subtle separator line
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingBottom: 6,
  },
  // --- Enhanced Legend Styles ---
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // Distribute space evenly
    marginTop: 20,
    paddingHorizontal: 0, // Removed padding
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4, // Tighter spacing
    marginVertical: 4,
  },
  legendColor: {
    width: 14, // Larger circle
    height: 14,
    borderRadius: 7,
    marginRight: 8,
    borderWidth: 0, // Removed border
  },
  // --- Enhanced Vendor Card Styles ---
  vendorCard: {
    width: 120, // More compact card
    minHeight: 100,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, // More pronounced shadow
    shadowRadius: 6,
    elevation: 5,
  },
  // --- Enhanced Alert Card Styles ---
  alertCard: {
    flexDirection: "row", // Align icon and text
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    // backgroundColor: "#ffffff", // Use white/near-surface for alerts
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6", // Blue accent for general insights
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  alertText: {
    fontSize: 14, // Slightly larger and easier to read
    fontWeight: "500",
    flexShrink: 1, // Allows text to wrap
  },
});
