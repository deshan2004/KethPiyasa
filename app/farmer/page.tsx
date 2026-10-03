'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ProduceListing, QualityGrade, NegotiationOffer, ShipmentJob, DisputeTicket } from '@/lib/types';
import { InvoiceModal } from '@/components/InvoiceModal';
import { ProfileVerificationModal } from '@/components/ProfileVerificationModal';
import { ContactModal } from '@/components/ContactModal';
import {
  Sprout,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  MapPin,
  Calendar,
  Layers,
  X,
  Clock,
  ShieldCheck,
  LayoutDashboard,
  Boxes,
  CreditCard,
  Building2,
  ArrowRight,
  LogIn,
  UserPlus,
  Upload,
  Image as ImageIcon,
  Camera,
  Link as LinkIcon,
  QrCode,
  AlertTriangle,
  Truck,
  RefreshCw,
  Send,
  HelpCircle,
  BadgeAlert,
  Check,
  ArrowUpRight,
  Filter,
  Tag,
  Store,
  FileCheck,
  Phone
} from 'lucide-react';

export default function FarmerPage() {
  const { user } = useAuth();
  const {
    listings,
    addListing,
    offers,
    respondToOffer,
    contracts,
    shipments,
    marketPrices,
    disputes,
    raiseDispute,
    lang
  } = useApp();
  const t = getTranslation(lang);

  // Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inbox' | 'listings' | 'logistics' | 'payouts' | 'disputes'>('dashboard');
  
  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [invoiceModalContract, setInvoiceModalContract] = useState<any | null>(null);
  
  // Counter Offer Modal State
  const [selectedOfferForCounter, setSelectedOfferForCounter] = useState<NegotiationOffer | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [counterQty, setCounterQty] = useState<number>(0);
  const [counterNote, setCounterNote] = useState('');

  // Reject Offer Modal State
  const [selectedOfferForReject, setSelectedOfferForReject] = useState<NegotiationOffer | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Pickup QR Code Pass Modal State
  const [selectedPickupShipment, setSelectedPickupShipment] = useState<ShipmentJob | null>(null);

  // Contact Modal State
  const [contactTarget, setContactTarget] = useState<{
    isOpen: boolean;
    name: string;
    role: 'Farmer Producer' | 'Commercial Buyer' | 'Logistics Driver';
    phone: string;
    district?: string;
    produceTitle?: string;
  }>({
    isOpen: false,
    name: '',
    role: 'Commercial Buyer',
    phone: '',
  });

  // Inventory Filter State
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'ready' | 'preharvest'>('all');

  // New Listing Form State
  const [title, setTitle] = useState('');
  const [cropType, setCropType] = useState('Leeks');
  const [grade, setGrade] = useState<QualityGrade>('Grade A');
  const [quantityKg, setQuantityKg] = useState<number>(2000);
  const [pricePerKg, setPricePerKg] = useState<number>(135);
  const [harvestDate, setHarvestDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [locationDistrict, setLocationDistrict] = useState('Nuwara Eliya');
  const [locationHub, setLocationHub] = useState('Nuwara Eliya Central Hub');
  const [isPreHarvest, setIsPreHarvest] = useState(false);
  const [organicCertified, setOrganicCertified] = useState(true);
  const [moistureContent, setMoistureContent] = useState('12% Fresh');
  const [minOrderQtyKg, setMinOrderQtyKg] = useState<number>(500);
  const [description, setDescription] = useState('');
  
  // Image / Photo state
  const [photoUrl, setPhotoUrl] = useState<string>('/leeks.jpg');
  const [photoInputMode, setPhotoInputMode] = useState<'preset' | 'file' | 'url'>('preset');

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
          <Sprout className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.roleFarmer}</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.farmerSubtitle}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/login?role=farmer"
            className="w-full sm:w-auto bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> {t.loginBtn}
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> {t.registerLink}
          </Link>
        </div>
      </div>
    );
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (!target.src.endsWith('/leeks.jpg')) {
      target.src = '/leeks.jpg';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCrop = cropType.trim() || 'Produce Listing';
    const finalPhoto = photoUrl || '/leeks.jpg';

    addListing({
      title: title || `${grade} ${finalCrop} (${locationDistrict})`,
      cropType: finalCrop,
      grade,
      quantityKg,
      pricePerKg,
      harvestDate,
      locationDistrict,
      locationHub,
      farmerName: user?.name || 'Bandara Organic Farms',
      farmerNic: user?.nicOrBrn || '781920394V',
      farmerPhone: user?.phone || '+94 77 123 4567',
      isPreHarvest,
      photos: [finalPhoto],
      organicCertified,
      moistureContent,
      minOrderQtyKg,
      description: description || `Freshly harvested ${finalCrop} from ${locationDistrict}. Grade: ${grade}.`,
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
    setActiveTab('listings');
  };

  const handleOpenCounterModal = (offer: NegotiationOffer) => {
    setSelectedOfferForCounter(offer);
    setCounterPrice(offer.offeredPricePerKg);
    setCounterQty(offer.targetQtyKg);
    setCounterNote('');
  };

  const handleSendCounterOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfferForCounter) return;
    respondToOffer(selectedOfferForCounter.id, 'counter', counterPrice, counterQty, counterNote);
    setSelectedOfferForCounter(null);
  };

  const handleOpenRejectModal = (offer: NegotiationOffer) => {
    setSelectedOfferForReject(offer);
    setRejectReason('');
  };

  const handleRejectOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfferForReject) return;
    respondToOffer(selectedOfferForReject.id, 'reject', undefined, undefined, rejectReason);
    setSelectedOfferForReject(null);
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (inventoryFilter === 'ready') return !item.isPreHarvest;
    if (inventoryFilter === 'preharvest') return item.isPreHarvest;
    return true;
  });

  // Calculate totals
  const totalCompletedValue = contracts.reduce((acc, c) => acc + c.produceAmountLkr, 1450000);
  const pendingBidsCount = offers.filter((o) => o.status === 'pending' || o.status === 'countered').length;
  const totalUpcomingYield = listings.filter(l => l.isPreHarvest).reduce((acc, l) => acc + l.quantityKg, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12">
      {/* Left Navigation Sidebar */}
      <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-4 space-y-6 shadow-2xs shrink-0">
        {/* Profile Card */}
        <div className="px-2 border-b border-slate-100 pb-3 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-xs shadow-2xs">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'BO'}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-extrabold text-xs text-slate-900 truncate block">
                {user?.name || 'Bandara Organic Farms'}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">NIC Verified Producer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowVerificationModal(true)}
            className="w-full bg-slate-50 hover:bg-emerald-50 text-[#064e3b] border border-slate-200 hover:border-emerald-300 text-[10px] font-bold py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-600" /> Bank & NIC Verification
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>

        {/* Tab Navigation */}
        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> {t.farmerTitle.split(' ')[0]} Overview
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'inbox' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> {t.offersInboxTab}
            </span>
            {pendingBidsCount > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'inbox' ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'}`}>
                {pendingBidsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'listings' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Boxes className="w-4 h-4" /> {t.listingsTab} ({listings.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'logistics' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" /> {t.navLogistics} ({shipments.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'payouts' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> {t.bankPayoutsTab}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'disputes' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> {t.disputesTab} ({disputes.length})
            </span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs py-3 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> {t.createNewListing}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {/* Section Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'dashboard' && `🌾 ${t.farmerTitle}`}
              {activeTab === 'inbox' && `🤝 ${t.offersInboxTab}`}
              {activeTab === 'listings' && `📦 ${t.listingsTab}`}
              {activeTab === 'logistics' && `🚚 ${t.navLogistics}`}
              {activeTab === 'payouts' && `🏦 ${t.bankPayoutsTab}`}
              {activeTab === 'disputes' && `🛡️ ${t.disputesTab}`}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.farmerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> {t.createNewListing}
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">{t.totalRevenue}</span>
                <div className="text-2xl font-black text-[#064e3b]">LKR {totalCompletedValue.toLocaleString()}</div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Escrow payout guaranteed
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">{t.activeBids}</span>
                <div className="text-2xl font-black text-amber-600">{pendingBidsCount}</div>
                <span className="text-[11px] text-amber-600 font-semibold">Active buyer negotiations</span>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">{t.upcomingHarvest}</span>
                <div className="text-2xl font-black text-slate-900">{totalUpcomingYield.toLocaleString()} kg</div>
                <span className="text-[11px] text-slate-500">Forward contracted harvest</span>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
                <span className="text-xs text-slate-500 font-medium block">Active Crop Listings</span>
                <div className="text-2xl font-black text-slate-900">{listings.length}</div>
                <span className="text-[11px] text-emerald-700 font-semibold">Published in B2B catalog</span>
              </div>
            </div>

            {/* National Economic Center Daily Baseline Market Prices Ticker Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-2xl p-6 space-y-4 shadow-md border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-extrabold text-sm text-white">{t.livePrices}</h3>
                    <p className="text-[11px] text-slate-400">Official daily wholesale price benchmarks from Dambulla, Pettah & Nuwara Eliya</p>
                  </div>
                </div>
                <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated Today 06:00 AM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {marketPrices.slice(0, 4).map((mp) => {
                  const cropNameTranslated = lang === 'si' ? mp.cropNameSi : lang === 'ta' ? mp.cropNameTa : mp.cropName;
                  return (
                    <div key={mp.id} className="bg-slate-800/80 border border-slate-700/70 p-3.5 rounded-xl space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs text-slate-100">{cropNameTranslated}</span>
                        <span className="text-[9px] text-slate-400 font-medium bg-slate-700/60 px-1.5 py-0.5 rounded">{mp.centerName}</span>
                      </div>
                      <div className="text-lg font-black text-emerald-400">LKR {mp.avgPriceLkr} <span className="text-[10px] font-normal text-slate-300">{t.perKg}</span></div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Range: {mp.minPriceLkr}-{mp.maxPriceLkr}</span>
                        <span className={`font-bold flex items-center ${mp.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {mp.change24h >= 0 ? '+' : ''}{mp.change24h}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Recent Inventory Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Active Crop Listings */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-[#064e3b]" /> {t.listingsTab}
                  </h3>
                  <button
                    onClick={() => setActiveTab('listings')}
                    className="text-xs text-[#064e3b] font-bold hover:underline flex items-center gap-1"
                  >
                    View All Listings <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold text-[10px]">
                        <th className="p-3">{t.cropType}</th>
                        <th className="p-3">{t.gradeLabel}</th>
                        <th className="p-3">{t.quantityKg}</th>
                        <th className="p-3">{t.pricePerKg}</th>
                        <th className="p-3">{t.harvestDate}</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {listings.slice(0, 4).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                            <img src={item.photos[0]} alt={item.title} className="w-8 h-8 rounded-lg object-cover border border-slate-200" onError={handleImageError} />
                            <div>
                              <span className="block truncate max-w-[140px] font-extrabold">{item.cropType}</span>
                              <span className="text-[10px] text-slate-500">{item.locationDistrict}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="bg-[#064e3b] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                              {item.grade}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{item.quantityKg.toLocaleString()} Kg</td>
                          <td className="p-3 font-black text-[#064e3b]">LKR {item.pricePerKg}</td>
                          <td className="p-3 text-slate-600 font-mono text-[11px]">{item.harvestDate}</td>
                          <td className="p-3">
                            {item.isPreHarvest ? (
                              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full text-[10px] border border-amber-200">
                                Pre-Harvest
                              </span>
                            ) : (
                              <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                                Ready Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Pre-Harvest Harvest Timeline Alerts */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Calendar className="w-4 h-4 text-[#064e3b]" />
                    <h3 className="font-bold text-slate-900 text-sm">{t.feature3Title}</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    {listings.filter(l => l.isPreHarvest).length > 0 ? (
                      listings.filter(l => l.isPreHarvest).map((ph) => (
                        <div key={ph.id} className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-900">{ph.cropType}</span>
                            <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">Forward Contract</span>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">Ready Date: <span className="font-bold font-mono text-slate-800">{ph.harvestDate}</span></p>
                          <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-amber-200/50">
                            <span>Target Qty: {ph.quantityKg.toLocaleString()} kg</span>
                            <span className="font-bold text-[#064e3b]">LKR {ph.pricePerKg}/kg</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-slate-400 space-y-1">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                        <p className="text-xs">No active pre-harvest forward contracts.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#064e3b]">
                    <ShieldCheck className="w-4 h-4" /> GAP & Organic Certification
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Certified produce lists 15-20% higher in commercial supermarket bidding engines. Ensure your GAP credentials are up to date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: B2B OFFERS & QUOTES INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{t.offersInboxTab}</h3>
              <span className="text-xs text-slate-500 font-medium">{offers.length} Total Offers Received</span>
            </div>

            <div className="space-y-4">
              {offers.map((off) => (
                <div key={off.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 text-xs shadow-2xs hover:border-emerald-300 transition-all">
                  <div className="flex flex-wrap justify-between items-start border-b border-slate-100 pb-3 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#064e3b] font-bold text-[11px]">BID ID: {off.id}</span>
                        <span className="text-[10px] text-slate-400">• {off.createdAt}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base">{off.produceTitle}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-slate-600 font-medium">
                          Buyer: <span className="font-bold text-slate-900">{off.buyerName}</span> ({off.buyerCompany})
                        </p>
                        <button
                          onClick={() => setContactTarget({
                            isOpen: true,
                            name: off.buyerName,
                            role: 'Commercial Buyer',
                            phone: off.buyerPhone || '+94 11 234 5678',
                            produceTitle: off.produceTitle,
                          })}
                          className="text-[#064e3b] font-bold flex items-center gap-1 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Contact Buyer
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`font-bold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider ${
                        off.status === 'accepted'
                          ? 'bg-emerald-100 text-[#064e3b] border border-emerald-300'
                          : off.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : off.status === 'countered'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {off.status}
                      </span>
                    </div>
                  </div>

                  {/* Financial & Volume Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Baseline Price:</span>
                      <span className="font-bold text-slate-700">LKR {off.originalPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Offered Price:</span>
                      <span className="font-black text-[#064e3b] text-sm">LKR {off.offeredPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Target Quantity:</span>
                      <span className="font-bold text-slate-900">{off.targetQtyKg.toLocaleString()} Kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Total Agreed Value:</span>
                      <span className="font-black text-slate-900">LKR {(off.targetQtyKg * off.offeredPricePerKg).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Negotiation Messages History Timeline */}
                  {off.messages && off.messages.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{t.negotiationHistory}</span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {off.messages.map((m) => (
                          <div
                            key={m.id}
                            className={`p-3 rounded-xl text-xs space-y-1 ${
                              m.sender === 'farmer'
                                ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950 ml-4'
                                : 'bg-slate-100 border border-slate-200 text-slate-800 mr-4'
                            }`}
                          >
                            <div className="flex justify-between items-center text-[10px] font-semibold">
                              <span className="font-bold text-slate-900">{m.senderName} ({m.sender.toUpperCase()})</span>
                              <span className="text-slate-400">{m.timestamp}</span>
                            </div>
                            <p className="font-medium text-slate-700">{m.note}</p>
                            <div className="text-[10px] font-mono text-[#064e3b] font-bold">
                              Offer: LKR {m.offeredPricePerKg}/kg • Qty: {m.quantityKg}kg
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {off.status !== 'accepted' && off.status !== 'rejected' && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => respondToOffer(off.id, 'accept')}
                        className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> {t.acceptOffer}
                      </button>

                      <button
                        onClick={() => handleOpenCounterModal(off)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" /> {t.sendCounterOffer}
                      </button>

                      <button
                        onClick={() => handleOpenRejectModal(off)}
                        className="bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" /> {t.rejectOffer}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCE STOCK & PRE-HARVEST INVENTORY */}
        {activeTab === 'listings' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{t.listingsTab}</h3>
                <p className="text-[11px] text-slate-500">Manage ready stock harvest and forward pre-harvest contracts</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setInventoryFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    inventoryFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({listings.length})
                </button>
                <button
                  onClick={() => setInventoryFilter('ready')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    inventoryFilter === 'ready' ? 'bg-white text-[#064e3b] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ready Stock ({listings.filter(l => !l.isPreHarvest).length})
                </button>
                <button
                  onClick={() => setInventoryFilter('preharvest')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    inventoryFilter === 'preharvest' ? 'bg-white text-amber-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pre-Harvest ({listings.filter(l => l.isPreHarvest).length})
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold text-[10px]">
                    <th className="p-3">{t.cropType}</th>
                    <th className="p-3">{t.gradeLabel}</th>
                    <th className="p-3">{t.quantityKg}</th>
                    <th className="p-3">{t.pricePerKg}</th>
                    <th className="p-3">{t.locationHub}</th>
                    <th className="p-3">{t.harvestDate}</th>
                    <th className="p-3">Certifications</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredListings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                        <img src={item.photos[0]} alt={item.title} className="w-9 h-9 rounded-lg object-cover border border-slate-200" onError={handleImageError} />
                        <div>
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#064e3b] text-white font-bold px-2 py-0.5 rounded text-[10px]">
                          {item.grade}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-800">{item.quantityKg.toLocaleString()} Kg</td>
                      <td className="p-3 font-black text-[#064e3b]">LKR {item.pricePerKg}/kg</td>
                      <td className="p-3 text-slate-600">{item.locationHub}</td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">{item.harvestDate}</td>
                      <td className="p-3">
                        {item.organicCertified ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                            GAP Certified
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="p-3">
                        {item.isPreHarvest ? (
                          <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-amber-300">
                            PRE-HARVEST
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-[#064e3b] font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-300">
                            READY STOCK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LOGISTICS & PICKUP DISPATCH */}
        {activeTab === 'logistics' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{t.logisticsTitle}</h3>
                <p className="text-xs text-slate-500">{t.logisticsSubtitle}</p>
              </div>

              <div className="space-y-3">
                {shipments.map((ship) => (
                  <div key={ship.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#064e3b] font-bold">SHIPMENT ID: {ship.id}</span>
                        <span className="bg-emerald-100 text-[#064e3b] font-bold px-2 py-0.5 rounded text-[10px]">
                          {ship.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{ship.produceTitle}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-slate-600">
                          Hauler: <span className="font-bold text-slate-900">{ship.haulerName}</span> ({ship.haulerVehicle})
                        </p>
                        <button
                          onClick={() => setContactTarget({
                            isOpen: true,
                            name: ship.driverName,
                            role: 'Logistics Driver',
                            phone: ship.driverPhone || '+94 71 444 5566',
                            produceTitle: ship.produceTitle,
                          })}
                          className="text-[#064e3b] font-bold flex items-center gap-1 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Call Driver
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-right">
                      <span className="text-slate-400 block text-[10px]">Route Path</span>
                      <span className="font-bold text-slate-800">{ship.originHub} → {ship.destinationHub}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold block">ETA: {ship.estimatedArrival}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPickupShipment(ship)}
                      className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" /> Present Pickup QR Pass
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BANK ESCROW PAYOUTS */}
        {activeTab === 'payouts' && (
          <div className="space-y-4">
            {/* Settlement Bank Account Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block">SETTLEMENT BANK ACCOUNT</span>
                  <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                    <span>{user?.bankAccount?.bankName || 'Commercial Bank of Ceylon PLC'}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </h4>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Account No: {user?.bankAccount?.accountNumber ? `**** **** ${user.bankAccount.accountNumber.slice(-4)}` : '**** **** 4892'} ({user?.name || 'Bandara Organic Farms'})
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{t.pendingPayouts}</span>
                    <span className="text-2xl font-black text-[#064e3b]">LKR {totalCompletedValue.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setShowVerificationModal(true)}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Update Account
                  </button>
                </div>
              </div>
            </div>

            {/* Escrow Contracts List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm">{t.bankPayoutsTab}</h3>

              <div className="space-y-3 text-xs">
                {contracts.map((ctr) => (
                  <div key={ctr.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="font-mono text-[#064e3b] font-bold block">{ctr.invoiceNumber}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{ctr.produceTitle}</h4>
                      <p className="text-slate-500">Buyer: {ctr.buyerName} ({ctr.buyerCompany})</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#064e3b] block">LKR {ctr.produceAmountLkr.toLocaleString()}</span>
                      <span className="bg-emerald-100 text-[#064e3b] font-bold px-2 py-0.5 rounded text-[10px]">
                        ESCROW GUARANTEED
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setContactTarget({
                          isOpen: true,
                          name: ctr.buyerName,
                          role: 'Commercial Buyer',
                          phone: '+94 11 234 5678',
                          produceTitle: ctr.produceTitle,
                        })}
                        className="bg-emerald-50 hover:bg-emerald-100 text-[#064e3b] border border-emerald-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Buyer
                      </button>

                      <button
                        onClick={() => setInvoiceModalContract(ctr)}
                        className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DISPUTES & CLAIMS */}
        {activeTab === 'disputes' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">{t.disputesTab}</h3>
              <p className="text-xs text-slate-500">Review claims raised by commercial buyers and inspect evidence</p>
            </div>

            <div className="space-y-3 text-xs">
              {disputes.length > 0 ? (
                disputes.map((disp) => (
                  <div key={disp.id} className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-amber-900 font-bold">DISPUTE ID: {disp.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{disp.reason}</h4>
                        <p className="text-slate-600">Raised By: {disp.raisedBy} ({disp.role.toUpperCase()})</p>
                      </div>
                      <span className="bg-amber-200 text-amber-900 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        {disp.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="bg-white p-2.5 rounded-lg border border-amber-200 text-slate-700 font-medium">
                      Evidence Notes: &quot;{disp.evidenceNotes}&quot;
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm">No Active Quality Disputes</p>
                  <p className="text-xs text-slate-500">All crop deliveries have passed inspection smoothly!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: CREATE NEW PRODUCE LISTING */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200 my-auto">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t.modalListingTitle}</h3>
                <p className="text-[11px] text-slate-500">List custom crop stock or pre-harvest forward contracts for buyers</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              {/* Crop Variety & Custom Name */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  {t.cropType} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  placeholder="e.g. Leeks, Gotukola, Pumpkin, Sweet Corn, Passionfruit..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#064e3b] focus:bg-white focus:outline-none rounded-xl px-3 py-2 font-semibold text-slate-800 transition-all"
                  required
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-medium">Quick Select:</span>
                  {['Leeks', 'Carrots', 'Paddy', 'Tomatoes', 'Green Chili', 'Red Onion', 'Potato', 'Pumpkin', 'Gotukola', 'Cabbage', 'Beans'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCropType(item)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        cropType === item
                          ? 'bg-[#064e3b] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Grade & Location District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">{t.gradeLabel}</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as QualityGrade)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="Grade A">{t.gradeA}</option>
                    <option value="Grade B">{t.gradeB}</option>
                    <option value="Grade C">{t.gradeC}</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">{t.locationDistrict}</label>
                  <select
                    value={locationDistrict}
                    onChange={(e) => setLocationDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Dambulla">Dambulla</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Matale">Matale</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Puttalam">Puttalam</option>
                  </select>
                </div>
              </div>

              {/* Quantity, Price & Harvest Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">{t.quantityKg}</label>
                  <input
                    type="number"
                    min="1"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">{t.pricePerKg}</label>
                  <input
                    type="number"
                    min="1"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    {t.harvestDate} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 font-semibold text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#064e3b] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Pre-harvest option */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">{t.isPreHarvest}</span>
                  <span className="text-[10px] text-slate-500">Allow buyers to contract crop before harvesting</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPreHarvest}
                    onChange={(e) => setIsPreHarvest(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064e3b]"></div>
                </label>
              </div>

              {/* Crop Photo / Image Selection Section */}
              <div>
                <label className="text-slate-700 font-semibold block mb-1.5">
                  Crop Photo / Image
                </label>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-2xs">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Crop Preview"
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="font-semibold text-slate-800 block text-xs">Choose Image Option</span>
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPhotoInputMode('file')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-1 transition-all ${
                            photoInputMode === 'file'
                              ? 'bg-[#064e3b] text-white shadow-2xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Camera className="w-3 h-3" /> Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoInputMode('url')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-1 transition-all ${
                            photoInputMode === 'url'
                              ? 'bg-[#064e3b] text-white shadow-2xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <LinkIcon className="w-3 h-3" /> Image Link
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoInputMode('preset')}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-[10px] flex items-center gap-1 transition-all ${
                            photoInputMode === 'preset'
                              ? 'bg-[#064e3b] text-white shadow-2xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <ImageIcon className="w-3 h-3" /> Sample Photos
                        </button>
                      </div>
                    </div>
                  </div>

                  {photoInputMode === 'file' && (
                    <div>
                      <label
                        htmlFor="crop-photo-file-upload"
                        className="cursor-pointer border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all"
                      >
                        <Upload className="w-5 h-5 text-[#064e3b] mb-1" />
                        <span className="text-xs font-bold text-[#064e3b]">Click to Upload Photo from Device / Camera</span>
                        <input
                          id="crop-photo-file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {photoInputMode === 'url' && (
                    <div>
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="Paste image web URL"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>
                  )}

                  {photoInputMode === 'preset' && (
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { name: 'Leeks', url: '/leeks.jpg' },
                        { name: 'Carrots', url: '/carrot.jpg' },
                        { name: 'Paddy', url: '/samba.jpg' },
                        { name: 'Tomatoes', url: '/tomato.jpeg' },
                        { name: 'Chili', url: '/chili.jpg' },
                        { name: 'Onion', url: '/onion.jpg' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setPhotoUrl(item.url)}
                          className={`relative rounded-lg overflow-hidden border-2 h-14 transition-all ${
                            photoUrl === item.url ? 'border-[#064e3b] ring-2 ring-emerald-500' : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" onError={handleImageError} />
                          <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[9px] font-medium text-center py-0.5 truncate px-1">
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">{t.cropDescription}</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention moisture level, harvest freshness, packaging..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {t.submitListing}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: COUNTER OFFER MODAL */}
      {selectedOfferForCounter && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{t.sendCounterOffer}</h3>
              <button onClick={() => setSelectedOfferForCounter(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendCounterOfferSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">{selectedOfferForCounter.produceTitle}</span>
                <span className="text-slate-700 font-medium block">Buyer: {selectedOfferForCounter.buyerName} ({selectedOfferForCounter.buyerCompany})</span>
                <span className="text-slate-500 font-mono text-[10px]">Current Buyer Offer: LKR {selectedOfferForCounter.offeredPricePerKg}/kg for {selectedOfferForCounter.targetQtyKg}kg</span>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">{t.offeredPrice}</label>
                <input
                  type="number"
                  min="1"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-[#064e3b] text-base focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">{t.targetQty}</label>
                <input
                  type="number"
                  min="1"
                  value={counterQty}
                  onChange={(e) => setCounterQty(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Message Note</label>
                <textarea
                  rows={2}
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  placeholder="e.g. Can accept LKR 128/kg if loading starts before 10 AM..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedOfferForCounter(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {t.sendCounterOffer}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: REJECT OFFER MODAL */}
      {selectedOfferForReject && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{t.rejectOffer}</h3>
              <button onClick={() => setSelectedOfferForReject(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRejectOfferSubmit} className="p-5 space-y-4 text-xs">
              <p className="text-slate-600 font-medium">
                Are you sure you want to decline the bid for <span className="font-bold text-slate-900">{selectedOfferForReject.produceTitle}</span> from {selectedOfferForReject.buyerName}?
              </p>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Reason for Decline (Optional)</label>
                <textarea
                  rows={2}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Price offer is significantly below baseline farm gate cost..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedOfferForReject(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {t.rejectOffer}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PICKUP QR PASS MODAL */}
      {selectedPickupShipment && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl p-6 space-y-5 text-center text-white text-xs animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Driver Pickup QR Pass</h3>
              </div>
              <button onClick={() => setSelectedPickupShipment(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block border-4 border-emerald-500 shadow-xl mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(selectedPickupShipment.id)}`}
                alt="Pickup QR Code"
                className="w-44 h-44 mx-auto object-contain"
              />
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1 text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Pickup Dispatch Pass</span>
              <p className="font-bold text-slate-100 text-xs">{selectedPickupShipment.produceTitle}</p>
              <p className="text-[11px] text-slate-300">Hauler: {selectedPickupShipment.haulerName}</p>
              <p className="text-[11px] text-[#34d399] font-mono font-bold">Driver: {selectedPickupShipment.driverName} ({selectedPickupShipment.haulerVehicle})</p>
            </div>

            <button
              onClick={() => setSelectedPickupShipment(null)}
              className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 5: PROFILE VERIFICATION MODAL */}
      <ProfileVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />

      {/* MODAL 6: DIGITAL INVOICE MODAL */}
      {invoiceModalContract && (
        <InvoiceModal contract={invoiceModalContract} onClose={() => setInvoiceModalContract(null)} />
      )}

      {/* MODAL 7: DIRECT CONTACT & TELEPHONY MODAL */}
      <ContactModal
        isOpen={contactTarget.isOpen}
        onClose={() => setContactTarget((prev) => ({ ...prev, isOpen: false }))}
        contactName={contactTarget.name}
        contactRole={contactTarget.role}
        phone={contactTarget.phone}
        district={contactTarget.district}
        produceTitle={contactTarget.produceTitle}
      />
    </div>
  );
}
