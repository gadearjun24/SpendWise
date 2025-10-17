import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext";
import ScreenLayout from "../../components/layout/ScreenLayout";
import ScreenHeader from "../../components/common/ScreenHeader";
import { useTransaction } from "../../context/TransactionsContext";
import TransactionModal from "../../components/transactions/TransactionModal";

const { width, height } = Dimensions.get("window");

const initialNewTransaction = {
  name: "",
  amount: "",
  category: "",
  type: "Expense",
  createdAt: new Date().toISOString().slice(0, 10),
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

const Transactions = () => {
  const { theme, isDark } = useContext(ThemeContext);
  const { transactions, addTransaction, deleteTransaction} = useTransaction()
  // const [transactions, setTransactions] = useState([
  //   {
  //     id: 1,
  //     name: "Amazon Prime",
  //     type: "Expense",
  //     amount: "-₹1,200",
  //     category: "Shopping",
  //     time: "10:30 AM",
  //     createdAt: "2025-10-12",
  //   },
  //   {
  //     id: 2,
  //     name: "Monthly Salary",
  //     type: "Income",
  //     amount: "+₹45,300",
  //     category: "Income",
  //     time: "9:00 AM",
  //     createdAt: "2025-10-12",
  //   },
  //   {
  //     id: 3,
  //     name: "Zomato Dinner",
  //     type: "Expense",
  //     amount: "-₹450",
  //     category: "Food",
  //     time: "8:45 PM",
  //     createdAt: "2025-10-11",
  //   },
  // ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDate, setActiveDate] = useState("All");
  const [allCategories, setAllCategories] = useState(["All", "Food", "Shopping", "Income"])

  const [newTransaction,setNewTransaction] = useState();
  const [currentType, setCurrentType] = useState("Expense");

  // --------- GET CATEGORIES -------------

  useEffect(() => {
    const categories = transactions.map((t) => {
      return t.category;
    })
    setAllCategories(["All", ...new Set(categories)])
  }, [transactions])

  // --------- SUMMARY CALCULATION ----------
  const calculateSummary = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((t) => {
      const value = parseFloat(t.amount.replace(/[^\d.-]/g, ""));
      if (t.type === "Income") totalIncome += value;
      else totalExpense += Math.abs(value);
    });
    return {
      income: `₹${totalIncome.toLocaleString("en-IN")}`,
      expense: `₹${totalExpense.toLocaleString("en-IN")}`,
    };
  };
  const summary = calculateSummary();

  // --------- FILTER & SEARCH ----------
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchText.toLowerCase()) ||
      t.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || t.category === activeCategory;
    const matchesDate =
      activeDate === "All"
        ? true
        : activeDate === "Today"
          ? t.createdAt === new Date().toISOString().slice(0, 10)
          : activeDate === "This Week"
            ? Date.now() - new Date(t.createdAt).getTime() < 7 * 86400000
            : true;
    return matchesSearch && matchesCategory && matchesDate;
  });

  // --------- ADD TRANSACTION ----------
  const handleAddTransaction = (newTx) => {
    console.log({newTx})
    if (!newTx.name || !newTx.amount) return;

    const parsed = parseFloat(newTx.amount);

    if (isNaN(parsed)) return;

    const newTransaction = {
      id: Date.now(),
      ...newTx,
      updatedAt: newTx.createdAt,
      amount: `${parsed}`,
      isIncome: newTx.type === "Income",
      isExpense: newTx.type === "Expense",
    }

    addTransaction(newTransaction)
    setIsModalVisible(false);
    setCurrentType("Expense")
  };

  // --------- MODAL COMPONENT ----------
  // const TransactionModal = () => (
  //   <Modal
  //     animationType="slide"
  //     transparent
  //     visible={isModalVisible}
  //     onRequestClose={() => setIsModalVisible(false)}
  //   >
  //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //       <View style={styles.modalOverlay}>
  //         <KeyboardAvoidingView
  //           behavior={Platform.OS === "ios" ? "padding" : undefined}
  //           keyboardVerticalOffset={-height * 0.15}
  //           style={[
  //             styles.modalContainer,
  //             { backgroundColor: theme.colors.background },
  //           ]}
  //         >
  //           <View
  //             style={[
  //               styles.modalContent,
  //               {
  //                 borderColor: theme.colors.border,
  //                 backgroundColor: theme.colors.background,
  //               },
  //             ]}
  //           >
  //             <View style={styles.modalHeader}>
  //               <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
  //                 New Transaction
  //               </Text>
  //               <TouchableOpacity onPress={() => setIsModalVisible(false)}>
  //                 <MaterialIcons
  //                   name="close"
  //                   size={22}
  //                   color={theme.colors.textSecondary}
  //                 />
  //               </TouchableOpacity>
  //             </View>

  //             <ScrollView showsVerticalScrollIndicator={true}
  //               alwaysBounceVertical={true}
  //               contentContainerStyle={{
  //                 flexGrow: 1,       // ✅ makes content scroll even if it's not tall enough
  //                 paddingBottom: 120
  //               }}
  //               keyboardShouldPersistTaps="handled"
  //               keyboardDismissMode="on-drag"
  //             >
  //               {/* Type toggle */}
  //               <View style={styles.typeToggleContainer}>
  //                 {["Expense", "Income"].map((type) => (
  //                   <TouchableOpacity
  //                     key={type}
  //                     style={[
  //                       styles.typeToggle,
  //                       currentType === type &&
  //                       styles.typeToggleActive(theme, type),
  //                     ]}
  //                     onPress={() => {
  //                       setCurrentType(type);
  //                       newTransactionRef.current.type = type;
  //                     }}
  //                   >
  //                     <Text style={styles.typeToggleText(currentType === type)}>
  //                       {type}
  //                     </Text>
  //                   </TouchableOpacity>
  //                 ))}
  //               </View>

  //               {/* Input Fields */}
  //               {[
  //                 {
  //                   label: "Vendor / Name",
  //                   key: "name",
  //                   icon: "label-outline",
  //                 },
  //                 { label: "Amount (₹)", key: "amount", icon: "payments" },
  //                 { label: "Category", key: "category", icon: "category" },
  //                 {
  //                   label: "Date (YYYY-MM-DD)",
  //                   key: "createdAt",
  //                   icon: "calendar-today",
  //                 },
  //                 { label: "Time (HH:MM)", key: "time", icon: "access-time" },
  //               ].map((field) => (
  //                 <View key={field.key} style={styles.inputGroup}>
  //                   <Text
  //                     style={[
  //                       styles.inputLabel,
  //                       { color: theme.colors.textSecondary },
  //                     ]}
  //                   >
  //                     {field.label}
  //                   </Text>
  //                   <View style={styles.inputWrapper(theme)}>
  //                     <MaterialIcons
  //                       name={field.icon}
  //                       size={20}
  //                       color={theme.colors.textSecondary}
  //                     />
  //                     <TextInput
  //                       placeholder={field.label}
  //                       placeholderTextColor={theme.colors.textSecondary}
  //                       style={[
  //                         styles.modalInput,
  //                         { color: theme.colors.text },
  //                       ]}
  //                       defaultValue={newTransactionRef.current[field.key]}
  //                       onChangeText={(text) =>
  //                         (newTransactionRef.current[field.key] = text)
  //                       }
  //                       keyboardType={
  //                         field.key === "amount" ? "numeric" : "default"
  //                       }
  //                     />
  //                   </View>
  //                 </View>
  //               ))}

  //               <TouchableOpacity
  //                 style={[
  //                   styles.addButton,
  //                   { backgroundColor: theme.colors.primary },
  //                 ]}
  //                 onPress={handleAddTransaction}
  //               >
  //                 <Text style={styles.addButtonText}>Save Transaction</Text>
  //               </TouchableOpacity>
  //             </ScrollView>
  //           </View>
  //         </KeyboardAvoidingView>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   </Modal>
  // );

  // --------- MAIN RENDER ----------
  return (
    <>
      <ScreenHeader
        title={"Transactions"}
        subtitle={"Track your income & expenses"}
      />
      <ScreenLayout>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          {/* Search & Filter */}
          <View style={styles.searchWrapper(theme)}>
            <MaterialIcons
              name="search"
              size={20}
              color={theme.colors.textSecondary}
            />
            <TextInput
              placeholder="Search by vendor or category"
              placeholderTextColor={theme.colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
              style={[styles.searchInput, { color: theme.colors.text }]}
            />
            <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
              <MaterialIcons
                name="filter-list"
                size={22}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Filter Panel */}
          {filterVisible && (
            <View
              style={[styles.filterPanel, { borderColor: theme.colors.border }]}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {allCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor:
                          activeCategory === cat
                            ? theme.colors.primary
                            : theme.colors.surface,
                      },
                    ]}
                    onPress={() => setActiveCategory(cat)}
                  >
                    <Text
                      style={{
                        color:
                          activeCategory === cat
                            ? "#fff"
                            : theme.colors.textSecondary,
                      }}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["All", "Today", "This Week"].map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor:
                          activeDate === d
                            ? theme.colors.primary
                            : theme.colors.surface,
                      },
                    ]}
                    onPress={() => setActiveDate(d)}
                  >
                    <Text
                      style={{
                        color:
                          activeDate === d
                            ? "#fff"
                            : theme.colors.textSecondary,
                      }}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Summary */}
          <View
            style={[
              styles.summaryBar,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: isDark ? "#000" : "#ccc",
              },
            ]}
          >
            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Total Income
              </Text>
              <Text
                style={[styles.summaryValue, { color: theme.colors.secondary }]}
              >
                {summary.income}
              </Text>
            </View>
            <View style={styles.summarySeparator(theme)} />
            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Total Expense
              </Text>
              <Text
                style={[styles.summaryValue, { color: theme.colors.error }]}
              >
                {summary.expense}
              </Text>
            </View>
          </View>

          {/* Transaction List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {filteredTransactions.length === 0 ? (
              <Text
                style={[
                  styles.emptyState,
                  { color: theme.colors.textSecondary },
                ]}
              >
                No transactions found
              </Text>
            ) : (
              filteredTransactions.map((t) => {
                const isIncome = t.type === "Income";
                const color = isIncome ? theme.colors.secondary : theme.colors.error;
              
                return (
                  <View
                    key={t.id}
                    style={[styles.transactionCard, { backgroundColor: theme.colors.surface }]}
                  >
                    <View style={styles.transactionLeft}>
                      <View style={[styles.iconCircle, { backgroundColor: `${color}20` }]}>
                        <MaterialIcons
                          name={isIncome ? "trending-up" : "trending-down"}
                          size={22}
                          color={color}
                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={[styles.transactionName, { color: theme.colors.text }]}>
                          {t.name}
                        </Text>
                        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.transactionCategory, { color: theme.colors.textSecondary }]}>
                          {t.category} • {t.time}
                        </Text>
                      </View>
                    </View>
              
                    <View style={styles.transactionRight}>
                      <Text style={[styles.transactionAmount, { color }]}>
                        ₹{t.amount}
                      </Text>
                  
                     <View style={{flex:1,flexDirection:"row"}}>
                       {/* Edit Button */}
                       <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
                        onPress={() => {
                          // Open modal for editing
                          setCurrentType(t.type);
                          setNewTransaction({ ...t });
                          console.log({...t},"111")
                          setIsModalVisible(true);
                        }}
                      >
                        <MaterialIcons name="edit" size={20} color={theme.colors.primary} />
                      </TouchableOpacity>
              
                      {/* Delete Button */}
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
                        onPress={() => {
                          Alert.alert(
                            "Delete Transaction",
                            "Are you sure you want to delete this transaction?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => deleteTransaction(t.id),
                              },
                            ],
                            { cancelable: true }
                          );
                        }}
                      >
                        <MaterialIcons name="delete" size={20} color={theme.colors.error} />
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
              
            )}
          </ScrollView>
        </View>
      </ScreenLayout>

      {/* Floating Add Button */}
      <FAB
        icon="plus"
        color="#fff"
        style={[
          styles.fab,
          { backgroundColor: theme.colors.primary, zIndex: 50 },
        ]}
        onPress={() => setIsModalVisible(true)}
      />

      {/* <TransactionModal /> */}
      <TransactionModal transactionToUpdate={newTransaction} setNewTransaction={setNewTransaction}
      handleAddTransaction={handleAddTransaction}
      isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
      theme={theme}
      />
    </>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
    minHeight: height,
  },

  // ===== HEADER =====
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // ===== SEARCH BAR =====
  searchWrapper: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
    shadowColor: theme.colors.shadow || "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  }),
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 8,
  },

  // ===== FILTER =====
  filterPanel: {
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 6,

    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(180,180,180,0.3)",
  },

  // ===== SUMMARY BAR =====
  summaryBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "500",
    opacity: 0.8,
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 3,
  },
  summarySeparator: (theme) => ({
    height: "100%",
    width: 1,
    backgroundColor: "rgba(156, 163, 175, 0.4)",
    marginHorizontal: 12,
  }),

  // ===== TRANSACTION LIST =====
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionName: {
    fontSize: 15,
    fontWeight: "600",
    width:100
  },
  transactionCategory: {
    fontSize: 13,
    marginTop: 2,
    width:150
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "700",
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
  },

  // ===== MODAL =====
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContainer: {
    width: "95%",
    borderRadius: 16,
    maxHeight: height * 0.8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
    overflow: "auto",
    paddingBottom: 100,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 0.4)",
  },
  modalContent: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    flexGrow: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(156, 163, 175, 0.4)",
    paddingBottom: 8,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  // ===== INPUTS =====
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  inputWrapper: (theme) => ({
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.surface,
  }),
  modalInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 15,
    marginLeft: 8,
  },

  // ===== TYPE TOGGLE =====
  typeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  typeToggle: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(180,180,180,0.3)",
    alignItems: "center",
    marginHorizontal: 4,
  },
  typeToggleActive: (theme, type) => ({
    backgroundColor:
      type === "Income" ? theme.colors.secondary : theme.colors.error,
    borderColor:
      type === "Income" ? theme.colors.secondary : theme.colors.error,
  }),
  typeToggleText: (isActive) => ({
    fontSize: 15,
    fontWeight: isActive ? "700" : "500",
    color: isActive ? "#000" : "#666",
  }),
  transactionRight: {
    // flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    height:35,
    borderWidth:1,
    borderColor:"rgba(156, 163, 175, 0.4)"
  },

  // ===== BUTTON =====
  addButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // ===== FAB =====
  fab: {
    position: "absolute",
    bottom: 60,
    right: 20,
    borderRadius: 30,
    elevation: 5,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
