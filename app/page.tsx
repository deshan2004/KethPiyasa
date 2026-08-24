'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { SriLankaMap } from '@/components/SriLankaMap';
import { ProduceListing } from '@/lib/types';
import { 
  Sprout, 
  ShoppingBag, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  TrendingUp,
  Building2
} from 'lucide-react';

export default function HomePage() {
  const { listings, setRole, lang, marketPrices } = useApp();
  const t = getTranslation(lang);
  const [selectedListing, setSelectedListing] = useState<ProduceListing | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pre_harvest' | 'immediate'>('all');

  const filteredListings = listings.filter((item) => {
    if (activeTab === 'pre_harvest') return item.isPreHarvest;
    if (activeTab === 'immediate') return !item.isPreHarvest;
    return true;
  });

  return (
    <div className="space-y-12 pb-12 bg-slate-50">
      {/* Hero Section matching 3rd mockup */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm text-center">
        <div className="p-8 sm:p-14 md:p-20 max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Direct Farmer-to-Buyer B2B Marketplace
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Eliminate multi-tier broker involvement, book advance harvests, trade with escrow security, and lower Sri Lanka post-harvest losses across the agricultural sector.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/buyer"
              onClick={() => setRole('buyer')}
              className="flex items-center gap-2 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Enter Marketplace</span>
            </Link>

            <Link
              href="/farmer"
              onClick={() => setRole('farmer')}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm px-6 py-3 rounded-xl border border-slate-300 shadow-2xs transition-all"
            >
              <Sprout className="w-4 h-4 text-[#064e3b]" />
              <span>Post Harvest List</span>
            </Link>
          </div>
        </div>

        {/* Hero Bottom National Ticker Bar matching mockup */}
        <div className="bg-[#064e3b] text-white py-2.5 px-6 flex items-center justify-between text-xs font-semibold overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="uppercase text-[11px] font-bold text-emerald-200">NATIONAL MARKET PRICES</span>
            <span className="text-emerald-300">|</span>
            <span className="text-white">Dambulla Central Market Prices</span>
          </div>

          <div className="flex items-center gap-6">
            {marketPrices.slice(0, 3).map((mp) => (
              <span key={mp.id} className="whitespace-nowrap">
                {mp.cropName}: <strong className="text-amber-300">LKR {mp.avgPriceLkr}/Kg</strong> ({mp.change24h > 0 ? `+${mp.change24h}%` : `${mp.change24h}%`})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section: Enterprise Infrastructure for Agriculture */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enterprise Infrastructure for Agriculture</h2>
          <p className="text-sm text-slate-500">Transforming Sri Lanka's agricultural supply chain with digital transparency</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-3 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Intermediary-Free Trade</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct connections between commercial buyers and smallholder farmers, ensuring baseline farm-gate pricing covers production costs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-3 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-xl bg-[#ecfdf5] text-[#064e3b] flex items-center justify-center mx-auto border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Escrow Security</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Institutional-grade escrow holding protection releases buyer deposits to farmers only upon verified produce delivery and quality inspection.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl space-y-3 shadow-2xs text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Advanced Harvest Booking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Secure forward contracts for pre-harvest crops 2-6 weeks ahead, locking in supply and fair commercial pre-harvest rates.
            </p>
          </div>
        </div>
      </section>

      {/* Sri Lanka Distribution Map */}
      <section className="space-y-4">
        <SriLankaMap listings={listings} onSelectListing={(l) => setSelectedListing(l)} />
      </section>

      {/* Active Wholesale Listings */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Active Wholesale Produce Listings</h2>
            <p className="text-xs text-slate-500">Directly sourced from verified farmers across Sri Lankan agricultural hubs</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#064e3b] text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveTab('pre_harvest')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'pre_harvest' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pre-Harvest Forward Contracts
            </button>
            <button
              onClick={() => setActiveTab('immediate')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'immediate' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ready Stock
            </button>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-[#064e3b] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.photos[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-[#064e3b] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs">
                    {item.grade}
                  </span>
                  {item.isPreHarvest && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-2xs">
                      Pre-Harvest
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-slate-800 border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-[#064e3b]" /> {item.locationDistrict}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded text-[#064e3b] font-bold border border-slate-200">
                    {item.quantityKg.toLocaleString()} Kg
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#064e3b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                  <div className="text-xs text-slate-600 space-y-1 pt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Producer:</span>
                      <span className="font-semibold text-slate-800">{item.farmerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ready Date:</span>
                      <span className="font-semibold text-slate-800">{item.harvestDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Baseline Price</span>
                    <span className="text-lg font-extrabold text-[#064e3b]">LKR {item.pricePerKg}</span>
                    <span className="text-[10px] text-slate-500">/Kg</span>
                  </div>

                  <Link
                    href="/buyer"
                    onClick={() => setRole('buyer')}
                    className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-2xs transition-all flex items-center gap-1"
                  >
                    <span>{t.requestQuote}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
