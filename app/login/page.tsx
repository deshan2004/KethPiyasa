'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  AlertCircle
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+94 77 123 4567');
  const [otpOrPass, setOtpOrPass] = useState('892019');
  const [nicOrBrn, setNicOrBrn] = useState('781920394V');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = () => {
    if (!phoneOrEmail) {
      setErrorMsg('Please enter a valid Sri Lankan mobile number or email.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phoneOrEmail, selectedRole);

    const targetRoute =
      selectedRole === 'farmer'
        ? '/farmer'
        : selectedRole === 'buyer'
        ? '/buyer'
        : selectedRole === 'logistics'
        ? '/logistics'
        : '/admin';

    router.push(targetRoute);
  };

  const roleDetails: Record<UserRole, { title: string; desc: string; icon: React.ReactNode; color: string }> = {
    farmer: {
      title: 'Farmer Producer (ගොවි ද්වාරය)',
      desc: 'Post crops, receive direct buyer quotations, counter-offer, and track bank payouts.',
      icon: <Sprout className="w-5 h-5 text-white" />,
      color: 'bg-[#064e3b] text-white',
    },
    buyer: {
      title: 'Commercial Buyer (වාණිජ මිලදී ගන්නා)',
      desc: 'Search bulk crops, verify quality grades, request quotes, and secure escrow deposits.',
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      color: 'bg-amber-600 text-white',
    },
    logistics: {
      title: 'Logistics Hauler (ප්‍රවාහන පාර්ශවකරු)',
      desc: 'View available freight jobs, update route checkpoints, and verify QR deliveries.',
      icon: <Truck className="w-5 h-5 text-white" />,
      color: 'bg-blue-600 text-white',
    },
    admin: {
      title: 'System Admin (පරිපාලක ද්වාරය)',
      desc: 'Verify identity records, monitor escrow ledgers, moderate disputes, and set market prices.',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: 'bg-indigo-600 text-white',
    },
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <Sprout className="w-4 h-4" />
          <span>kethpiyasa (KethPiyasa) Role-Based Auth</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Select Role & Log In</h1>
        <p className="text-xs text-slate-500">
          Access your personalized B2B portal interface with verified NIC / BR identity.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        {(Object.keys(roleDetails) as UserRole[]).map((rKey) => {
          const isSelected = selectedRole === rKey;
          return (
            <button
              key={rKey}
              onClick={() => setSelectedRole(rKey)}
              className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center ${
                isSelected
                  ? roleDetails[rKey].color + ' shadow-sm scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {roleDetails[rKey].icon}
              <span className="capitalize">{rKey}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Role Summary Banner */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"></span>
          <h3 className="font-bold text-slate-900 text-sm">{roleDetails[selectedRole].title}</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{roleDetails[selectedRole].desc}</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs">
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Method Toggle */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={() => setLoginMethod('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              loginMethod === 'mobile' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile SMS OTP
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              loginMethod === 'email' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Email & Password
          </button>
        </div>

        {/* Input fields */}
        <div className="space-y-3">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {loginMethod === 'mobile' ? 'Mobile Phone Number (+94)' : 'Corporate / Personal Email'}
            </label>
            <div className="flex gap-2">
              <input
                type={loginMethod === 'mobile' ? 'tel' : 'email'}
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder={loginMethod === 'mobile' ? '+94 77 123 4567' : 'user@kethpiyasa.lk'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
              />
              {loginMethod === 'mobile' && !otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3 py-2 rounded-xl"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>

          {loginMethod === 'mobile' && otpSent && (
            <div className="space-y-1">
              <label className="text-slate-700 font-semibold block">Enter 6-Digit SMS Verification OTP</label>
              <input
                type="text"
                value={otpOrPass}
                onChange={(e) => setOtpOrPass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#064e3b]"
                required
              />
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Demo OTP Code autofilled: 892019
              </span>
            </div>
          )}

          <div>
            <label className="text-slate-700 font-semibold block mb-1">National Identity Card (NIC) / Business Reg (BRN)</label>
            <input
              type="text"
              value={nicOrBrn}
              onChange={(e) => setNicOrBrn(e.target.value)}
              placeholder="e.g., 781920394V or BRN-2024-98124"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2"
        >
          <span>Log In as {selectedRole.toUpperCase()}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-[11px]">
          Don't have a verified account?{' '}
          <Link href="/register" className="text-[#064e3b] font-bold underline">
            Register new Farmer / Enterprise account
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
