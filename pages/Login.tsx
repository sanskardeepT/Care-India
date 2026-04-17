import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';

const Login: React.FC = () => {
  const { loginAsGuest } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGuestLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginAsGuest();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-blue-50/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight">Care India</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest Access</h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          This app now works without a backend. Continue as guest to use the dashboard, AI tools, and local booking flow.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-900">
          Login, registration, and database-based user storage have been removed for this deployment.
        </div>

        {error ? (
          <div className="mt-4 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => void handleGuestLogin()}
          disabled={loading}
          className="w-full mt-8 bg-[#0066FF] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {loading ? 'Opening Care India...' : 'Continue as Guest'}
        </button>

        <p className="mt-8 text-center text-[11px] text-gray-400 leading-relaxed">
          Your guest session is stored only in this browser and can be cleared by logging out.
        </p>
      </div>
    </div>
  );
};

export default Login;
