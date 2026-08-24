'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import {
  ShieldCheck,
  UserCheck,
  DollarSign,
  AlertTriangle,
  Building2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Edit,
  Save,
  Layers
} from 'lucide-react';

export default function AdminPage() {
  const { marketPrices, updateMarketPrice, contracts, disputes, resolveDispute, lang } = useApp();
  const t = getTranslation(lang);

  const [activeTab, setActiveTab] = useState<'users' | 'escrow' | 'disputes' | 'prices'>('users');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  // Mock pending verification requests
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 'v1', name: 'Rathnayake Produce Traders', type: 'Commercial Buyer', nicOrBrn: 'BRN-2024-98124', district: 'Dambulla', status: 'pending' },
    { id: 'v2', name: 'Kandy Highland Farmers Co-op', type: 'Farmer Producer', nicOrBrn: '740192837V', district: 'Kandy', status: 'pending' },
    { id: 'v3', name: 'Lanka Freight Express', type: 'Logistics Hauler', nicOrBrn: 'BRN-2022-44120', district: 'Colombo', status: 'pending' },
  ]);

  const handleApproveVerification = (id: string) => {
    setPendingVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v)));
  };

  const handleSavePrice = (id: string) => {
    updateMarketPrice(id, editPriceVal);
    setEditingPriceId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#064e3b]" />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{t.adminTitle}</h1>
          </div>
          <p className="text-xs text-slate-500">{t.adminSubtitle}</p>
        </div>

        <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-900 block">System Governance Admin</span>
          <span className="text-[10px] text-[#064e3b]">Full Audit Access</span>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Total Escrow Volume</span>
          <div className="text-2xl font-black text-[#064e3b]">LKR 145.2M</div>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Secured Holding</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Platform Revenue (1.5% Fee)</span>
          <div className="text-2xl font-black text-amber-600">LKR 2,178,000</div>
          <span className="text-[11px] text-amber-600 font-semibold">Automated Fee Ledger</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Verified Stakeholders</span>
          <div className="text-2xl font-black text-slate-900">5,840</div>
          <span className="text-[11px] text-slate-500">NIC & BR Verified</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Dispute Rate</span>
          <div className="text-2xl font-black text-emerald-600">0.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Low Claim Rate</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" /> {t.verificationsTab}
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'escrow' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" /> {t.escrowLedgerTab}
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'disputes' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> {t.disputesTab} ({disputes.length})
        </button>

        <button
          onClick={() => setActiveTab('prices')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
            activeTab === 'prices' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> {t.marketPricesTab}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs text-xs">
          <h3 className="font-bold text-slate-900 text-sm">NIC & BRN Verification Queue</h3>
          <div className="divide-y divide-slate-100">
            {pendingVerifications.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{item.name}</span>
                  <span className="text-slate-500">{item.type} • {item.district}</span>
                  <span className="font-mono text-[#064e3b] font-bold block text-[11px]">{item.nicOrBrn}</span>
                </div>

                {item.status === 'approved' ? (
                  <span className="bg-emerald-100 text-[#064e3b] px-3 py-1 rounded-full font-bold">
                    Approved
                  </span>
                ) : (
                  <button
                    onClick={() => handleApproveVerification(item.id)}
                    className="bg-[#064e3b] text-white font-bold px-3 py-1.5 rounded-lg"
                  >
                    Approve Registration
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'prices' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs text-xs">
          <h3 className="font-bold text-slate-900 text-sm">National Economic Center Price Moderation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketPrices.map((mp) => (
              <div key={mp.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">{mp.cropName}</span>
                    <span className="text-slate-500">{mp.centerName} Economic Center</span>
                  </div>
                  <span className="font-extrabold text-[#064e3b] text-sm">LKR {mp.avgPriceLkr}/Kg</span>
                </div>

                {editingPriceId === mp.id ? (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="number"
                      value={editPriceVal}
                      onChange={(e) => setEditPriceVal(Number(e.target.value))}
                      className="bg-white border border-slate-300 rounded px-2 py-1 font-bold w-24"
                    />
                    <button
                      onClick={() => handleSavePrice(mp.id)}
                      className="bg-[#064e3b] text-white px-3 py-1 rounded font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingPriceId(mp.id);
                      setEditPriceVal(mp.avgPriceLkr);
                    }}
                    className="text-xs text-[#064e3b] font-bold underline"
                  >
                    Edit Price
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
