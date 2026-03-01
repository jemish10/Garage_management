import { useState } from 'react';
import { Page } from '../types';
import { Wrench, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onNavigate: (page: Page) => void;
}

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

export default function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        onLogin();
        onNavigate('dashboard');
      } else {
        setError('Invalid credentials. Try admin / admin123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-orange-500 rounded-2xl mb-4 shadow-2xl shadow-orange-500/40">
            <Wrench size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">AutoCare<span className="text-orange-400">Pro</span></h1>
          <p className="text-gray-400 mt-2">Admin Portal – Garage Management System</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800/70 border border-gray-700/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock size={20} className="text-orange-400" />
            Admin Login
          </h2>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-gray-900 border border-gray-600 text-white rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-400/40 text-sm tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-900/60 rounded-xl border border-gray-700/50">
            <p className="text-xs text-gray-500 text-center font-medium mb-2">Demo Credentials</p>
            <div className="flex justify-center gap-6 text-xs">
              <div className="text-center">
                <p className="text-gray-400">Username</p>
                <p className="text-orange-400 font-mono font-bold">admin</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Password</p>
                <p className="text-orange-400 font-mono font-bold">admin123</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          <button onClick={() => onNavigate('home')} className="text-orange-500 hover:text-orange-400">← Back to Home</button>
        </p>
      </div>
    </div>
  );
}
