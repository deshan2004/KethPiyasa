'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';
import { useApp } from '@/lib/store';
import { Sprout, ShoppingBag, Truck, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { lang } = useApp();

  const [name, setName] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer' | 'logistics'>('farmer');
  const [nicOrBrn, setNicOrBrn] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nuwara Eliya');
  const [bankName, setBankName] = useState('Commercial Bank of Ceylon');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchName, setBranchName] = useState('Main Branch');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register({
      name: name || (role === 'farmer' ? 'Nuwara Eliya Organic Producer' : role === 'buyer' ? 'Keells Super Logistics Ltd' : 'Lanka Transporters'),
      role: role as UserRole,
      nicOrBrn: nicOrBrn || '912039485V',
      phone: phone || '+94 77 000 1122',
      district,
      bankAccount: {
        bankName,
        accountNumber: accountNumber || '8001928374',
        branchName,
      },
    });

    // Automatically route to the registered interface
    const targetRoute = role === 'farmer' ? '/farmer' : role === 'buyer' ? '/buyer' : '/logistics';
    router.push(targetRoute);
  };

  const roleOptions: { key: 'farmer' | 'buyer' | 'logistics'; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    {
      key: 'farmer',
      title: 'Farmer Producer',
      subtitle: lang === 'si' ? 'ගොවි ජනතාව' : lang === 'ta' ? 'விவசாயி' : 'Agricultural Producer',
      icon: <Sprout className="w-5 h-5" />,
      color: 'border-emerald-600 bg-emerald-50 text-[#064e3b]',
    },
    {
      key: 'buyer',
      title: 'Commercial Buyer',
      subtitle: lang === 'si' ? 'මිලදී ගන්නා' : lang === 'ta' ? 'கொள்முதல்' : 'Commercial Buyer',
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'border-amber-600 bg-amber-50 text-amber-900',
    },
    {
      key: 'logistics',
      title: 'Logistics Partner',
      subtitle: lang === 'si' ? 'ප්‍රවාහන පාර්ශවය' : lang === 'ta' ? 'போக்குவரத்து' : 'Freight & Fleet',
      icon: <Truck className="w-5 h-5" />,
      color: 'border-blue-600 bg-blue-50 text-blue-900',
    },
  ];

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa Stakeholder Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Create Verified B2B Account</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Select your registered role below. Upon registration, you will be redirected straight to your dedicated portal interface.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-sm text-xs">
        {/* Role Selection Cards (Excludes Admin) */}
        <div className="space-y-2">
          <label className="text-slate-800 font-bold block text-sm">Select Your Account Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {roleOptions.map((r) => {
              const isSelected = role === r.key;
              return (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-all border-2 ${
                    isSelected
                      ? r.color + ' shadow-sm font-bold scale-102'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r.icon}
                  <span className="font-extrabold text-xs">{r.title}</span>
                  <span className="text-[10px] opacity-80">{r.subtitle}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 mt-2">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Note: System Admin accounts are pre-seeded in the database and managed via central governance.</span>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">Full Name / Farm or Enterprise Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'farmer' ? 'e.g. Bandara Organic Farms' : role === 'buyer' ? 'e.g. Keells Agri Procurement' : 'e.g. Lanka Logistics Express'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">NIC or Business Reg (BRN)</label>
              <input
                type="text"
                value={nicOrBrn}
                onChange={(e) => setNicOrBrn(e.target.value)}
                placeholder="e.g. 781920394V or BRN-98124"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
                required
              />
            </div>

            <div>
              <label className="text-slate-700 font-semibold block mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Farm / Enterprise District Location</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
            >
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Dambulla">Dambulla</option>
              <option value="Badulla">Badulla</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Colombo">Colombo</option>
            </select>
          </div>

          {/* Bank Account Details */}
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <span className="font-bold text-slate-800 block text-xs">Bank Settlement Account Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="8001928374"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-xs text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
        >
          <span>Complete Registration & Open {role.toUpperCase()} Interface</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-xs">
          Already registered?{' '}
          <Link href="/login" className="text-[#064e3b] font-bold underline">
            Log in to existing account
          </Link>
        </div>
      </form>
    </div>
  );
}
