'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ProduceListing, NegotiationOffer, EscrowContract, ShipmentJob, DisputeTicket } from '@/lib/types';
import { SriLankaMap } from '@/components/SriLankaMap';
import { InvoiceModal } from '@/components/InvoiceModal';
import { ProfileVerificationModal } from '@/components/ProfileVerificationModal';
import { QRScannerModal } from '@/components/QRScannerModal';
import { ContactModal } from '@/components/ContactModal';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  Calendar,
  MessageSquare,
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  X,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Layers,
  LayoutDashboard,
  Boxes,
  CreditCard,
  Building2,
  LogIn,
  UserPlus,
  Truck,
  QrCode,
  AlertTriangle,
  RefreshCw,
  Store,
  Clock,
  ArrowRight,
  Send,
  Eye,
  CheckCircle,
  FileCheck,
  Map,
  Globe,
  Phone
} from 'lucide-react';

export default function BuyerPage() {
  const { user } = useAuth();
  const {
    listings,
    offers,
    contracts,
    shipments,
    marketPrices,
    disputes,
    createOffer,
    respondToOffer,
    depositEscrow,
    verifyDeliveryQr,
    raiseDispute,
    lang
  } = useApp();
  const t = getTranslation(lang);

  // Tab State
  const [activeTab, setActiveTab] = useState<'procurement' | 'map' | 'negotiations' | 'escrow' | 'shipments' | 'disputes'>('procurement');

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [preHarvestOnly, setPreHarvestOnly] = useState(false);

  // Modals state
  const [biddingModalListing, setBiddingModalListing] = useState<ProduceListing | null>(null);
  const [targetQty, setTargetQty] = useState<number>(1000);
  const [offeredPrice, setOfferedPrice] = useState<number>(120);
  const [deliveryDate, setDeliveryDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [quoteNote, setQuoteNote] = useState<string>('');

  // Counter Offer Modal State
  const [selectedOfferForCounter, setSelectedOfferForCounter] = useState<NegotiationOffer | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [counterQty, setCounterQty] = useState<number>(0);
  const [counterNote, setCounterNote] = useState('');

  // Reject Offer Modal State
  const [selectedOfferForReject, setSelectedOfferForReject] = useState<NegotiationOffer | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Dispute Raise Modal State
  const [selectedContractForDispute, setSelectedContractForDispute] = useState<EscrowContract | null>(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeEvidence, setDisputeEvidence] = useState('');

  // Other Modals
  const [invoiceModalContract, setInvoiceModalContract] = useState<EscrowContract | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [qrScanShipment, setQrScanShipment] = useState<ShipmentJob | null>(null);

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
    role: 'Farmer Producer',
    phone: '',
  });

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Commercial Buyer Authentication Required</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You must be logged in with a registered Commercial Buyer enterprise account to browse wholesale stocks, issue price quote offers, and manage escrow deposits.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/login?role=buyer"
            className="w-full sm:w-auto bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Login as Commercial Buyer
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> Register Enterprise Account
          </Link>
        </div>
      </div>
    );
  }

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesDistrict = selectedDistrict === 'all' || item.locationDistrict === selectedDistrict;
    const matchesPreHarvest = !preHarvestOnly || item.isPreHarvest;
    return matchesSearch && matchesGrade && matchesDistrict && matchesPreHarvest;
  });

  const handleOpenBidding = (item: ProduceListing) => {
    setBiddingModalListing(item);
    setTargetQty(item.minOrderQtyKg || 500);
    setOfferedPrice(item.pricePerKg);
  };

  const handleOpenContactFarmer = (item: ProduceListing) => {
    setContactTarget({
      isOpen: true,
      name: item.farmerName,
      role: 'Farmer Producer',
      phone: item.farmerPhone || '+94 77 123 4567',
      district: item.locationDistrict,
      produceTitle: item.title,
    });
  };

  const handleSendQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingModalListing) return;
    createOffer(biddingModalListing.id, targetQty, offeredPrice, deliveryDate, quoteNote);
    setBiddingModalListing(null);
    setActiveTab('negotiations');
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

  const handleRaiseDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractForDispute) return;
    raiseDispute(selectedContractForDispute.id, disputeReason, disputeEvidence);
    setSelectedContractForDispute(null);
    setActiveTab('disputes');
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (!target.src.endsWith('/leeks.jpg')) {
      target.src = '/leeks.jpg';
    }
  };

  const pendingOffersCount = offers.filter(o => o.status === 'pending' || o.status === 'countered').length;

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12">
      {/* Left Navigation Sidebar */}
      <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-4 space-y-6 shadow-2xs shrink-0">
        {/* Profile Info */}
        <div className="px-2 border-b border-slate-100 pb-3 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-xs shadow-2xs">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'KA'}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-extrabold text-xs text-slate-900 truncate block">
                {user?.name || 'Keells Agri Procure'}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">BRN Verified Buyer</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowVerificationModal(true)}
            className="w-full bg-slate-50 hover:bg-emerald-50 text-[#064e3b] border border-slate-200 hover:border-emerald-300 text-[10px] font-bold py-1.5 px-2.5 rounded-lg transition-all flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-600" /> BRN & Bank Verification
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>

        {/* Tab Navigation */}
        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('procurement')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'procurement' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Stock Catalog
            </span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'map' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" /> Interactive Agri Map
            </span>
          </button>

          <button
            onClick={() => setActiveTab('negotiations')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'negotiations' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Bids & Quotes Inbox
            </span>
            {pendingOffersCount > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === 'negotiations' ? 'bg-amber-400 text-slate-900' : 'bg-amber-100 text-amber-800'}`}>
                {pendingOffersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'escrow' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Boxes className="w-4 h-4" /> Escrow Payments ({contracts.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('shipments')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'shipments' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4" /> Shipments ({shipments.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'disputes' ? 'bg-[#064e3b] text-white font-bold shadow-2xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Dispute Claims ({disputes.length})
            </span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (listings[0]) handleOpenBidding(listings[0]);
            }}
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs py-3 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Post Bulk Requirement
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        {/* Header Title */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'procurement' && '🛒 Commercial Buyer Procurement Catalog'}
              {activeTab === 'map' && '🗺️ Sri Lanka Interactive Agri GIS Map'}
              {activeTab === 'negotiations' && '🤝 B2B Price Quotes & Real-Time Bidding Inbox'}
              {activeTab === 'escrow' && '🔒 Escrow Holding Contracts & Tax Invoices'}
              {activeTab === 'shipments' && '🚚 Haulage Checkpoints & QR Delivery Inspection'}
              {activeTab === 'disputes' && '🛡️ Defective Crop Quality Claims & Disputes'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'procurement' && 'Search bulk crop stocks, inspect GAP quality grades, and submit quotation offers'}
              {activeTab === 'map' && 'Real-time Leaflet OpenStreetMap view with agricultural pins and logistics freight corridors'}
              {activeTab === 'negotiations' && 'Review seller counter-offers, accept agreements, and lock in wholesale contracts'}
              {activeTab === 'escrow' && 'Deposit transaction funds securely into escrow holding and download invoices'}
              {activeTab === 'shipments' && 'Track transport haulers live and scan QR codes to confirm delivery and release funds'}
              {activeTab === 'disputes' && 'File defect claims for bruised/substandard cargo before escrow payouts'}
            </p>
          </div>

          {/* Quick Tab Switcher Pill */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('procurement')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'procurement' ? 'bg-[#064e3b] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === 'map' ? 'bg-[#064e3b] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" /> GIS Map
            </button>
            <button
              onClick={() => setActiveTab('negotiations')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'negotiations' ? 'bg-[#064e3b] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bids ({offers.length})
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'escrow' ? 'bg-[#064e3b] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Escrow ({contracts.length})
            </button>
          </div>
        </div>

        {/* TAB 1: PROCUREMENT CATALOG */}
        {activeTab === 'procurement' && (
          <div className="space-y-6">
            {/* National Economic Center Daily Baseline Market Prices Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-extrabold text-sm text-white">National Economic Center Baseline Benchmarks</h3>
                    <p className="text-[11px] text-slate-400">Official wholesale baseline prices to inform fair B2B quote negotiations</p>
                  </div>
                </div>
                <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated Today 06:00 AM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {marketPrices.slice(0, 4).map((mp) => (
                  <div key={mp.id} className="bg-slate-800/80 border border-slate-700/70 p-3 rounded-xl space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-slate-100">{mp.cropName}</span>
                      <span className="text-[9px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">{mp.centerName}</span>
                    </div>
                    <div className="text-lg font-black text-emerald-400">LKR {mp.avgPriceLkr} <span className="text-[10px] font-normal text-slate-300">/{mp.unit}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Toolbar & Map Switcher Banner */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search Leeks, Carrots, Samba Paddy, Tomatoes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Quality Grades</option>
                    <option value="Grade A">Grade A (Export / Supermarket)</option>
                    <option value="Grade B">Grade B (Commercial Standard)</option>
                    <option value="Grade C">Grade C (Processing / Canning)</option>
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Districts</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Dambulla">Dambulla</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Monaragala">Monaragala</option>
                  </select>

                  <button
                    onClick={() => setPreHarvestOnly(!preHarvestOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      preHarvestOnly
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Pre-Harvest Only
                  </button>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" /> Full Map View
                  </button>
                </div>
              </div>
            </div>

            {/* Crop Cards Grid (100% Full Width spacious layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-100">
                    <img src={item.photos[0]} alt={item.title} className="w-full h-full object-cover" onError={handleImageError} />
                    <span className="absolute top-2.5 left-2.5 bg-[#064e3b] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-2xs">
                      {item.grade}
                    </span>
                    {item.isPreHarvest && (
                      <span className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-2xs">
                        Forward Contract
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{item.title}</h3>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{item.farmerName} • {item.locationDistrict}</span>
                        <button
                          onClick={() => handleOpenContactFarmer(item)}
                          className="text-[#064e3b] hover:text-[#043e2f] font-bold flex items-center gap-1 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Contact Farmer
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                        <span className="text-slate-600 font-semibold">Ready Date: <span className="font-mono text-slate-900">{item.harvestDate}</span></span>
                        <span className="text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">{item.quantityKg.toLocaleString()} kg</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Baseline Price</span>
                        <span className="text-lg font-black text-[#064e3b]">LKR {item.pricePerKg}</span>
                        <span className="text-[9px] text-slate-500">/Kg</span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleOpenBidding(item)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
                        >
                          Make Quote
                        </button>
                        <button
                          onClick={() => handleOpenBidding(item)}
                          className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-2xs transition-all cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Full-Width Map Banner Section below grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="font-extrabold text-base text-white">Sri Lanka Interactive Agri GIS Map</h3>
                    <p className="text-xs text-slate-400">Explore real geographic origin pins, freight routes, and economic centers</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('map')}
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  Expand Full Map View <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Spacious Map Container */}
              <div className="w-full">
                <SriLankaMap listings={filteredListings} onSelectListing={(l) => handleOpenBidding(l)} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL-WIDTH GIS MAP TAB */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#064e3b]" /> Sri Lanka Agricultural GIS Map
                  </h3>
                  <p className="text-xs text-slate-500">Live OpenStreetMap interactive map with crop origin pins, economic hubs, and logistics corridors</p>
                </div>

                <button
                  onClick={() => setActiveTab('procurement')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-xl transition-all"
                >
                  ← Back to Stock Catalog
                </button>
              </div>

              <div className="w-full">
                <SriLankaMap listings={filteredListings} onSelectListing={(l) => handleOpenBidding(l)} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NEGOTIATIONS & BIDS INBOX */}
        {activeTab === 'negotiations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Real-Time Quotation & Bidding Inbox</h3>
              <span className="text-xs text-slate-500 font-medium">{offers.length} Total Offers Issued</span>
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs hover:border-emerald-300 transition-all text-xs">
                  <div className="flex flex-wrap justify-between items-start border-b border-slate-100 pb-3 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#064e3b] font-bold text-[11px]">BID ID: {offer.id}</span>
                        <span className="text-[10px] text-slate-400">• {offer.createdAt}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">{offer.produceTitle}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-slate-600 font-medium">Seller: <span className="font-bold text-slate-900">{offer.farmerName}</span></p>
                        <button
                          onClick={() => setContactTarget({
                            isOpen: true,
                            name: offer.farmerName,
                            role: 'Farmer Producer',
                            phone: offer.buyerPhone || '+94 77 123 4567',
                            produceTitle: offer.produceTitle,
                          })}
                          className="text-[#064e3b] font-bold flex items-center gap-1 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Contact Farmer
                        </button>
                      </div>
                    </div>

                    <span className={`font-bold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider ${
                      offer.status === 'accepted'
                        ? 'bg-emerald-100 text-[#064e3b] border border-emerald-300'
                        : offer.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : offer.status === 'countered'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Requested Qty:</span>
                      <span className="font-bold text-slate-900">{offer.targetQtyKg.toLocaleString()} Kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Baseline Price:</span>
                      <span className="font-semibold text-slate-700">LKR {offer.originalPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Offered Price:</span>
                      <span className="font-black text-[#064e3b] text-sm">LKR {offer.offeredPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Total Order Value:</span>
                      <span className="font-black text-slate-900">LKR {(offer.targetQtyKg * offer.offeredPricePerKg).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Message History Timeline */}
                  {offer.messages && offer.messages.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Negotiation Activity Timeline</span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {offer.messages.map((m) => (
                          <div
                            key={m.id}
                            className={`p-3 rounded-xl text-xs space-y-1 ${
                              m.sender === 'buyer'
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

                  {/* Buyer Actions */}
                  {offer.status !== 'accepted' && offer.status !== 'rejected' && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => respondToOffer(offer.id, 'accept')}
                        className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Accept Counter & Generate Escrow Contract
                      </button>

                      <button
                        onClick={() => handleOpenCounterModal(offer)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" /> Propose Counter Quote
                      </button>

                      <button
                        onClick={() => handleOpenRejectModal(offer)}
                        className="bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" /> Decline Bid
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ESCROW PAYMENTS */}
        {activeTab === 'escrow' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Escrow Holding Contracts & Digital Invoices</h3>
              <span className="text-xs text-slate-500 font-medium">{contracts.length} Active Escrow Contracts</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contracts.map((ctr) => (
                <div key={ctr.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs text-xs">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-[#064e3b] font-bold">{ctr.invoiceNumber}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{ctr.produceTitle}</h4>
                      <p className="text-slate-500">Seller: {ctr.farmerName}</p>
                    </div>

                    <span className="bg-emerald-100 text-[#064e3b] font-bold px-2.5 py-1 rounded-full text-[10px]">
                      ESCROW SECURED
                    </span>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Produce Amount:</span>
                      <span className="font-bold text-slate-800">LKR {ctr.produceAmountLkr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Transport Haulage:</span>
                      <span>LKR {ctr.transportFeeLkr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-slate-900 border-t border-slate-200 pt-1.5">
                      <span>Total Deposited:</span>
                      <span className="text-[#064e3b] text-sm">LKR {ctr.totalPaidLkr.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setInvoiceModalContract(ctr)}
                      className="flex-1 bg-[#064e3b] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <FileText className="w-4 h-4" /> Download Tax Invoice
                    </button>

                    <button
                      onClick={() => setContactTarget({
                        isOpen: true,
                        name: ctr.farmerName,
                        role: 'Farmer Producer',
                        phone: '+94 77 123 4567',
                        produceTitle: ctr.produceTitle,
                      })}
                      className="bg-emerald-50 hover:bg-emerald-100 text-[#064e3b] border border-emerald-300 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Farmer
                    </button>

                    <button
                      onClick={() => {
                        setSelectedContractForDispute(ctr);
                        setDisputeReason('');
                        setDisputeEvidence('');
                      }}
                      className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Raise Claim
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SHIPMENTS & QR INSPECTION */}
        {activeTab === 'shipments' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Cargo Haulage Checkpoints & Delivery QR Inspection</h3>
                <p className="text-xs text-slate-500">Scan delivery driver QR code upon cargo arrival at warehouse to complete inspection and release funds</p>
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
                      <p className="text-slate-600">Hauler: <span className="font-bold text-slate-900">{ship.haulerName}</span> ({ship.haulerVehicle})</p>
                      <div className="flex items-center gap-2">
                        <p className="text-slate-500 font-mono text-[11px]">Driver: {ship.driverName} • {ship.driverPhone}</p>
                        <button
                          onClick={() => setContactTarget({
                            isOpen: true,
                            name: ship.driverName,
                            role: 'Logistics Driver',
                            phone: ship.driverPhone || '+94 71 444 5566',
                            produceTitle: ship.produceTitle,
                          })}
                          className="text-blue-700 hover:text-blue-900 font-bold text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" /> Call Driver
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-right">
                      <span className="text-slate-400 block text-[10px]">Destination Drop-off</span>
                      <span className="font-bold text-slate-800">{ship.destinationHub}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold block">Current Location: {ship.currentLocationName}</span>
                    </div>

                    <button
                      onClick={() => setQrScanShipment(ship)}
                      className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" /> Scan QR & Confirm Delivery
                    </button>
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
              <h3 className="font-extrabold text-slate-900 text-sm">Defective Produce Quality Claims</h3>
              <p className="text-xs text-slate-500">File quality disputes regarding transit bruising or grade mismatch to pause escrow payouts</p>
            </div>

            <div className="space-y-3 text-xs">
              {disputes.length > 0 ? (
                disputes.map((disp) => (
                  <div key={disp.id} className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-amber-900 font-bold">DISPUTE ID: {disp.id}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{disp.reason}</h4>
                        <p className="text-slate-600">Contract ID: {disp.contractId}</p>
                      </div>
                      <span className="bg-amber-200 text-amber-900 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                        {disp.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="bg-white p-2.5 rounded-lg border border-amber-200 text-slate-700 font-medium">
                      Evidence Submitted: &quot;{disp.evidenceNotes}&quot;
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm">No Active Quality Disputes</p>
                  <p className="text-xs text-slate-500">All purchased crops have passed inspection clean!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: B2B PRICE QUOTE OFFER MODAL */}
      {biddingModalListing && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Issue B2B Price Quote Offer</h3>
              <button onClick={() => setBiddingModalListing(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuoteSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <p className="font-extrabold text-slate-900 text-sm">{biddingModalListing.title}</p>
                <p className="text-slate-600 font-medium">Seller: {biddingModalListing.farmerName} ({biddingModalListing.locationDistrict})</p>
                <p className="text-[#064e3b] font-black text-xs">Baseline Farm Price: LKR {biddingModalListing.pricePerKg}/kg</p>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Target Volume (Kg)</label>
                <input
                  type="number"
                  min="1"
                  value={targetQty}
                  onChange={(e) => setTargetQty(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 text-base focus:outline-none focus:border-[#064e3b]"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Offered Price per Kg (LKR)</label>
                <input
                  type="number"
                  min="1"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-[#064e3b] text-base focus:outline-none focus:border-[#064e3b]"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Requested Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#064e3b]"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Quote Note / Requirements</label>
                <textarea
                  rows={2}
                  value={quoteNote}
                  onChange={(e) => setQuoteNote(e.target.value)}
                  placeholder="e.g. Require delivery to Welisara Central Warehouse before 08 AM..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBiddingModalListing(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Quote Offer
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
              <h3 className="font-bold text-slate-900 text-sm">Propose Counter Quote to Farmer</h3>
              <button onClick={() => setSelectedOfferForCounter(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendCounterOfferSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold block">{selectedOfferForCounter.produceTitle}</span>
                <span className="text-slate-700 font-medium block">Seller: {selectedOfferForCounter.farmerName}</span>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Counter Price per Kg (LKR)</label>
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
                <label className="text-slate-700 font-semibold block mb-1">Target Quantity (Kg)</label>
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
                  placeholder="Mention delivery window or packaging..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedOfferForCounter(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Send Counter Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: RAISE DISPUTE MODAL */}
      {selectedContractForDispute && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Raise Quality Dispute Claim</h3>
              <button onClick={() => setSelectedContractForDispute(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRaiseDisputeSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 space-y-1">
                <span className="font-bold block">{selectedContractForDispute.produceTitle}</span>
                <span className="text-[11px] block">Invoice: {selectedContractForDispute.invoiceNumber}</span>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Reason for Claim <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="e.g. Crushed crates during transit, moisture mismatch..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Evidence Notes <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  value={disputeEvidence}
                  onChange={(e) => setDisputeEvidence(e.target.value)}
                  placeholder="Describe defects observed during unloading at distribution hub..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedContractForDispute(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  File Dispute Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PROFILE VERIFICATION MODAL */}
      <ProfileVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />

      {/* MODAL 5: DIGITAL INVOICE MODAL */}
      {invoiceModalContract && (
        <InvoiceModal contract={invoiceModalContract} onClose={() => setInvoiceModalContract(null)} />
      )}

      {/* MODAL 6: QR SCANNER DELIVERY VERIFICATION MODAL */}
      {qrScanShipment && (
        <QRScannerModal
          shipment={qrScanShipment}
          onVerify={() => {
            verifyDeliveryQr(qrScanShipment.id);
            setQrScanShipment(null);
          }}
          onClose={() => setQrScanShipment(null)}
        />
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
