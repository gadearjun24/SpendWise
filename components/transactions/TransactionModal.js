import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { X } from "lucide-react-native";

const { height } = Dimensions.get("window");

const TransactionModal = ({
  isModalVisible,
  setIsModalVisible,
  theme,
  handleAddTransaction,
}) => {
  const [currentType, setCurrentType] = useState("Expense");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryFocused, setCategoryFocused] = useState(false);

  // Default categories
  const [categories, setCategories] = useState({
    Expense: [
      "Food & Dining",
      "Groceries",
      "Transportation",
      "Bills & Utilities",
      "Rent / Mortgage",
      "Shopping",
      "Entertainment",
      "Health & Fitness",
      "Subscriptions",
      "Education / Courses",
      "Insurance",
      "Loans / EMIs",
      "Investments",
      "Taxes",
      "Gifts",
      "Donations",
      "Others",
    ],
    Income: [
      "Salary",
      "Business",
      "Freelance / Side Hustle",
      "Investments",
      "Rent Income",
      "Gifts / Others",
    ],
  });
  const now = new Date();
  const newTransactionRef = useRef({
    type: "Expense",
    name: "",
    amount: "",
    category: "",
    createdAt: now.toISOString().split("T")[0], // YYYY-MM-DD
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // HH:MM
  });

  // Handle category input change
  const handleCategoryChange = (text) => {
    setCategoryInput(text);
    newTransactionRef.current.category = text;

    const available = categories[currentType].filter((c) =>
      c.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(available);
  };

  // Handle category selection from suggestions
  const handleCategorySelect = (cat) => {
    setCategoryInput(cat);
    newTransactionRef.current.category = cat;
    setFilteredCategories([]);
  };

  // Handle save
  const handleSave = () => {
    const cat = categoryInput.trim();

    // If category is new, add to list
    if (
      cat &&
      !categories[currentType].some(
        (c) => c.toLowerCase() === cat.toLowerCase()
      )
    ) {
      setCategories((prev) => ({
        ...prev,
        [currentType]: [...prev[currentType], cat],
      }));
    }

    handleAddTransaction({
      ...newTransactionRef.current,
      category: cat,
      createdAt: selectedDate.toISOString().split("T")[0],
      time: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    const now = new Date();

    newTransactionRef.current = {
      type: "Expense",
      name: "",
      amount: "",
      category: "",
      createdAt: now.toISOString().split("T")[0], // YYYY-MM-DD
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // HH:MM
    };

    setIsModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={-height * 0.15}
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
              },
            ]}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                New Transaction
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <MaterialIcons
                  name="close"
                  size={22}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                showsVerticalScrollIndicator
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Transaction Type Toggle */}
                <View style={styles.typeToggleContainer}>
                  {["Expense", "Income"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeToggle,
                        {
                          backgroundColor: theme.colors.background,
                        },
                        currentType === type &&
                        styles.typeToggleActive(theme, type),
                      ]}
                      onPress={() => {
                        setCurrentType(type);
                        newTransactionRef.current.type = type;
                        setCategoryInput("");
                        setFilteredCategories([]);
                      }}
                    >
                      <Text
                        style={styles.typeToggleText(
                          currentType === type,
                          theme
                        )}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Vendor, Amount */}
                {[
                  { label: "Vendor / Name", key: "name", icon: "label-outline" },
                  { label: "Amount (₹)", key: "amount", icon: "payments" },
                ].map((field) => (
                  <View key={field.key} style={styles.inputGroup}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {field.label}
                    </Text>
                    <View style={styles.inputWrapper(theme)}>
                      <MaterialIcons
                        name={field.icon}
                        size={22}
                        color={theme.colors.textSecondary}
                      />
                      <TextInput
                        placeholder={field.label}
                        placeholderTextColor={theme.colors.textSecondary}
                        style={[styles.modalInput, { color: theme.colors.text }]}
                        defaultValue={newTransactionRef.current[field.key]}
                        onChangeText={(text) =>
                          (newTransactionRef.current[field.key] = text)
                        }
                        keyboardType={
                          field.key === "amount" ? "numeric" : "default"
                        }
                      />
                    </View>
                  </View>
                ))}

                {/* Category Input with Suggestions */}
                <View style={styles.inputGroup}>
                  <Text
                    style={[
                      styles.inputLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Category
                  </Text>
                  <View style={styles.inputWrapper(theme)}>
                    <MaterialIcons
                      name="category"
                      size={22}
                      color={theme.colors.textSecondary}
                    />
                    <TextInput
                      placeholder="Start typing..."
                      placeholderTextColor={theme.colors.textSecondary}
                      value={categoryInput}
                      onChangeText={handleCategoryChange}
                      onFocus={() => setCategoryFocused(true)}

                      style={[styles.modalInput, { color: theme.colors.text }]}
                    />
                  </View>

                  {/* Category Suggestions */}
                  {categoryFocused && filteredCategories.length > 0 && (
                    <View style={[styles.suggestionBox, { backgroundColor: theme.colors.card }]}>
                      {/* Close button */}
                      <TouchableOpacity
                        style={styles.suggestionCloseButton}
                        onPress={() => {
                          setCategoryFocused(false);
                          setCategoryInput("");
                          setFilteredCategories([]);
                        }}
                      >
                        <MaterialIcons name="close" size={20} color={theme.colors.textSecondary} />
                      </TouchableOpacity>
                      <ScrollView style={{ flex: 1, position: "relative" }} nestedScrollEnabled >

                        {filteredCategories.map((item) => (
                          <TouchableOpacity
                            key={item}
                            style={styles.suggestionItem}
                            onPress={() => {
                              handleCategorySelect(item);
                              setCategoryFocused(false); // close suggestions when selected
                            }}
                          >
                            <Text style={{ color: theme.colors.text, fontSize: 15 }}>
                              {item}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}


                </View>

                {/* Date Picker */}
                <View style={styles.inputGroup}>
                  <Text
                    style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
                  >
                    Date (YYYY-MM-DD)
                  </Text>
                  <TouchableOpacity
                    style={styles.inputWrapper(theme)}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <MaterialIcons
                      name="calendar-today"
                      size={22}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.modalInput, { color: theme.colors.text }]}>
                      {selectedDate.toISOString().split("T")[0]}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="calendar"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                          setSelectedDate(date);
                          newTransactionRef.current.createdAt =
                            date.toISOString().split("T")[0];
                        }
                      }}
                    />
                  )}
                </View>

                {/* Time Picker */}
                <View style={styles.inputGroup}>
                  <Text
                    style={[styles.inputLabel, { color: theme.colors.textSecondary }]}
                  >
                    Time (HH:MM)
                  </Text>
                  <TouchableOpacity
                    style={styles.inputWrapper(theme)}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <MaterialIcons
                      name="access-time"
                      size={22}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.modalInput, { color: theme.colors.text }]}>
                      {selectedTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={selectedTime}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={(event, time) => {
                        setShowTimePicker(false);
                        if (time) {
                          setSelectedTime(time);
                          newTransactionRef.current.time = time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                        }
                      }}
                    />
                  )}
                </View>

                {/* Save Button */}
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                  onPress={handleSave}
                >
                  <MaterialIcons name="save" color="#fff" size={20} />
                  <Text style={styles.addButtonText}>Save Transaction</Text>
                </TouchableOpacity>
              </ScrollView>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
    height: "90%",
  },
  modalContent: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  closeButton: { padding: 4 },
  typeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 18,
  },
  typeToggle: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderWidth: 1.2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  typeToggleActive: (theme, type) => ({
    backgroundColor:
      type === "Expense" ? theme.colors.error : theme.colors.secondary,
    borderColor:
      type === "Expense" ? theme.colors.error : theme.colors.secondary,
  }),
  typeToggleText: (active, theme) => ({
    fontWeight: "600",
    color: theme.colors.text,
    fontSize: 15,
  }),
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    opacity: 0.8,
  },
  inputWrapper: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: theme.colors.card ?? "#fafafa",
  }),
  modalInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 6,
  },
  suggestionBox: {
    position: "absolute",
    top: 50, // adjust based on input height
    width: "100%",
    maxHeight: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    zIndex: 100,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden"
  },
  suggestionCloseButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 101,
    padding: 4,
  },

  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 6,
  },
});
