import React, { memo } from "react";

const ExpenseStats = memo(({ stats, selectedCategory }) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Total Expenses:</span>
        <span className="stat-value total">₹{stats.total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Average Expense:</span>
        <span className="stat-value">₹{stats.average}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Highest Expense:</span>
        <span className="stat-value">₹{stats.highest}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Count:</span>
        <span className="stat-value">{stats.count}</span>
      </div>
    </div>
  );
});

ExpenseStats.displayName = "ExpenseStats";

export default ExpenseStats;
