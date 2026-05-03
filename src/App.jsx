import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  fetchExpenses,
  addExpenseAPI,
  deleteExpenseAPI,
  CATEGORIES,
} from "./mockApi";
import { logoutUser, getCurrentUser } from "./authService";
import Auth from "./components/Auth";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStats from "./components/ExpenseStats";

function App() {
  const [user, setUser] = useState(getCurrentUser());
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const formRef = useRef(null);

  // Fetch expenses from mock API on component mount and when user logs in
  useEffect(() => {
    if (!user) return; // Don't fetch if user is not logged in

    const loadExpenses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchExpenses();
        if (response.success) {
          setExpenses(response.data);
        }
      } catch (err) {
        setError("Failed to load expenses. Please try again.");
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, [user]);

  // useCallback to memoize the add expense function
  const handleAddExpense = useCallback(async (formData) => {
    try {
      setError("");
      const response = await addExpenseAPI(formData);
      if (response.success) {
        setExpenses((prevExpenses) => [response.data, ...prevExpenses]);
        // Clear form by calling reset method if available
        if (formRef.current?.resetForm) {
          formRef.current.resetForm();
        }
      }
    } catch (err) {
      setError(err.message || "Failed to add expense");
      console.error("Error adding expense:", err);
    }
  }, []);

  // useCallback to memoize the delete expense function
  const handleDeleteExpense = useCallback(async (id) => {
    try {
      setError("");
      const response = await deleteExpenseAPI(id);
      if (response.success) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id),
        );
      }
    } catch (err) {
      setError("Failed to delete expense");
      console.error("Error deleting expense:", err);
    }
  }, []);

  // useMemo to compute filtered expenses
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") {
      return expenses;
    }
    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  // useMemo to compute expense statistics
  const stats = useMemo(() => {
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const average =
      filteredExpenses.length > 0 ? total / filteredExpenses.length : 0;
    const highest =
      filteredExpenses.length > 0
        ? Math.max(...filteredExpenses.map((e) => e.amount))
        : 0;

    const byCategory = {};
    filteredExpenses.forEach((expense) => {
      byCategory[expense.category] =
        (byCategory[expense.category] || 0) + expense.amount;
    });

    return {
      total: total.toFixed(2),
      average: average.toFixed(2),
      highest: highest.toFixed(2),
      count: filteredExpenses.length,
      byCategory,
    };
  }, [filteredExpenses]);

  // useMemo to compute category options for filtering
  const categoryOptions = useMemo(() => {
    return ["All", ...CATEGORIES];
  }, []);

  // useCallback for login
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setExpenses([]);
    setError("");
    setLoading(true);
  }, []);

  // useCallback for logout
  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
      setUser(null);
      setExpenses([]);
      setSelectedCategory("All");
      setError("");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, []);

  // If not logged in, show Auth component
  if (!user) {
    return <Auth onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <div>
            <h1>ExpenseFlow</h1>
            <p>Track and manage your expenses efficiently</p>
          </div>
          <div className="header-user">
            <span className="user-name">👤 {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="content">
        {/* Form Section */}
        <div className="form-section">
          <ExpenseForm ref={formRef} onAddExpense={handleAddExpense} />
        </div>

        {/* Expenses Section */}
        <div className="expenses-section">
          <h2>Your Expenses</h2>

          {error && <div className="error">{error}</div>}

          {/* Statistics */}
          <ExpenseStats stats={stats} selectedCategory={selectedCategory} />

          {/* Category Filter */}
          <div className="category-filter">
            {categoryOptions.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Expenses List */}
          {loading ? (
            <div className="loading">
              <div className="loader-spinner"></div>
              <p>Loading your expenses...</p>
            </div>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={handleDeleteExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
