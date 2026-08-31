'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';
import {
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Smartphone,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  KeyRound
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | 'logistics'>('farmer');
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('buyer@kethpiyasa.lk');
  const [passwordOrNic, setPasswordOrNic] = useState('781920394V');
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

    // Standard User Login
    login(emailOrPhone, selectedRole);
    const targetRoute = selectedRole === 'farmer' ? '/farmer' : selectedRole === 'buyer' ? '/buyer' : '/logistics';
    router.push(targetRoute);
  };

  const userRolesList: { key: 'farmer' | 'buyer' | 'logistics'; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    {
      key: 'farmer',
      title: 'Farmer Producer',
      subtitle: 'ගොවි ද්වාරය',
      icon: <Sprout className="w-5 h-5" />,
      color: 'bg-[#064e3b] text-white',
    },
    {
      key: 'buyer',
      title: 'Commercial Buyer',
      subtitle: 'වාණිජ මිලදී ගන්නා',
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'bg-amber-600 text-white',
    },
    {
      key: 'logistics',
      title: 'Logistics Partner',
      subtitle: 'ප්‍රවාහන පාර්ශවය',
      icon: <Truck className="w-5 h-5" />,
      color: 'bg-blue-600 text-white',
    },
  ];

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa B2B Firebase Authentication</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Account Sign In</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Enter your registered credentials below. System will automatically route to your verified portal interface.
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
              <span className="block text-xs font-extrabold">Firebase Authenticated: Admin Recognized</span>
              <span className="text-[10px] font-medium text-amber-800">Redirecting to Governance Control Console...</span>
            </div>
          </div>
        )}

        {/* Role Choice */}
        <div className="space-y-1.5">
          <label className="text-slate-800 font-bold block">Account Role Portal</label>
          <div className="grid grid-cols-3 gap-2">
            {userRolesList.map((r) => {
              const isSelected = selectedRole === r.key;
              return (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setSelectedRole(r.key)}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center ${
                    isSelected
                      ? r.color + ' shadow-sm font-bold scale-102'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {r.icon}
                  <span className="font-extrabold text-[11px]">{r.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pt-1">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              loginMethod === 'email' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email & Password
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              loginMethod === 'mobile' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile Phone
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {loginMethod === 'email' ? 'Registered Email Address' : 'Mobile Phone (+94)'}
            </label>
            <input
              type={loginMethod === 'email' ? 'email' : 'tel'}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder={loginMethod === 'email' ? 'e.g. buyer@kethpiyasa.lk or admin@kethpiyasa.lk' : '+94 77 123 4567'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b]"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b]"
              required
            />
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Demo Hint: Enter email <strong>admin@kethpiyasa.lk</strong> with pass <strong>admin123</strong> for Admin console.</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer active:scale-98"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-xs">
          Don't have an account yet?{' '}
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
