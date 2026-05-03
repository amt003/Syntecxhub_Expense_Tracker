import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { CATEGORIES } from "../mockApi";

const ExpenseForm = forwardRef(({ onAddExpense }, ref) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useRef for form field focus management
  const descriptionInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const categorySelectRef = useRef(null);

  // Expose resetForm method to parent component
  useImperativeHandle(
    ref,
    () => ({
      resetForm: () => {
        setFormData({
          description: "",
          amount: "",
          category: "Food",
          date: new Date().toISOString().split("T")[0],
        });
        // Focus on description field after reset
        if (descriptionInputRef.current) {
          descriptionInputRef.current.focus();
        }
      },
      focusAmount: () => {
        if (amountInputRef.current) {
          amountInputRef.current.focus();
        }
      },
      focusCategory: () => {
        if (categorySelectRef.current) {
          categorySelectRef.current.focus();
        }
      },
    }),
    [],
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.amount) {
      // Focus on first empty field
      if (!formData.description.trim()) {
        descriptionInputRef.current?.focus();
      } else {
        amountInputRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddExpense({
        ...formData,
        amount: parseFloat(formData.amount),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      description: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
    descriptionInputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionInputRef}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Grocery shopping, Gas, etc."
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            ref={amountInputRef}
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            ref={categorySelectRef}
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isSubmitting}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-add" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "➕ Add Expense"}
          </button>
          <button
            type="button"
            className="btn-clear"
            onClick={handleClearForm}
            disabled={isSubmitting}
          >
            Clear
          </button>
        </div>
      </form>
    </>
  );
});

ExpenseForm.displayName = "ExpenseForm";

export default ExpenseForm;
