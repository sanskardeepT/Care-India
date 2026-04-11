import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, useAuth } from './src/context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CareDirectory from './pages/CareDirectory';
import AIPharmacy from './pages/AIPharmacy';
import HealthVault from './pages/HealthVault';
import MyHealth from './pages/MyHealth';
import InsurancePolicy from './pages/InsurancePolicy';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const ProtectedRoutes = () => {
  const { user, isLoading, logout } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />
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
              <Route path="/profile" element={<MyHealth user={user} onLogout={logout} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <footer className="mt-12 text-center text-xs text-gray-400 py-6 border-t border-gray-100 space-y-1">
              <p>Developer: Sanskardeep Talikote</p>
              <p>Contact: 9403910943 | sanskardeepbtalikote19@gmail.com</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  ) : null;
};

const AppContent = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? (
    <HashRouter>
      <ProtectedRoutes />
    </HashRouter>
  ) : (
    <Login />
  );
};

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
};

export default App;
