'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';

export const MarketPriceTicker: React.FC = () => {
  const { marketPrices, lang } = useApp();
  const t = getTranslation(lang);

  return (
    <div className="bg-[#064e3b] text-white py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs">
        {/* Label badge */}
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] bg-[#043e2f] px-2.5 py-1 rounded border border-emerald-700/60 whitespace-nowrap">
          <Building2 className="w-3.5 h-3.5 text-emerald-300" />
          <span>NATIONAL MARKET PRICES</span>
        </div>

        {/* Ticker Cards */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-0.5">
          {marketPrices.map((item) => {
            const cropNameTranslated =
              lang === 'si' ? item.cropNameSi : lang === 'ta' ? item.cropNameTa : item.cropName;

            const isUp = item.change24h > 0;
            const isDown = item.change24h < 0;

            return (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-[#043e2f]/80 px-3 py-1 rounded border border-emerald-700/50 text-emerald-50 min-w-max"
              >
                <span className="font-semibold text-white">{cropNameTranslated}</span>
                <span className="text-emerald-300/80 text-[10px]">({item.centerName})</span>
                <span className="font-extrabold text-amber-300">
                  LKR {item.avgPriceLkr} <span className="text-[9px] font-normal text-emerald-200">/{item.unit}</span>
                </span>
                <span className={`text-[10px] font-bold px-1 rounded ${isUp ? 'text-emerald-300' : isDown ? 'text-rose-300' : 'text-slate-300'}`}>
                  {item.change24h > 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
