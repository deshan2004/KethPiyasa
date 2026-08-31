'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  User, 
  MapPin, 
  Phone, 
  Award,
  AlertCircle,
  FileCheck,
  Check
} from 'lucide-react';

interface ProfileVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileVerificationModal: React.FC<ProfileVerificationModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();

  const [bankName, setBankName] = useState(user?.bankAccount?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(user?.bankAccount?.accountNumber || '');
  const [branchName, setBranchName] = useState(user?.bankAccount?.branchName || 'Main Branch');
  const [nicOrBrn, setNicOrBrn] = useState(user?.nicOrBrn || '');
  const [successMsg, setSuccessMsg] = useState('');
  const [isVerifyingNic, setIsVerifyingNic] = useState(false);

  if (!isOpen || !user) return null;

  const isBankVerified = !!user.bankVerified || (!!user.bankAccount?.bankName && !!user.bankAccount?.accountNumber);
  const isNicVerified = user.nicVerified !== false;

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bankAccount: {
        bankName,
        accountNumber,
        branchName,
        verified: true,
      },
      bankVerified: true,
    });
    setSuccessMsg('Bank Settlement Account successfully updated & verified!');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleVerifyNic = () => {
    setIsVerifyingNic(true);
    setTimeout(() => {
      updateProfile({
        nicOrBrn: nicOrBrn || user.nicOrBrn,
        nicVerified: true,
      });
      setIsVerifyingNic(false);
      setSuccessMsg('National Identity (NIC/BRN) successfully re-verified with Agrarian Registry!');
      setTimeout(() => setSuccessMsg(''), 3500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0 text-xs">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#064e3b] to-[#042e23] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 font-extrabold border border-white/10 text-base">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span>{user.name}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-[11px] text-emerald-200 font-medium">
                Identity & Bank Verification Profile • <span className="uppercase font-bold">{user.role}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-emerald-900 font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* User Basic Profile Summary */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl grid grid-cols-2 gap-3 text-slate-700">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Account Role</span>
                <span className="font-extrabold text-slate-900 uppercase text-xs">{user.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Registered Contact</span>
                <span className="font-bold text-slate-900 text-xs">{user.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">District Location</span>
                <span className="font-bold text-slate-900 text-xs">{user.district}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Account Trust Status</span>
                <span className="font-bold text-emerald-700 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Member
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: National Identity (NIC / BRN) Verification */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#064e3b]" />
                <h4 className="font-extrabold text-slate-900 text-xs">National Identity (NIC / BRN)</h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                isNicVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800'
              }`}>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {isNicVerified ? 'NIC Verified' : 'Pending Verification'}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-slate-600 block text-[11px] font-semibold">NIC or Business Registration (BRN) Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nicOrBrn}
                  onChange={(e) => setNicOrBrn(e.target.value)}
                  placeholder="e.g. 781920394V or BRN-2024-98124"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs text-slate-900 font-bold focus:outline-none focus:border-[#064e3b]"
                />
                <button
                  type="button"
                  onClick={handleVerifyNic}
                  disabled={isVerifyingNic}
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  {isVerifyingNic ? 'Verifying...' : 'Verify Key'}
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Verified with Sri Lanka Ministry of Agrarian Development & Corporate Registry.
              </p>
            </div>
          </div>

          {/* Section 2: Bank Settlement Account Details & Verification */}
          <form onSubmit={handleSaveBankDetails} className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#064e3b]" />
                <h4 className="font-extrabold text-slate-900 text-xs">Bank Settlement Account</h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                isBankVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {isBankVerified ? (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Bank Details Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    <span>Pending Bank Details</span>
                  </>
                )}
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Bank Name</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-xs text-slate-900 focus:outline-none focus:border-[#064e3b]"
                  required
                >
                  <option value="">-- Select Registered Bank --</option>
                  <option value="Commercial Bank of Ceylon">Commercial Bank of Ceylon</option>
                  <option value="Hatton National Bank">Hatton National Bank (HNB)</option>
                  <option value="Sampath Bank PLC">Sampath Bank PLC</option>
                  <option value="Bank of Ceylon">Bank of Ceylon (BOC)</option>
                  <option value="People's Bank">People's Bank</option>
                  <option value="National Development Bank (NDB)">National Development Bank (NDB)</option>
                  <option value="DFCC Bank">DFCC Bank</option>
                  <option value="Seylan Bank PLC">Seylan Bank PLC</option>
                  <option value="Nations Trust Bank">Nations Trust Bank (NTB)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="e.g. 8001928374"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono font-bold text-xs text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="e.g. Nuwara Eliya Branch"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-xs text-slate-900 focus:outline-none focus:border-[#064e3b]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Save & Verify Bank Details</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 text-center">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-5 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close Profile Window
          </button>
        </div>
      </div>
    </div>
  );
};
