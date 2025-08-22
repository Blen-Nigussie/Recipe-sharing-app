import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status once on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get('https://enbla-recipe-sharing-app-16il.onrender.com/api/auth/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error.response?.data || error.message);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://enbla-recipe-sharing-app-16il.onrender.com/api/auth/login', { email, password });
      const { token, user: userDataFromResponse } = response.data;

      if (!token) return { success: false, message: "No token returned" };

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let resolvedUser = userDataFromResponse;

      if (!resolvedUser) {
        const profileRes = await axios.get('https://enbla-recipe-sharing-app-16il.onrender.com/api/auth/profile');
        resolvedUser = profileRes.data;
      }

      setUser(resolvedUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("https://enbla-recipe-sharing-app-16il.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
  
      const { token, user: userDataFromResponse } = response.data;
  
      if (!token) return { success: false, message: "No token returned" };
  
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      setUser(userDataFromResponse);
  
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };
  

  return (
    <UserContext.Provider 
  value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}
>
  {children}
</UserContext.Provider>

  );
};
