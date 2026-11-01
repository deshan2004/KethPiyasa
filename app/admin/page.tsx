'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
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
  Layers,
  LogIn,
  UserPlus,
  Eye,
  FileText,
  X,
  Check
} from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();
  const {
    marketPrices,
    updateMarketPrice,
    contracts,
    depositEscrow,
    releaseEscrow,
    refundEscrow,
    disputes,
    resolveDispute,
    lang
  } = useApp();
  const t = getTranslation(lang);

  const [activeTab, setActiveTab] = useState<'users' | 'escrow' | 'disputes' | 'prices'>('users');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  // Dispute Resolution State
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [refundPercentage, setRefundPercentage] = useState<number>(15);

  // Verification document preview state
  const [previewDoc, setPreviewDoc] = useState<{
    id: string;
    name: string;
    type: string;
    nicOrBrn: string;
    district: string;
    status: string;
  } | null>(null);

  // Mock pending verification requests
  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 'v1', name: 'Rathnayake Produce Traders', type: 'Commercial Buyer', nicOrBrn: 'BRN-2024-98124', district: 'Dambulla', status: 'pending' },
    { id: 'v2', name: 'Kandy Highland Farmers Co-op', type: 'Farmer Producer', nicOrBrn: '740192837V', district: 'Kandy', status: 'pending' },
    { id: 'v3', name: 'Lanka Freight Express', type: 'Logistics Hauler', nicOrBrn: 'BRN-2022-44120', district: 'Colombo', status: 'pending' },
  ]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mx-auto border border-indigo-200 shadow-2xs">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Admin Access Restricted</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You must be authenticated with System Administrator credentials to view governance analytics and moderation controls.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/login?role=admin"
            className="w-full sm:w-auto bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Login as System Admin
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const handleApproveVerification = (id: string) => {
    setPendingVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v)));
  };

  const handleRejectVerification = (id: string) => {
    setPendingVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status: 'rejected' } : v)));
  };

  const handleResolveDispute = (disputeId: string) => {
    const outcome = resolutionNote.trim() || `Dispute investigated & resolved with ${refundPercentage}% refund decision.`;
    resolveDispute(disputeId, outcome, refundPercentage);
    setSelectedDisputeId(null);
    setResolutionNote('');
  };

  const handleSavePrice = (id: string) => {
    updateMarketPrice(id, editPriceVal);
    setEditingPriceId(null);
  };

  // Live KPI Calculations
  const liveEscrowSum = contracts.reduce((acc, c) => acc + c.totalPaidLkr, 0);
  const liveRevenueSum = contracts.reduce((acc, c) => acc + c.escrowFeeLkr, 0);
  const activeDisputesCount = disputes.filter((d) => d.status !== 'resolved').length;
  const approvedStakeholders = pendingVerifications.filter((v) => v.status === 'approved').length;

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
          <div className="text-2xl font-black text-[#064e3b]">
            LKR {((liveEscrowSum > 0 ? liveEscrowSum : 207850) / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">100% Secured Holding</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Platform Revenue (1.5% Fee)</span>
          <div className="text-2xl font-black text-amber-600">
            LKR {(liveRevenueSum > 0 ? liveRevenueSum : 2850).toLocaleString()}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">Automated Fee Ledger</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Verified Stakeholders</span>
          <div className="text-2xl font-black text-slate-900">
            {(5840 + approvedStakeholders).toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500">NIC & BR Verified</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Active Disputes</span>
          <div className="text-2xl font-black text-emerald-600">{activeDisputesCount}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {activeDisputesCount === 0 ? 'All Disputes Resolved' : 'Requires Governance Audit'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'users' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" /> {t.verificationsTab} ({pendingVerifications.filter(v => v.status === 'pending').length})
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'escrow' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" /> {t.escrowLedgerTab} ({contracts.length})
        </button>

        <button
          onClick={() => setActiveTab('disputes')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'disputes' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> {t.disputesTab} ({disputes.length})
        </button>

        <button
          onClick={() => setActiveTab('prices')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'prices' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" /> {t.marketPricesTab} ({marketPrices.length})
        </button>
      </div>

      {/* Content */}
      {/* TAB 1: USER & BUSINESS VERIFICATIONS */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">NIC & BRN Stakeholder Verification Queue</h3>
              <p className="text-slate-500">Review business registration certificates and national identities for platform compliance</p>
            </div>
            <span className="bg-emerald-100 text-[#064e3b] font-bold px-3 py-1 rounded-lg">
              Pending: {pendingVerifications.filter((v) => v.status === 'pending').length}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingVerifications.map((item) => (
              <div key={item.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    District: <span className="font-medium text-slate-700">{item.district}</span> • ID / BRN:{' '}
                    <span className="font-mono text-[#064e3b] font-bold">{item.nicOrBrn}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc(item)}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Proof
                  </button>

                  {item.status === 'approved' ? (
                    <span className="bg-emerald-100 text-[#064e3b] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </span>
                  ) : item.status === 'rejected' ? (
                    <span className="bg-rose-100 text-rose-800 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border border-rose-300">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleApproveVerification(item.id)}
                        className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectVerification(item.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ESCROW CONTRACTS & RELEASE */}
      {activeTab === 'escrow' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Escrow Transaction Ledger & Funds Release</h3>
              <p className="text-slate-500">Audit secured deposits, platform commissions, and execute payment release</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-[#064e3b] font-bold px-3 py-1 rounded-lg">
                Total Contracts: {contracts.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold text-[10px]">
                  <th className="p-3">Contract / Invoice</th>
                  <th className="p-3">Stakeholders</th>
                  <th className="p-3">Produce & Qty</th>
                  <th className="p-3">Total Held</th>
                  <th className="p-3">Fee (1.5%)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <span className="font-mono text-[#064e3b] font-bold block">{c.invoiceNumber}</span>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {c.id}</span>
                      <span className="text-[10px] text-slate-500 block">{c.depositDate}</span>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <div className="font-bold text-slate-900">
                        <span className="text-slate-400 font-normal">Buyer: </span>{c.buyerName}
                      </div>
                      <div className="text-slate-600">
                        <span className="text-slate-400 font-normal">Farmer: </span>{c.farmerName}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-slate-800 block">{c.produceTitle}</span>
                      <span className="text-slate-500">{c.quantityKg.toLocaleString()} Kg @ LKR {c.agreedPricePerKg}/kg</span>
                    </td>
                    <td className="p-3">
                      <span className="font-black text-[#064e3b] block">LKR {c.totalPaidLkr.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500">Produce: LKR {c.produceAmountLkr.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 block">LKR {c.escrowFeeLkr.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400">Transport: LKR {c.transportFeeLkr.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      {c.status === 'holding' && (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full text-[10px] border border-amber-300">
                          HOLDING
                        </span>
                      )}
                      {c.status === 'released' && (
                        <span className="bg-emerald-100 text-[#064e3b] font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-300">
                          RELEASED TO SELLER
                        </span>
                      )}
                      {c.status === 'refunded' && (
                        <span className="bg-purple-100 text-purple-900 font-bold px-2.5 py-1 rounded-full text-[10px] border border-purple-300">
                          REFUNDED
                        </span>
                      )}
                      {c.status === 'disputed' && (
                        <span className="bg-rose-100 text-rose-900 font-bold px-2.5 py-1 rounded-full text-[10px] border border-rose-300">
                          DISPUTED
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      {c.status === 'holding' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => releaseEscrow(c.id)}
                            className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer"
                          >
                            Release Funds
                          </button>
                          <button
                            onClick={() => refundEscrow(c.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-all cursor-pointer"
                          >
                            Refund Buyer
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Settled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUALITY & DISPUTES */}
      {activeTab === 'disputes' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Quality & Transport Dispute Resolution</h3>
              <p className="text-slate-500">Examine damage logs, enter audit resolution notes, and authorize refunds</p>
            </div>
            <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-lg">
              Open Disputes: {disputes.filter((d) => d.status !== 'resolved').length}
            </span>
          </div>

          <div className="space-y-4">
            {disputes.map((disp) => (
              <div key={disp.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-slate-900 text-sm">{disp.reason}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Ticket ID: <span className="font-mono text-slate-700 font-bold">{disp.id}</span> • Contract:{' '}
                      <span className="font-mono text-[#064e3b] font-bold">{disp.contractId}</span> • Raised by:{' '}
                      <span className="font-bold text-slate-800">{disp.raisedBy} ({disp.role})</span>
                    </div>
                  </div>

                  <div>
                    {disp.status === 'resolved' ? (
                      <span className="bg-emerald-100 text-[#064e3b] font-bold px-3 py-1 rounded-full text-[10px] border border-emerald-300">
                        RESOLVED
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full text-[10px] border border-amber-300">
                        UNDER REVIEW
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 block text-[11px]">Submitted Claim Evidence:</span>
                  <p className="text-slate-600 text-xs">{disp.evidenceNotes}</p>
                </div>

                {disp.status === 'resolved' ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-1 text-emerald-900">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Resolution Recorded:
                    </div>
                    <p className="text-xs">{disp.resolutionOutcome}</p>
                    <span className="font-bold text-[11px] block mt-1">
                      Refund Granted: {disp.refundPercentage || 0}%
                    </span>
                  </div>
                ) : (
                  <div>
                    {selectedDisputeId === disp.id ? (
                      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 mt-2">
                        <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#064e3b]" /> Formal Resolution Note & Determination
                        </h4>
                        <div>
                          <label className="text-slate-700 font-semibold block mb-1">
                            Administrator Resolution Note <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={2}
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                            placeholder="State rationale based on transport inspection and contractual quality terms..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#064e3b]"
                          />
                        </div>

                        <div>
                          <label className="text-slate-700 font-semibold block mb-1.5">
                            Buyer Refund Determination
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: '0% (Release Full to Farmer)', val: 0 },
                              { label: '15% Partial Damage Refund', val: 15 },
                              { label: '50% Shared Liability Refund', val: 50 },
                              { label: '100% Full Buyer Refund', val: 100 },
                            ].map((opt) => (
                              <button
                                key={opt.val}
                                type="button"
                                onClick={() => setRefundPercentage(opt.val)}
                                className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                                  refundPercentage === opt.val
                                    ? 'bg-[#064e3b] text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setSelectedDisputeId(null)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResolveDispute(disp.id)}
                            className="px-4 py-1.5 rounded-lg bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold cursor-pointer"
                          >
                            Execute Decision
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedDisputeId(disp.id);
                          setResolutionNote('');
                          setRefundPercentage(15);
                        }}
                        className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Resolve Dispute
                      </button>
                    )}
                  </div>
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

      {/* Proof Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl p-5 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#064e3b]" />
                <h3 className="font-bold text-slate-900 text-sm">Official Stakeholder Identity Proof</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Registered Legal Entity</span>
                  <p className="font-bold text-slate-900 text-sm">{previewDoc.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Trading Category</span>
                    <p className="font-bold text-slate-800">{previewDoc.type}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Operating District</span>
                    <p className="font-bold text-slate-800">{previewDoc.district}</p>
                  </div>
                </div>
                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Government Document Number</span>
                  <p className="font-mono text-[#064e3b] font-black text-sm">{previewDoc.nicOrBrn}</p>
                </div>
              </div>

              {/* Mock Certificate Scan Box */}
              <div className="border-2 border-dashed border-emerald-300 rounded-xl p-4 bg-emerald-50/50 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Department of Registrar of Companies / D.R.O Verified</span>
                  <span className="text-[10px] text-slate-500">Government Electronic Cryptographic Certificate Validated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 text-xs cursor-pointer"
              >
                Close
              </button>
              {previewDoc.status === 'pending' && (
                <button
                  onClick={() => {
                    handleApproveVerification(previewDoc.id);
                    setPreviewDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" /> Approve Registration
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
