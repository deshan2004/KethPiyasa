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
  KeyRound,
  UserCheck
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | 'logistics'>('farmer');
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+94 77 123 4567');
  const [nicOrBrn, setNicOrBrn] = useState('781920394V');
  const [adminNic, setAdminNic] = useState('GOV-SL-89201');
  const [adminPass, setAdminPass] = useState('admin123');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUserLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phoneOrEmail, selectedRole);

    const targetRoute = selectedRole === 'farmer' ? '/farmer' : selectedRole === 'buyer' ? '/buyer' : '/logistics';
    router.push(targetRoute);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminNic !== 'GOV-SL-89201' && adminNic !== 'admin@kethpiyasa.lk') {
      setErrorMsg('Invalid Database Admin Credentials. Access restricted to verified system governance personnel.');
      return;
    }
    setErrorMsg('');
    login('+94 66 222 3344', 'admin');
    router.push('/admin');
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
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa Role-Based Portal Auth</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Sign In to Your Account</h1>
        <p className="text-xs text-slate-500">
          Access your verified B2B trading interface with NIC / BR credentials.
        </p>
      </div>

      {/* Main Tab Switcher: Normal User vs Database Admin */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/70 rounded-xl text-xs font-extrabold gap-1">
        <button
          onClick={() => { setActiveTab('user'); setErrorMsg(''); }}
          className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'user'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#064e3b]" />
          <span>Standard Account Sign In</span>
        </button>

        <button
          onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
          className={`py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'admin'
              ? 'bg-[#042e23] text-amber-300 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Database Admin Login</span>
        </button>
      </div>

      {activeTab === 'user' ? (
        <form onSubmit={handleUserLoginSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role Choice */}
          <div className="space-y-1.5">
            <label className="text-slate-800 font-bold block">Select Your Registered Account Role</label>
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
              onClick={() => setLoginMethod('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                loginMethod === 'mobile' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile OTP
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

          <div className="space-y-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                {loginMethod === 'mobile' ? 'Mobile Phone (+94)' : 'Email Address'}
              </label>
              <input
                type={loginMethod === 'mobile' ? 'tel' : 'email'}
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder="+94 77 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b]"
                required
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">National Identity Card (NIC) / BRN</label>
              <input
                type="text"
                value={nicOrBrn}
                onChange={(e) => setNicOrBrn(e.target.value)}
                placeholder="781920394V"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
          >
            <span>Log In & Open {selectedRole.toUpperCase()} Interface</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-slate-500 text-xs">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-[#064e3b] font-bold underline">
              Sign up as Farmer / Buyer / Logistics
            </Link>
          </div>
        </form>
      ) : (
        /* Database Admin Login Form */
        <form onSubmit={handleAdminLoginSubmit} className="bg-slate-900 text-white border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl text-xs">
          <div className="flex items-center gap-3 p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-300">
            <ShieldCheck className="w-5 h-5 shrink-0 text-amber-400" />
            <div>
              <span className="font-bold block">Pre-Seeded System Admin Portal</span>
              <span className="text-[11px] opacity-80">Restricted access for Dambulla Agri Governance & Central Moderators</span>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-rose-500/20 border border-rose-400/40 p-3 rounded-xl text-rose-300 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-3 pt-1">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Admin Government NIC / Access ID</label>
              <input
                type="text"
                value={adminNic}
                onChange={(e) => setAdminNic(e.target.value)}
                placeholder="GOV-SL-89201"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Database Governance Secret Key</label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-3 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate Database Admin Console</span>
          </button>
        </form>
      )}
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
