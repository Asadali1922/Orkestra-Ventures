import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      setLocation('/admin/dashboard');
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[oklch(0.98_0.005_240)] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[oklch(0.95_0.02_240)] rounded-full mb-4">
              <Lock className="w-8 h-8 text-[oklch(0.35_0.08_240)]" />
            </div>
            <h2 className="text-3xl font-bold text-[oklch(0.25_0.02_240)]">Admin Login</h2>
            <p className="mt-2 text-[oklch(0.45_0.02_240)]">
              Access the Orkestra Ventures control panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[oklch(0.35_0.02_240)] mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-[oklch(0.85_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)] focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[oklch(0.35_0.02_240)] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[oklch(0.85_0.02_240)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.15_240)] focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg font-semibold"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-[oklch(0.55_0.15_240)] hover:text-[oklch(0.45_0.15_240)]">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
