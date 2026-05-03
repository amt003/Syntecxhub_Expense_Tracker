// Mock authentication service

let loggedInUser = null;

// Mock user database
const mockUsers = {};

// Register a new user
export const registerUser = (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers[email]) {
        reject({
          success: false,
          message: "Email already registered",
        });
      } else if (!email || !password || !name) {
        reject({
          success: false,
          message: "Please fill all fields",
        });
      } else if (password.length < 6) {
        reject({
          success: false,
          message: "Password must be at least 6 characters",
        });
      } else {
        mockUsers[email] = { email, password, name };
        loggedInUser = { email, name };
        resolve({
          success: true,
          user: { email, name },
          message: "Account created successfully",
        });
      }
    }, 600);
  });
};

// Login user
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject({
          success: false,
          message: "Please fill all fields",
        });
      } else if (mockUsers[email]) {
        if (mockUsers[email].password === password) {
          loggedInUser = { email, name: mockUsers[email].name };
          resolve({
            success: true,
            user: { email, name: mockUsers[email].name },
            message: "Login successful",
          });
        } else {
          reject({
            success: false,
            message: "Invalid password",
          });
        }
      } else {
        reject({
          success: false,
          message: "Email not found",
        });
      }
    }, 600);
  });
};

// Get current user
export const getCurrentUser = () => {
  return loggedInUser;
};

// Logout user
export const logoutUser = () => {
  loggedInUser = null;
  return Promise.resolve({ success: true, message: "Logged out successfully" });
};

// Demo account for testing
export const createDemoAccounts = () => {
  mockUsers["demo@example.com"] = {
    email: "demo@example.com",
    password: "demo123",
    name: "Demo User",
  };
  mockUsers["test@example.com"] = {
    email: "test@example.com",
    password: "test123",
    name: "Test User",
  };
};

// Initialize demo accounts on load
createDemoAccounts();
