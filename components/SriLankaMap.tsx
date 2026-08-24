'use client';

import React, { useState } from 'react';
import { ProduceListing, ShipmentJob } from '@/lib/types';
import { MapPin, Navigation, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SriLankaMapProps {
  listings?: ProduceListing[];
  activeShipment?: ShipmentJob;
  onSelectListing?: (listing: ProduceListing) => void;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({ listings = [], activeShipment, onSelectListing }) => {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  // Sri Lanka District Map Hub Pins with coordinates for SVG rendering
  const hubs = [
    { name: 'Nuwara Eliya', x: 260, y: 340, produce: 'Leeks, Carrots, Potatoes', color: 'fill-emerald-500' },
    { name: 'Dambulla', x: 250, y: 240, produce: 'Tomatoes, Vegetables Hub', color: 'fill-amber-500' },
    { name: 'Badulla / Keppetipola', x: 300, y: 320, produce: 'Carrots, Beans, Beetroot', color: 'fill-teal-500' },
    { name: 'Polonnaruwa', x: 290, y: 200, produce: 'Keeri Samba Paddy', color: 'fill-yellow-500' },
    { name: 'Monaragala', x: 320, y: 380, produce: 'Green Chili, Maize', color: 'fill-orange-500' },
    { name: 'Jaffna', x: 170, y: 70, produce: 'Red Onions, Bananas', color: 'fill-indigo-500' },
    { name: 'Colombo / Pettah', x: 170, y: 370, produce: 'National Distribution Hub', color: 'fill-sky-500' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-800">
            <Navigation className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Sri Lanka Agri Grid & Logistics Map</h3>
            <p className="text-xs text-slate-400">Live produce availability pins & freight route checkpoints</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Farm Origins
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span>
            Commercial Hubs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Sri Lanka Map Visualizer */}
        <div className="lg:col-span-7 relative bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center min-h-[380px]">
          <svg viewBox="0 0 500 550" className="w-full h-auto max-h-[420px] drop-shadow-xl">
            <defs>
              <linearGradient id="slGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
              </linearGradient>

              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Stylized Sri Lanka Island Outline Path */}
            <path
              d="M 190 40 Q 230 40 260 80 Q 290 140 340 220 Q 380 300 350 400 Q 300 490 230 500 Q 150 480 120 400 Q 110 320 150 220 Q 170 120 190 40 Z"
              fill="url(#slGradient)"
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Active Logistics Route Overlay if shipment provided */}
            {activeShipment && (
              <g>
                {/* Nuwara Eliya -> Dambulla -> Colombo Path */}
                <path
                  d="M 300 320 Q 250 240 170 370"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Vehicle Marker */}
                <g transform="translate(235, 305)">
                  <circle r="14" fill="#0284c7" opacity="0.4" className="animate-ping" />
                  <circle r="10" fill="#0369a1" />
                  <text x="-6" y="4" fill="#ffffff" fontSize="10" fontWeight="bold">🚚</text>
                </g>
              </g>
            )}

            {/* Render Hub Pins */}
            {hubs.map((hub) => {
              const isSelected = selectedHub === hub.name;
              return (
                <g
                  key={hub.name}
                  transform={`translate(${hub.x}, ${hub.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedHub(hub.name)}
                >
                  <circle r="14" fill="url(#hubGlow)" className="group-hover:scale-125 transition-transform" />
                  <circle r="6" className={`${hub.color} stroke-slate-950 stroke-2`} />
                  
                  {/* Pin label */}
                  <text
                    x="12"
                    y="4"
                    fill="#e2e8f0"
                    fontSize="11"
                    fontWeight="bold"
                    className="font-sans drop-shadow-md group-hover:fill-emerald-400 transition-colors"
                  >
                    {hub.name}
                  </text>

                  {/* Tooltip on hover */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect x="10" y="-24" width="160" height="24" rx="4" fill="#0f172a" stroke="#334155" />
                    <text x="16" y="-8" fill="#a7f3d0" fontSize="10" fontWeight="medium">
                      {hub.produce}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Map Information Sidebar & Active Listings */}
        <div className="lg:col-span-5 space-y-4">
          {activeShipment ? (
            /* Active Freight Tracking Box */
            <div className="bg-slate-950 p-4 rounded-xl border border-sky-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 animate-bounce" /> Live Freight Shipment
                </span>
                <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800 font-mono">
                  {activeShipment.id}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">{activeShipment.produceTitle}</h4>
                <p className="text-xs text-slate-400">{activeShipment.haulerName} • {activeShipment.haulerVehicle}</p>
              </div>

              <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Current Position:</span>
                  <span className="font-semibold text-emerald-400">{activeShipment.currentLocationName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Destination:</span>
                  <span className="font-semibold">{activeShipment.destinationHub}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">ETA:</span>
                  <span className="font-bold text-amber-400">{activeShipment.estimatedArrival}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Regional Crop Overview Cards */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Regional Crop Listings
                </h4>
                <span className="text-xs text-emerald-400 font-medium">{listings.length} Active Stock Pins</span>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {listings.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectListing && onSelectListing(item)}
                    className="p-3 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-emerald-600/60 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-800">
                          {item.grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-500" /> {item.locationDistrict}
                        </span>
                        <span>• {item.quantityKg.toLocaleString()} Kg</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-amber-400">LKR {item.pricePerKg}</div>
                      <span className="text-[10px] text-slate-500">/Kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
