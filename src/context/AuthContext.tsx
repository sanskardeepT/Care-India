import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<string>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
}

interface StoredAccount {
  name: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthContext');
  return context;
};

interface Props {
  children: ReactNode;
}

const USER_KEY = 'care_india_user';
const ACCOUNTS_KEY = 'care_india_accounts';

const GUEST_USER: User = {
  id: null,
  name: 'Guest User',
  email: 'guest@care-india.com',
  phone: '+91 90000 00000',
  isGuest: true,
};

const sanitizeEmail = (email: string) => email.trim().toLowerCase();

const getStoredAccounts = (): StoredAccount[] => {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  if (!savedAccounts) return [];

  try {
    const accounts = JSON.parse(savedAccounts);
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    localStorage.removeItem(ACCOUNTS_KEY);
    return [];
  }
};

const saveStoredAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const saveSession = (nextUser: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const login = async (email: string, password: string) => {
    const normalizedEmail = sanitizeEmail(email);
    const account = getStoredAccounts().find((item) => item.email === normalizedEmail);

    if (!account || account.password !== password) {
      throw new Error('Invalid email or password');
    }

    saveSession({
      id: null,
      name: account.name,
      email: account.email,
      isGuest: false,
    });
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    const normalizedEmail = sanitizeEmail(data.email);
    const accounts = getStoredAccounts();

    if (accounts.some((item) => item.email === normalizedEmail)) {
      throw new Error('Email already exists');
    }

    accounts.push({
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password,
    });

    saveStoredAccounts(accounts);

    return 'Account created successfully. Please sign in.';
  };

  const loginAsGuest = async () => {
    saveSession(GUEST_USER);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
