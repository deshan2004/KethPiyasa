'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';
import { Sprout, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [nicOrBrn, setNicOrBrn] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nuwara Eliya');
  const [bankName, setBankName] = useState('Commercial Bank of Ceylon');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchName, setBranchName] = useState('Main Branch');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: name || 'New Sri Lankan Producer',
      role,
      nicOrBrn: nicOrBrn || '912039485V',
      phone: phone || '+94 77 000 1122',
      district,
      bankAccount: {
        bankName,
        accountNumber: accountNumber || '8001928374',
        branchName,
      },
    });

    const targetRoute =
      role === 'farmer' ? '/farmer' : role === 'buyer' ? '/buyer' : role === 'logistics' ? '/logistics' : '/admin';
    router.push(targetRoute);
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa B2B Stakeholder Registration</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Create Verified B2B Account</h1>
        <p className="text-xs text-slate-500">
          Register with National Identity Card (NIC) or Enterprise BRN for direct trading.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs">
        <div className="space-y-1">
          <label className="text-slate-700 font-semibold block">Primary Trading Role</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['farmer', 'buyer', 'logistics', 'admin'] as UserRole[]).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`py-2 rounded-xl font-bold capitalize transition-all border ${
                  role === r
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">Full Name / Enterprise Registered Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bandara Farms / Keells Agri Ltd"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">NIC or Business Reg (BRN)</label>
              <input
                type="text"
                value={nicOrBrn}
                onChange={(e) => setNicOrBrn(e.target.value)}
                placeholder="781920394V"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Farm / Enterprise District Location</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
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
            <span className="font-bold text-slate-800 block">Bank Settlement Account Details</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="8001928374"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm pt-3"
        >
          <span>Complete Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-[11px]">
          Already registered?{' '}
          <Link href="/login" className="text-[#064e3b] font-bold underline">
            Log in to existing account
          </Link>
        </div>
      </form>
    </div>
  );
}
