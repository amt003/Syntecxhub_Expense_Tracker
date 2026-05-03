# ExpenseFlow - Expense Tracker Application

A modern, responsive expense tracking application built with React and advanced hooks for state management and optimization.

## 🎯 Features

- **User Authentication**: Secure login and signup functionality with demo accounts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Expense Management**: Add, view, and delete expenses instantly
- **Category Filtering**: Filter expenses by category
- **Statistical Dashboard**: View total, average, and highest expenses in Indian Rupees (₹)
- **Mock API Integration**: Simulates API calls for realistic async operations
- **Form Focus Management**: Smart focus management for better UX
- **Performance Optimized**: Uses advanced React hooks for optimization

## 🛠️ Tech Stack

- **React 18**: Latest version with hooks
- **Vite**: Lightning-fast build tool
- **CSS3**: Modern styling with gradient and animations
- **JavaScript (ES6+)**: Modern JavaScript features

## 🎣 React Hooks Implementation

### 1. **useState**

- Manages form inputs (description, amount, category, date)
- Tracks loading and error states
- Manages expenses list and selected category
- Tracks form submission state

### 2. **useEffect**

- Fetches initial expenses from mock API on component mount
- Handles async operations with proper error handling
- Cleanup and dependency array management

### 3. **useRef**

- Form field references for focus management
- Direct DOM manipulation without re-renders
- Method exposure through useImperativeHandle

### 4. **useMemo**

- Memoizes filtered expenses list based on selected category
- Caches statistical calculations (total, average, highest)
- Optimizes category options rendering

### 5. **useCallback**

- Memoizes expense addition handler
- Memoizes expense deletion handler
- Memoizes delete confirmation handler
- Prevents unnecessary child component re-renders

## 📁 Project Structure

```
ExpenseFlow/
├── index.html              # Main HTML file with Auth & App styles
├── package.json            # Project dependencies
├── vite.config.js         # Vite configuration
├── .gitignore             # Git ignore rules
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main application component
│   ├── mockApi.js         # Mock API service
│   ├── authService.js     # Authentication service
│   └── components/
│       ├── Auth.jsx          # Login/Signup component
│       ├── ExpenseForm.jsx   # Form component with useRef
│       ├── ExpenseList.jsx    # Expenses list component
│       └── ExpenseStats.jsx   # Statistics component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd ExpenseFlow
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This generates an optimized production build in the `dist/` folder.

## � Authentication

### Demo Accounts

You can test the application using pre-configured demo accounts:

**Account 1:**

- Email: `demo@example.com`
- Password: `demo123`

**Account 2:**

- Email: `test@example.com`
- Password: `test123`

### Create New Account

1. Click "Sign Up" on the login screen
2. Enter your full name, email, and password (minimum 6 characters)
3. Confirm your password
4. Click "Sign Up" to create your account

### Features

- **Login**: Secure authentication with email and password
- **Sign Up**: Create new user accounts
- **Demo Login**: Quick access with demo account
- **Logout**: Securely log out from the application

## 📖 Usage

### Adding an Expense

1. Log in with your credentials
2. Enter the expense description
3. Enter the amount in Indian Rupees (₹)
4. Select a category from the dropdown
5. Choose a date (defaults to today)
6. Click "Add Expense" or press Ctrl+Enter

### Filtering Expenses

- Click on category buttons at the top of the expenses list
- Select "All" to view all expenses or specific categories

### Deleting an Expense

- Click the trash icon (🗑️) on any expense
- Confirm the deletion when prompted

### Form Management

- Use Tab to navigate between fields
- Use Ctrl+Enter to submit the form
- Click "Clear" to reset all fields

## 🎨 Styling

The application features:

- **Gradient backgrounds**: Purple gradient theme
- **Responsive grid layout**: Adapts to screen size
- **Smooth animations**: Hover effects and transitions
- **Accessible design**: Proper contrast and touch targets

## 🔄 Mock API

The mock API simulates real API calls with delays:

- **fetchExpenses()**: Fetches initial expense list (800ms delay)
- **addExpenseAPI()**: Adds a new expense (500ms delay)
- **deleteExpenseAPI()**: Deletes an expense (300ms delay)

All API calls include error handling and validation.

## ⚡ Performance Optimizations

1. **Component Memoization**: ExpenseItem and ExpenseStats use React.memo
2. **Callback Memoization**: Event handlers use useCallback
3. **Computed Values**: Statistics and filtered lists use useMemo
4. **Lazy State Updates**: Uses functional state updates to prevent stale closures

## 🎓 Learning Resources

### React Hooks Documentation

- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [useRef](https://react.dev/reference/react/useRef)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)

## 📝 Example Expense Categories

- Food
- Transportation
- Entertainment
- Utilities
- Healthcare
- Other

## 🐛 Troubleshooting

### Port already in use

If port 3000 is already in use, modify the vite.config.js:

```javascript
server: {
  port: 3001; // Change to your preferred port
}
```

### Dependencies not installing

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Future Enhancements

- Export expenses to CSV/PDF
- Budget setting and alerts
- Monthly reports and visualizations
- Data persistence with LocalStorage
- User authentication
- Multi-currency support
- Recurring expense templates

---

Built with ❤️ using React and Modern JavaScript
