'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ProduceListing, NegotiationOffer, EscrowContract } from '@/lib/types';
import { SriLankaMap } from '@/components/SriLankaMap';
import { InvoiceModal } from '@/components/InvoiceModal';
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
  X,
  TrendingUp,
  PlusCircle,
  Layers,
  LayoutDashboard,
  Boxes,
  CreditCard,
  Settings,
  HelpCircle,
  Home
} from 'lucide-react';

export default function BuyerPage() {
  const { listings, offers, contracts, createOffer, respondToOffer, depositEscrow, lang } = useApp();
  const t = getTranslation(lang);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [preHarvestOnly, setPreHarvestOnly] = useState(false);

  // Modals state
  const [biddingModalListing, setBiddingModalListing] = useState<ProduceListing | null>(null);
  const [targetQty, setTargetQty] = useState<number>(1000);
  const [offeredPrice, setOfferedPrice] = useState<number>(120);
  const [deliveryDate, setDeliveryDate] = useState<string>('2026-08-30');
  const [quoteNote, setQuoteNote] = useState<string>('');

  const [invoiceModalContract, setInvoiceModalContract] = useState<EscrowContract | null>(null);
  const [activeTab, setActiveTab] = useState<'procurement' | 'negotiations' | 'escrow'>('procurement');

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingModalListing) return;
    createOffer(biddingModalListing.id, targetQty, offeredPrice, deliveryDate, quoteNote);
    setBiddingModalListing(null);
    setActiveTab('negotiations');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12">
      {/* Left Navigation Sidebar matching 1st mockup */}
      <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-4 space-y-6 shadow-2xs shrink-0">
        <div className="flex items-center gap-2 px-2 border-b border-slate-100 pb-3">
          <div className="w-7 h-7 rounded-md bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs">
            DC
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 block">Dambulla Central</span>
            <span className="text-[10px] text-slate-500">Commercial Enterprise</span>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('procurement')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'procurement' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('negotiations')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'negotiations' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Active Bids ({offers.length})
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'escrow' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Boxes className="w-4 h-4" /> Escrow Payments ({contracts.length})
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => {
              if (listings[0]) handleOpenBidding(listings[0]);
            }}
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
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
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Marketplace Procurement</h1>
            <p className="text-xs text-slate-500">Discover and bid on bulk agricultural produce directly from farmers</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('procurement')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                activeTab === 'procurement' ? 'bg-[#064e3b] text-white' : 'text-slate-600'
              }`}
            >
              Browse Stock
            </button>
            <button
              onClick={() => setActiveTab('negotiations')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                activeTab === 'negotiations' ? 'bg-[#064e3b] text-white' : 'text-slate-600'
              }`}
            >
              Offers ({offers.length})
            </button>
            <button
              onClick={() => setActiveTab('escrow')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                activeTab === 'escrow' ? 'bg-[#064e3b] text-white' : 'text-slate-600'
              }`}
            >
              Escrow ({contracts.length})
            </button>
          </div>
        </div>

        {activeTab === 'procurement' && (
          <>
            {/* Filter Toolbar matching mockup */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search Leeks, Carrots, Samba Paddy..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Grades</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
                  >
                    <option value="all">All Locations</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Dambulla">Dambulla</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid & Map row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Cards Column */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-36 bg-slate-100">
                      <img src={item.photos[0]} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-[#064e3b] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.grade}
                      </span>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                        <p className="text-slate-500 text-[11px]">{item.farmerName} • {item.locationDistrict}</p>
                        <p className="text-slate-600 mt-1 font-semibold">Ready: {item.harvestDate}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Baseline</span>
                          <span className="text-base font-extrabold text-[#064e3b]">LKR {item.pricePerKg}</span>
                          <span className="text-[9px] text-slate-500">/Kg</span>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleOpenBidding(item)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-2.5 py-1.5 rounded-lg text-[11px]"
                          >
                            Quote
                          </button>
                          <button
                            onClick={() => handleOpenBidding(item)}
                            className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-2xs"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map & Quick Stats Column */}
              <div className="lg:col-span-5 space-y-4">
                <SriLankaMap listings={filteredListings} onSelectListing={(l) => handleOpenBidding(l)} />
              </div>
            </div>
          </>
        )}

        {/* Negotiations View */}
        {activeTab === 'negotiations' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#064e3b]" /> Real-Time Bidding & Counter-Offer Inbox
            </h2>

            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs text-xs">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-[#064e3b] font-bold">ID: {offer.id}</span>
                      <h3 className="font-bold text-slate-900 text-sm">{offer.produceTitle}</h3>
                      <p className="text-slate-500">Seller: {offer.farmerName}</p>
                    </div>

                    <span className="bg-emerald-100 text-[#064e3b] font-bold px-2.5 py-1 rounded-full">
                      {offer.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Requested Qty:</span>
                      <span className="font-bold text-slate-900">{offer.targetQtyKg} Kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Baseline Price:</span>
                      <span className="font-semibold text-slate-700">LKR {offer.originalPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Offered Price:</span>
                      <span className="font-extrabold text-[#064e3b]">LKR {offer.offeredPricePerKg}/kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Proposed Delivery:</span>
                      <span className="font-medium text-slate-700">{offer.proposedDeliveryDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Escrow View */}
        {activeTab === 'escrow' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#064e3b]" /> Escrow Contracts & Tax Invoices
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contracts.map((ctr) => (
                <div key={ctr.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs text-xs">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-mono text-[#064e3b] font-bold">{ctr.invoiceNumber}</span>
                      <h3 className="font-bold text-slate-900 text-sm">{ctr.produceTitle}</h3>
                      <p className="text-slate-500">Seller: {ctr.farmerName}</p>
                    </div>

                    <span className="bg-emerald-100 text-[#064e3b] font-bold px-2 py-0.5 rounded-full text-[10px]">
                      Escrow Holding
                    </span>
                  </div>

                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Produce Amount:</span>
                      <span className="font-bold text-slate-900">LKR {ctr.produceAmountLkr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1">
                      <span>Total Paid:</span>
                      <span className="text-[#064e3b]">LKR {ctr.totalPaidLkr.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setInvoiceModalContract(ctr)}
                    className="w-full bg-[#064e3b] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Digital Invoice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quote Modal */}
      {biddingModalListing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">B2B Price Quote Offer</h3>
              <button onClick={() => setBiddingModalListing(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="p-5 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">{biddingModalListing.title}</p>
                <p className="text-slate-500">Seller: {biddingModalListing.farmerName}</p>
                <p className="text-[#064e3b] font-bold">Baseline: LKR {biddingModalListing.pricePerKg}/kg</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Target Volume (Kg)</label>
                <input
                  type="number"
                  value={targetQty}
                  onChange={(e) => setTargetQty(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#064e3b]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-semibold">Offered Price per Kg (LKR)</label>
                <input
                  type="number"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#064e3b]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBiddingModalListing(null)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl shadow-2xs"
                >
                  Submit Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModalContract && (
        <InvoiceModal contract={invoiceModalContract} onClose={() => setInvoiceModalContract(null)} />
      )}
    </div>
  );
}
