import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';

type Mode = 'login' | 'register';

const Login: React.FC = () => {
  const { login, register, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGuestLogin = async () => {
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await loginAsGuest();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim() || (mode === 'register' && !name.trim())) {
      setError(mode === 'register' ? 'Name, email and password are required' : 'Email and password are required');
      return;
    }

    try {
      setLoading(true);

      if (mode === 'login') {
        await login(email.trim(), password.trim());
      } else {
        const message = await register({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        });
        setMode('login');
        setName('');
        setPassword('');
        setSuccess(message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
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

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8 text-sm">Your personalized health desk is just a login away.</p>

        <div className="bg-gray-50 rounded-2xl p-1 mb-6 flex">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' ? (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Sanskardeep Talikote"
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : null}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="sanskardeep@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="CareIndia@123"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066FF] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-[11px] text-gray-400">
              Recommended: 8+ characters with letters, numbers, and one special character.
            </p>
          </div>

          {error ? (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              {success}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066FF] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Or</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        <button
          onClick={() => void handleGuestLogin()}
          disabled={loading}
          className="w-full mt-8 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all border border-gray-100 disabled:opacity-60"
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
