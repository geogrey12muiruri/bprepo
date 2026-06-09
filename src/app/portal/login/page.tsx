'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerLogin() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!/^\d{4}$/.test(code)) {
      setError('Please enter a valid 4-digit partner code');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/partner/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, action: 'signin' })
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.magic_link) {
        window.location.href = data.magic_link;
      } else if (data.requires_registration) {
        window.location.href = `/portal/register?code=${code}`;
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCode(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Partner Portal Login
        </h1>
        <p className="text-white/70 mb-4 text-center">
          Enter your 4-digit partner code
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="1234"
            maxLength={4}
            pattern="\d{4}"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white text-center text-2xl font-mono tracking-widest placeholder:text-white/40"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}