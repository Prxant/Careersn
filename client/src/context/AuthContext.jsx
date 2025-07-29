import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // This effect runs when the app starts to check if a user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // Set the token in axios headers for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          // You might need to create this backend route to get user data from a token
          // For now, we can decode the token on the client side (less secure but simpler)
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setUser(decoded.user);
        } catch (error) {
          console.error("Failed to load user from token", error);
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login function
  const login = (authData) => {
    localStorage.setItem('token', authData.token);
    setToken(authData.token);
    setUser(authData.user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // The value provided to all children components
  const value = {
    isAuthenticated: !!user,
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Create the useAuth hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
