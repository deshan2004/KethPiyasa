'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRoleQuery = (searchParams.get('role') as UserRole) || 'farmer';

  const { login, user } = useAuth();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [passwordOrNic, setPasswordOrNic] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [adminDetected, setAdminDetected] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inputLower = emailOrPhone.toLowerCase().trim();
    const passLower = passwordOrNic.toLowerCase().trim();

    // Smart Admin Check: If credentials match admin email/ID or admin password
    const isAdminAccount = 
      inputLower.includes('admin') || 
      passLower === 'admin123' || 
      passLower === 'admin' || 
      passLower === 'gov-sl-89201';

    if (isAdminAccount) {
      setAdminDetected(true);
      login(emailOrPhone || 'admin@kethpiyasa.lk', 'admin');
      setTimeout(() => {
        router.push('/admin');
      }, 400);
      return;
    }

    // Determine role based on input or query or existing session
    let targetRole: UserRole = defaultRoleQuery;
    if (inputLower.includes('farmer')) targetRole = 'farmer';
    else if (inputLower.includes('logistics') || inputLower.includes('truck')) targetRole = 'logistics';
    else if (inputLower.includes('buyer') || inputLower.includes('keells')) targetRole = 'buyer';
    else if (user?.role) targetRole = user.role;

    login(emailOrPhone, targetRole);
    const targetRoute = targetRole === 'farmer' ? '/farmer' : targetRole === 'buyer' ? '/buyer' : targetRole === 'logistics' ? '/logistics' : '/admin';
    router.push(targetRoute);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa B2B Secure Login</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Account Sign In</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Enter your registered account credentials below. System will automatically route to your assigned portal interface.
        </p>
      </div>

      <form onSubmit={handleLoginSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs">
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {adminDetected && (
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-amber-900 font-bold flex items-center gap-2 animate-pulse">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="block text-xs font-extrabold">Secure Authentication: Admin Recognized</span>
              <span className="text-[10px] font-medium text-amber-800">Redirecting to Governance Control Console...</span>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <div className="space-y-3.5 pt-1">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              Email Address or Mobile Phone
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="buyer@kethpiyasa.lk or +94 77 123 4567"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Password or NIC / BRN Key</label>
            <input
              type="password"
              value={passwordOrNic}
              onChange={(e) => setPasswordOrNic(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-3 cursor-pointer active:scale-98"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-xs">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-[#064e3b] font-bold underline">
            Register new Farmer / Buyer account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-slate-500">Loading Login...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
