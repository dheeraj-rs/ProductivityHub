import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const existingUser = localStorage.getItem(`user_${email}`);
      if (!existingUser) {
        throw new Error('User not found. Please sign up first.');
      }

      const userData = JSON.parse(existingUser);
      if (userData.password !== password) {
        throw new Error('Invalid password');
      }

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        joinDate: userData.joinDate,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const existingUser = localStorage.getItem(`user_${email}`);
      if (existingUser) {
        throw new Error('User already exists. Please login instead.');
      }

      const userId = `user_${Date.now()}`;
      const avatarId = Math.floor(Math.random() * 1000);

      const userData = {
        id: userId,
        name,
        email,
        password,
        avatar: `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&random=${avatarId}`,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };

      localStorage.setItem(`user_${email}`, JSON.stringify(userData));

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        joinDate: userData.joinDate,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    const storedUserData = localStorage.getItem(`user_${user.email}`);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      localStorage.setItem(`user_${user.email}`, JSON.stringify({ ...userData, ...updates }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        isLoading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
