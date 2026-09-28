'use client';

import React, { useState } from 'react';
import { ProduceListing, ShipmentJob } from '@/lib/types';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface SriLankaMapProps {
  listings?: ProduceListing[];
  activeShipment?: ShipmentJob;
  onSelectListing?: (listing: ProduceListing) => void;
}

interface MapHub {
  id: string;
  name: string;
  district: string;
  x: number;
  y: number;
  type: 'origin' | 'hub' | 'market';
  produce: string;
  availableKg: number;
  priceLkr: number;
  emoji: string;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({ listings = [], activeShipment, onSelectListing }) => {
  const [selectedHubId, setSelectedHubId] = useState<string | null>('nuwara-eliya');
  const [mapStyle, setMapStyle] = useState<'vector' | 'satellite' | 'routes'>('vector');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Accurate Google Maps Style Coordinate Pins for Sri Lanka Agricultural Hubs
  const hubs: MapHub[] = [
    { id: 'jaffna', name: 'Jaffna Agrarian Hub', district: 'Jaffna', x: 210, y: 70, type: 'origin', produce: 'Jaffna Red Onions & Bananas', availableKg: 12000, priceLkr: 280, emoji: '🧅' },
    { id: 'anuradhapura', name: 'Anuradhapura Grain Storage', district: 'Anuradhapura', x: 225, y: 180, type: 'origin', produce: 'Nadu & Samba Rice Paddy', availableKg: 45000, priceLkr: 140, emoji: '🌾' },
    { id: 'trincomalee', name: 'Trincomalee Eastern Hub', district: 'Trincomalee', x: 330, y: 175, type: 'hub', produce: 'Corn, Cassava & Groundnut', availableKg: 18000, priceLkr: 190, emoji: '🌽' },
    { id: 'polonnaruwa', name: 'Polonnaruwa Paddy Grid', district: 'Polonnaruwa', x: 300, y: 225, type: 'origin', produce: 'Keeri Samba Paddy', availableKg: 35000, priceLkr: 145, emoji: '🌾' },
    { id: 'dambulla', name: 'Dambulla Dedicated Economic Center', district: 'Dambulla', x: 245, y: 245, type: 'market', produce: 'National Vegetable Wholesale Center', availableKg: 85000, priceLkr: 110, emoji: '🏬' },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya Highlands', district: 'Nuwara Eliya', x: 255, y: 355, type: 'origin', produce: 'Export Grade Leeks, Carrots & Potatoes', availableKg: 28000, priceLkr: 135, emoji: '🥕' },
    { id: 'keppetipola', name: 'Keppetipola Economic Center', district: 'Badulla', x: 295, y: 350, type: 'hub', produce: 'Beetroot, Cabbage & Beans', availableKg: 19500, priceLkr: 120, emoji: '🥬' },
    { id: 'monaragala', name: 'Monaragala Agri Zone', district: 'Monaragala', x: 330, y: 405, type: 'origin', produce: 'Green Chili & Maize', availableKg: 14000, priceLkr: 320, emoji: '🌶️' },
    { id: 'colombo', name: 'Pettah Wholesale & Manning Market', district: 'Colombo', x: 155, y: 380, type: 'market', produce: 'Commercial Distribution & B2B Escrow Center', availableKg: 120000, priceLkr: 150, emoji: '🏢' },
    { id: 'welisara', name: 'Welisara Logistics Hub', district: 'Gampaha', x: 160, y: 360, type: 'hub', produce: 'Refrigerated Cold Storage & Freight Logistics', availableKg: 50000, priceLkr: 0, emoji: '🚚' },
  ];

  const selectedHub = hubs.find((h) => h.id === selectedHubId) || hubs[5];

  // Highway Polyline Path Coordinates (Google Maps style highways)
  const A9_Highway = "M 155 380 L 195 290 L 245 245 L 225 180 L 210 70"; // A9 Colombo -> Dambulla -> Anuradhapura -> Jaffna
  const A1_A5_Highway = "M 155 380 L 245 320 L 255 355 L 295 350"; // A1/A5 Colombo -> Kandy -> Nuwara Eliya -> Keppetipola
  const Southern_Expressway = "M 155 380 L 175 470 L 220 500 L 295 475"; // E01 Colombo -> Galle -> Hambantota

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Top Google Maps Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-lg text-emerald-400">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">Sri Lanka Agri Grid & Logistics Map</h3>
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live GPS Vector
              </span>
            </div>
            <p className="text-xs text-slate-400">Interactive Produce Stock Pins, Highway Networks & Real-time Freight Checkpoints</p>
          </div>
        </div>

        {/* Map View Mode Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMapStyle('vector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              mapStyle === 'vector' ? 'bg-[#064e3b] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dark Vector</span>
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              mapStyle === 'satellite' ? 'bg-sky-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Satellite Hybrid</span>
          </button>
          <button
            onClick={() => setMapStyle('routes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              mapStyle === 'routes' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Freight Corridors</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Map Viewport */}
        <div className="lg:col-span-8 relative bg-[#0a1120] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-center min-h-[460px] sm:min-h-[520px] shadow-inner">
          
          {/* Map Grid Pattern / Water Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: mapStyle === 'satellite'
                ? 'radial-gradient(#1e293b 1px, transparent 1px)'
                : 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />

          {/* Compass Rose & Scale Indicator overlay */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-2 shadow-md">
            <span className="text-emerald-400 font-mono">N 🧭 7.8731° N, 80.7718° E</span>
            <span className="text-slate-600">|</span>
            <span>Scale: 1 : 50 km</span>
          </div>

          {/* Map Zoom Floating Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center shadow-md active:scale-95 transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
              className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center shadow-md active:scale-95 transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Detailed Vector Map */}
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <svg
              viewBox="0 0 500 560"
              className="w-full h-auto max-h-[500px] transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Land Terrain Gradient */}
                <linearGradient id="sriLankaTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={mapStyle === 'satellite' ? '#142338' : '#0c221a'} />
                  <stop offset="50%" stopColor={mapStyle === 'satellite' ? '#0f1d30' : '#063628'} />
                  <stop offset="100%" stopColor={mapStyle === 'satellite' ? '#1e293b' : '#04271d'} />
                </linearGradient>

                {/* Ocean Coastline Glow Filter */}
                <filter id="coastGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Pin Pulse Glow */}
                <radialGradient id="pinPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Indian Ocean Backdrop Water Effect */}
              <path
                d="M 0 0 L 500 0 L 500 560 L 0 560 Z"
                fill={mapStyle === 'satellite' ? '#060d19' : '#050c18'}
              />

              {/* Realistic Sri Lanka Island Vector Polygon Contour */}
              <g filter="url(#coastGlow)">
                {/* Outer Glow Halo */}
                <path
                  d="M 215,35 C 225,40 235,50 235,65 C 235,75 220,80 205,85 C 195,88 185,82 175,80 C 165,85 155,100 155,115 C 165,135 150,180 145,230 C 140,260 135,300 140,340 C 145,370 148,390 155,410 C 160,430 165,450 170,470 C 175,490 185,510 205,520 C 225,530 250,525 275,510 C 305,490 335,470 355,445 C 375,420 380,390 375,360 C 370,330 365,300 365,270 C 365,240 375,220 375,195 C 375,175 355,160 340,150 C 325,140 305,135 295,120 C 285,105 270,85 255,70 C 240,55 225,45 215,35 Z"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeOpacity="0.25"
                />

                {/* Main Island Landmass */}
                <path
                  d="M 215,35 C 225,40 235,50 235,65 C 235,75 220,80 205,85 C 195,88 185,82 175,80 C 165,85 155,100 155,115 C 165,135 150,180 145,230 C 140,260 135,300 140,340 C 145,370 148,390 155,410 C 160,430 165,450 170,470 C 175,490 185,510 205,520 C 225,530 250,525 275,510 C 305,490 335,470 355,445 C 375,420 380,390 375,360 C 370,330 365,300 365,270 C 365,240 375,220 375,195 C 375,175 355,160 340,150 C 325,140 305,135 295,120 C 285,105 270,85 255,70 C 240,55 225,45 215,35 Z"
                  fill="url(#sriLankaTerrain)"
                  stroke="#059669"
                  strokeWidth="2"
                />
              </g>

              {/* National Major Highways (Google Maps Arterial Roads) */}
              <g strokeLinecap="round" opacity={mapStyle === 'satellite' ? 0.7 : 0.85}>
                {/* A9 Highway */}
                <path d={A9_Highway} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="5 3" />
                {/* A1 / A5 Highlands Highway */}
                <path d={A1_A5_Highway} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                {/* E01 Southern Expressway */}
                <path d={Southern_Expressway} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 2" />
              </g>

              {/* Live Active Shipment Truck Route Overlay */}
              {activeShipment && (
                <g>
                  <path
                    d="M 255 355 L 245 245 L 160 360"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                  {/* Moving Cargo Truck Marker */}
                  <g transform="translate(202, 302)">
                    <circle r="16" fill="#0284c7" opacity="0.4" className="animate-ping" />
                    <circle r="12" fill="#0369a1" stroke="#ffffff" strokeWidth="2" />
                    <text x="-6" y="4" fill="#ffffff" fontSize="11" fontWeight="bold">🚚</text>
                  </g>
                </g>
              )}

              {/* Render Google Maps Style Pin Markers */}
              {hubs.map((hub) => {
                const isSelected = selectedHubId === hub.id;
                return (
                  <g
                    key={hub.id}
                    transform={`translate(${hub.x}, ${hub.y})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedHubId(hub.id)}
                  >
                    {/* Pulsing Radar Ring */}
                    <circle
                      r={isSelected ? 18 : 12}
                      fill="url(#pinPulse)"
                      className="transition-all duration-300 group-hover:scale-150"
                    />

                    {/* Google Maps Style Teardrop Marker Pin */}
                    <g transform="translate(0, -14)">
                      <path
                        d="M 0,-14 C -8,-14 -14,-8 -14,0 C -14,10 0,22 0,22 C 0,22 14,10 14,0 C 14,-8 8,-14 0,-14 Z"
                        fill={isSelected ? '#059669' : hub.type === 'market' ? '#d97706' : hub.type === 'hub' ? '#0284c7' : '#047857'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="drop-shadow-md transition-transform group-hover:scale-110"
                      />
                      <text x="0" y="-1" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {hub.emoji}
                      </text>
                    </g>

                    {/* Map Pin City Name Tag */}
                    <rect
                      x="-40"
                      y="12"
                      width="80"
                      height="16"
                      rx="4"
                      fill={isSelected ? '#064e3b' : '#0f172a'}
                      stroke={isSelected ? '#34d399' : '#334155'}
                      strokeWidth="1"
                      className="shadow-md"
                    />
                    <text
                      x="0"
                      y="23"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="9"
                      fontWeight="bold"
                      className="font-sans"
                    >
                      {hub.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Google Maps Watermark Logo */}
            <div className="absolute bottom-3 left-4 z-10 text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
              <span className="font-extrabold text-emerald-400">KethPiyasa GIS</span>
              <span>• Powered by Sri Lanka Agrarian Grid</span>
            </div>
          </div>
        </div>

        {/* Google Maps Interactive Information Panel (Right Side) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          
          {/* Selected Location Info Card (Google Maps Inspector Box) */}
          {selectedHub && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center text-xl shadow-md border border-emerald-500/50">
                    {selectedHub.emoji}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base leading-snug">{selectedHub.name}</h4>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {selectedHub.district} District
                    </span>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {selectedHub.type}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Primary Produce Crop:</span>
                  <span className="font-bold text-white text-sm block">{selectedHub.produce}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Stock Volume</span>
                    <span className="font-extrabold text-emerald-400 text-xs">
                      {selectedHub.availableKg.toLocaleString()} Kg
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Avg Market Rate</span>
                    <span className="font-extrabold text-amber-400 text-xs">
                      {selectedHub.priceLkr > 0 ? `LKR ${selectedHub.priceLkr}/Kg` : 'Logistics Hub'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const matchingListing = listings.find((l) => l.locationDistrict.toLowerCase().includes(selectedHub.district.toLowerCase()));
                  if (matchingListing && onSelectListing) {
                    onSelectListing(matchingListing);
                  }
                }}
                className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-98"
              >
                <span>Filter Listings for {selectedHub.district}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Active Logistics Route Status or Quick Stats */}
          {activeShipment ? (
            <div className="bg-sky-950/80 border border-sky-800 p-4 rounded-2xl space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 animate-bounce" /> Active Freight Dispatch
                </span>
                <span className="text-[10px] bg-sky-900 text-sky-200 px-2 py-0.5 rounded font-mono font-bold">
                  {activeShipment.id}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <span className="font-bold text-white block">{activeShipment.produceTitle}</span>
                <span className="text-slate-300 block">{activeShipment.haulerName} ({activeShipment.haulerVehicle})</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl text-xs space-y-1 text-slate-300 border border-sky-900/60">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Checkpoint:</span>
                  <span className="font-bold text-emerald-400">{activeShipment.currentLocationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Hub:</span>
                  <span className="font-bold text-white">{activeShipment.destinationHub}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Agricultural Grid</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Real-time GIS pins connect Nuwara Eliya, Dambulla, Keppetipola, and Colombo markets with zero broker markup.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
