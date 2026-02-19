
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CareDirectory from './pages/CareDirectory';
import AIPharmacy from './pages/AIPharmacy';
import HealthVault from './pages/HealthVault';
import MyHealth from './pages/MyHealth';
import InsurancePolicy from './pages/InsurancePolicy';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('care_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('care_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('care_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen bg-[#f9fafb]">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-5xl mx-auto pb-20">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/directory" element={<CareDirectory />} />
                <Route path="/pharmacy" element={<AIPharmacy />} />
                <Route path="/vault" element={<HealthVault user={user} />} />
                <Route path="/insurance" element={<InsurancePolicy />} />
                <Route path="/profile" element={<MyHealth user={user} onLogout={handleLogout} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              
              <footer className="mt-12 text-center text-xs text-gray-400 py-6 border-t border-gray-100">
                Developed by Sanskardeep, Rugved, Parth
              </footer>
            </div>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
