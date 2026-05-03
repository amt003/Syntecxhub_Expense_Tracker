// Mock API service for expense tracking
// Simulates API calls with delays

const mockExpensesData = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: 450.99,
    category: "Food",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 2,
    description: "Petrol",
    amount: 520.5,
    category: "Transportation",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  },
  {
    id: 3,
    description: "Netflix Subscription",
    amount: 159.99,
    category: "Entertainment",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 4,
    description: "Coffee",
    amount: 55.0,
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  },
];

// Simulate fetching expenses from an API
export const fetchExpenses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [...mockExpensesData],
        message: "Expenses loaded successfully",
      });
    }, 800);
  });
};

// Simulate adding a new expense
export const addExpenseAPI = (expense) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!expense.description || !expense.amount || !expense.category) {
        reject({
          success: false,
          message: "Invalid expense data",
        });
      } else {
        const newExpense = {
          id: Date.now(),
          ...expense,
          date: expense.date || new Date().toISOString().split("T")[0],
        };
        resolve({
          success: true,
          data: newExpense,
          message: "Expense added successfully",
        });
      }
    }, 500);
  });
};

// Simulate deleting an expense
export const deleteExpenseAPI = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Expense ${id} deleted successfully`,
      });
    }, 300);
  });
};

export const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Other",
];
