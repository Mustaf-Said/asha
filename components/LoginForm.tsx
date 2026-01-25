'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthMode = 'signin' | 'signup';

export default function LoginForm() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload: { email: string; password: string; action: string; name?: string } = {
        email,
        password,
        action: mode,
      };

      if (mode === 'signup') {
        payload.name = name;
      }

      const result = await fetch('/api/auth/[...nextauth]', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      if (!result.ok) {
        setError(data.error || 'An error occurred. Please try again.');
        setIsLoading(false);
        return;
      }

      // Force a full page reload to ensure cookie session is properly loaded
      window.location.href = '/community';
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => {
            setMode('signin');
            setError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition ${mode === 'signin'
            ? 'bg-white text-teal-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('signup');
            setError('');
          }}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition ${mode === 'signup'
            ? 'bg-white text-teal-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={mode === 'signin' ? 'nurse1@example.com' : 'your.email@example.com'}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
            minLength={mode === 'signup' ? 6 : undefined}
          />
          {mode === 'signup' && (
            <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? mode === 'signin'
              ? 'Signing in...'
              : 'Creating account...'
            : mode === 'signin'
              ? 'Sign In'
              : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
