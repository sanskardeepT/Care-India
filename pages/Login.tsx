
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGuestLogin = () => {
    onLogin({
      name: 'Sanskardeep',
      phone: '+91-9403910943',
      isGuest: true,
      avatar: 'icon',
    });
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      onLogin({
        name: 'Sanskardeep',
        phone: phoneNumber,
        isGuest: false,
        avatar: 'icon',
      });
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
          <span className="text-3xl font-bold text-gray-800 tracking-tight">Care.</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8 text-sm">Your personalized health desk is just a login away.</p>

        <form onSubmit={handlePhoneLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 00000 00000"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0066FF] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition-all"
          >
            Send OTP
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Or</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full mt-8 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all border border-gray-100"
        >
          Login as Guest
        </button>

        <p className="mt-8 text-center text-[11px] text-gray-400 leading-relaxed">
          By continuing, you agree to our <a href="#" className="text-[#0066FF] font-medium">Terms of Service</a> and <a href="#" className="text-[#0066FF] font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
