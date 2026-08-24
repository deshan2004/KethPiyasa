'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ProduceListing, QualityGrade } from '@/lib/types';
import {
  Sprout,
  PlusCircle,
  TrendingUp,
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
  Settings
} from 'lucide-react';

export default function FarmerPage() {
  const { listings, addListing, offers, respondToOffer, contracts, lang } = useApp();
  const t = getTranslation(lang);

  const [activeTab, setActiveTab] = useState<'listings' | 'inbox' | 'payouts'>('listings');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [cropType, setCropType] = useState('Leeks');
  const [grade, setGrade] = useState<QualityGrade>('Grade A');
  const [quantityKg, setQuantityKg] = useState<number>(2000);
  const [pricePerKg, setPricePerKg] = useState<number>(135);
  const [harvestDate, setHarvestDate] = useState('2026-08-30');
  const [locationDistrict, setLocationDistrict] = useState('Nuwara Eliya');
  const [locationHub, setLocationHub] = useState('Nuwara Eliya Central Hub');
  const [isPreHarvest, setIsPreHarvest] = useState(false);
  const [organicCertified, setOrganicCertified] = useState(true);
  const [moistureContent, setMoistureContent] = useState('12% Fresh');
  const [minOrderQtyKg, setMinOrderQtyKg] = useState<number>(500);
  const [description, setDescription] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addListing({
      title: title || `${grade} ${cropType} (${locationDistrict})`,
      cropType,
      grade,
      quantityKg,
      pricePerKg,
      harvestDate,
      locationDistrict,
      locationHub,
      farmerName: 'Bandara Organic Farms',
      farmerNic: '781920394V',
      farmerPhone: '+94 77 123 4567',
      isPreHarvest,
      photos: ['https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&auto=format&fit=crop&q=80'],
      organicCertified,
      moistureContent,
      minOrderQtyKg,
      description: description || `Freshly harvested ${cropType} from ${locationDistrict}. Grade: ${grade}.`,
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-12">
      {/* Left Navigation Sidebar matching 4th mockup */}
      <aside className="w-full lg:w-64 bg-white border border-slate-200 rounded-2xl p-4 space-y-6 shadow-2xs shrink-0">
        <div className="flex items-center gap-2 px-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs">
            DC
          </div>
          <div>
            <span className="font-bold text-xs text-slate-900 block">Dambulla Central</span>
            <span className="text-[10px] text-slate-500">NIC Verified Enterprise</span>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('listings')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'listings' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'inbox' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Active Bids ({offers.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-600 hover:bg-slate-50"
          >
            <Boxes className="w-4 h-4" /> Inventory
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
              activeTab === 'payouts' ? 'bg-[#064e3b] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Payments
          </button>
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Post Produce Listing
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-2xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-500">Farmer Produce & Sales Overview</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add Listing
          </button>
        </div>

        {/* KPI Cards matching 4th mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Total Finalized Sales</span>
            <div className="text-2xl font-black text-[#064e3b]">Rs. 1,450,000</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18% vs last month
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Active Bids</span>
            <div className="text-2xl font-black text-amber-600">14</div>
            <span className="text-[11px] text-amber-600 font-semibold">3 pending counter-offers</span>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Upcoming Harvest</span>
            <div className="text-2xl font-black text-slate-900">4,500 kg</div>
            <span className="text-[11px] text-slate-500">Pre-harvest forward contracts</span>
          </div>
        </div>

        {/* Current Produce Inventory Table */}
        {activeTab === 'listings' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm">Produce Inventory Listings</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold">
                    <th className="p-3">Produce Item</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Volume</th>
                    <th className="p-3">Baseline Price</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <img src={item.photos[0]} alt={item.title} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{item.title}</span>
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-[#064e3b] font-bold px-2 py-0.5 rounded text-[10px]">
                          {item.grade}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-700">{item.quantityKg.toLocaleString()} Kg</td>
                      <td className="p-3 font-black text-[#064e3b]">LKR {item.pricePerKg}/kg</td>
                      <td className="p-3 text-slate-600">{item.locationDistrict}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Offers Inbox */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Negotiation Offers Inbox</h3>

            <div className="space-y-3">
              {offers.map((off) => (
                <div key={off.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-xs shadow-2xs">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-mono text-[#064e3b] font-bold">ID: {off.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{off.produceTitle}</h4>
                      <p className="text-slate-500">Buyer: {off.buyerName}</p>
                    </div>

                    <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      {off.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Requested Qty:</span>
                      <span className="font-bold text-slate-900">{off.targetQtyKg} Kg</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Offered Price:</span>
                      <span className="font-black text-[#064e3b]">LKR {off.offeredPricePerKg}/kg</span>
                    </div>
                  </div>

                  {off.status !== 'accepted' && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => respondToOffer(off.id, 'accept')}
                        className="bg-[#064e3b] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                      >
                        Accept Offer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Listing Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Add New Produce Listing</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Crop Variety</label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  >
                    <option value="Leeks">Leeks</option>
                    <option value="Carrots">Carrots</option>
                    <option value="Paddy">Paddy / Samba Rice</option>
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Green Chili">Green Chili</option>
                    <option value="Red Onion">Red Onion</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Quality Grade</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as QualityGrade)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  >
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Quantity (Kg)</label>
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Baseline Price/Kg (LKR)</label>
                  <input
                    type="number"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#064e3b] text-white font-bold px-4 py-2 rounded-xl shadow-2xs"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
