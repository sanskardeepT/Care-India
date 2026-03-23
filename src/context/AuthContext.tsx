import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import * as authAPI from '../services/apiService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string; date_of_birth?: string; gender?: string; blood_group?: string; }) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
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

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('care_india_token');
    if (savedToken) {
      setToken(savedToken);
      authAPI.authAPI.getMe()
        .then((res) => {
          setUser(res.user);
        })
        .catch(() => {
          localStorage.removeItem('care_india_token');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const saveAuth = (newToken: string, newUser: User) => {
    localStorage.setItem('care_india_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const res = await authAPI.authAPI.login({ email, password });
    saveAuth(res.token, res.user);
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string; date_of_birth?: string; gender?: string; blood_group?: string; }) => {
    const res = await authAPI.authAPI.register(data);
    saveAuth(res.token, res.user);
  };

  const loginAsGuest = async () => {
    const res = await authAPI.authAPI.loginAsGuest();
    const guestUser: User = { ...res.user, token: res.token };
    saveAuth(res.token!, guestUser);
  };

  const logout = () => {
    localStorage.removeItem('care_india_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

