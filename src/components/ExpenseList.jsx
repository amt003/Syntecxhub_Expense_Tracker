import React, { useCallback, memo } from "react";

// Memoize the ExpenseItem component to prevent unnecessary re-renders
const ExpenseItem = memo(({ expense, onDelete }) => {
  return (
    <div className="expense-item">
      <div className="expense-info">
        <div className="expense-category">{expense.category}</div>
        <div className="expense-description">{expense.description}</div>
        <div className="expense-date">
          {new Date(expense.date).toLocaleDateString()}
        </div>
      </div>
      <div className="expense-amount">
        ₹{parseFloat(expense.amount).toFixed(2)}
      </div>
      <button
        className="btn-delete"
        onClick={() => onDelete(expense.id)}
        title="Delete expense"
      >
        🗑️
      </button>
    </div>
  );
});

ExpenseItem.displayName = "ExpenseItem";

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  // useCallback to memoize the delete handler
  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this expense?")) {
        onDeleteExpense(id);
      }
    },
    [onDeleteExpense],
  );

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <p>No expenses found. Start by adding your first expense!</p>
      </div>
    );
  }

  return (
    <div className="expenses-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
