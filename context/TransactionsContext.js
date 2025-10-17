import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {

    // simple one format of the transacrion to store
    const initialTransaction = {
        id: "ew21edd1321e123e13ee13",
        name: "Amazon Prime",
        type: "Expense",
        amount: "₹1,200",
        category: "Shopping",
        time: "10:30 AM",
        createdAt: "2025-10-12",
        updatedAt: "2025-10-12",
        isIncome: false,
        isExpense: true,
    }

    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [total, setTotal] = useState(0)
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [filteredTotal, setFilteredTotal] = useState(0)
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sort, setSort] = useState('date')
    const [sortDirection, setSortDirection] = useState('desc')
    const [isInitialDataLoaded,setIsInitialDataLoaded] = useState(false)


    // funcitons for all 

    // 1 function to get the transactions from the database

    const fetchTransactions = async () => {
        // function use the realm sqlite database
        try {
            setError("")
            setIsInitialDataLoaded(false)
            // 5sec await 
            await new Promise(resolve => setTimeout(resolve, 10000));
            setTransactions([]);
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        } finally {
            setIsInitialDataLoaded(true)
        }
    }

    useEffect(()=>{
        fetchTransactions();
    },[])

    // 2.function to add a new transaction to the database

    const addTransaction = async (transaction) => {
        try {
            setError("")
            setLoading(true)
            setTransactions([...transactions, transaction]);
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 3.function to delete a transaction from the database

    const deleteTransaction = async (id) => {
        try {
            setError("")
            setLoading(true)
            setTransactions(transactions.filter(transaction => transaction.id !== id));
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 4. update a transaction in the database

    const updateTransaction = async (transaction) => {
        try {
            setError("")
            setLoading(true)
            setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    // 5 filter
    const filterTransactions = (filter) => {
        setFilter(filter)
        if (filter === 'all') {
            setFilteredTransactions(transactions)
            setFilteredTotal(total)
        } else {
            const filtered = transactions.filter(transaction => transaction.type === filter)
            setFilteredTransactions(filtered)
            setFilteredTotal(filtered.reduce((acc, transaction) => acc + transaction.amount, 0))
        }
    }

    // 6.query search 
    const searchTransactions = (query) => {
        setSearchQuery(query)
        if (query === '') {
            setFilteredTransactions(transactions)
            setFilteredTotal(total)
        } else {
            const filtered = transactions.filter(transaction => transaction.name.toLowerCase().includes(query.toLowerCase()))
            setFilteredTransactions(filtered)
            setFilteredTotal(filtered.reduce((acc, transaction) => acc + transaction.amount, 0))
        }
    }









    return <TransactionContext.Provider
        value={{
            transactions,
            setTransactions,
            loading,
            setLoading,
            error,
            setError,
            total,
            setTotal,
            filteredTransactions,
            setFilteredTransactions,
            filteredTotal,
            setFilteredTotal,
            filter,
            setFilter,
            searchQuery,
            setSearchQuery,
            sort,
            setSort,
            sortDirection,
            setSortDirection,
            fetchTransactions,
            addTransaction,
            deleteTransaction,
            updateTransaction,
            filterTransactions,
            searchTransactions,
            isInitialDataLoaded


        }}
    >{children}</TransactionContext.Provider>
}

export const useTransaction = () => {
    return useContext(TransactionContext)
}