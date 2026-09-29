'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProduceListing, ShipmentJob } from '@/lib/types';
import { 
  MapPin, 
  Truck, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Globe
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
  lat: number;
  lng: number;
  type: 'origin' | 'hub' | 'market';
  produce: string;
  availableKg: number;
  priceLkr: number;
  emoji: string;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({ listings = [], activeShipment, onSelectListing }) => {
  const [selectedHubId, setSelectedHubId] = useState<string | null>('nuwara-eliya');
  const [mapStyle, setMapStyle] = useState<'vector' | 'satellite' | 'routes'>('vector');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);

  // Real GPS Coordinates for Sri Lanka Agricultural Hubs & Markets
  const hubs: MapHub[] = [
    { id: 'jaffna', name: 'Jaffna Agrarian Hub', district: 'Jaffna', lat: 9.6615, lng: 80.0255, type: 'origin', produce: 'Jaffna Red Onions & Bananas', availableKg: 12000, priceLkr: 280, emoji: '🧅' },
    { id: 'anuradhapura', name: 'Anuradhapura Grain Storage', district: 'Anuradhapura', lat: 8.3114, lng: 80.4037, type: 'origin', produce: 'Nadu & Samba Rice Paddy', availableKg: 45000, priceLkr: 140, emoji: '🌾' },
    { id: 'trincomalee', name: 'Trincomalee Eastern Hub', district: 'Trincomalee', lat: 8.5874, lng: 81.2152, type: 'hub', produce: 'Corn, Cassava & Groundnut', availableKg: 18000, priceLkr: 190, emoji: '🌽' },
    { id: 'polonnaruwa', name: 'Polonnaruwa Paddy Grid', district: 'Polonnaruwa', lat: 7.9403, lng: 81.0188, type: 'origin', produce: 'Keeri Samba Paddy', availableKg: 35000, priceLkr: 145, emoji: '🌾' },
    { id: 'dambulla', name: 'Dambulla Dedicated Economic Center', district: 'Dambulla', lat: 7.8731, lng: 80.6517, type: 'market', produce: 'National Vegetable Wholesale Center', availableKg: 85000, priceLkr: 110, emoji: '🏬' },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya Highlands', district: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891, type: 'origin', produce: 'Export Grade Leeks, Carrots & Potatoes', availableKg: 28000, priceLkr: 135, emoji: '🥕' },
    { id: 'keppetipola', name: 'Keppetipola Economic Center', district: 'Badulla', lat: 6.9022, lng: 80.9168, type: 'hub', produce: 'Beetroot, Cabbage & Beans', availableKg: 19500, priceLkr: 120, emoji: '🥬' },
    { id: 'monaragala', name: 'Monaragala Agri Zone', district: 'Monaragala', lat: 6.8726, lng: 81.3507, type: 'origin', produce: 'Green Chili & Maize', availableKg: 14000, priceLkr: 320, emoji: '🌶️' },
    { id: 'colombo', name: 'Pettah Wholesale & Manning Market', district: 'Colombo', lat: 6.9360, lng: 79.8530, type: 'market', produce: 'Commercial Distribution & B2B Escrow Center', availableKg: 120000, priceLkr: 150, emoji: '🏢' },
    { id: 'welisara', name: 'Welisara Logistics Hub', district: 'Gampaha', lat: 7.0080, lng: 79.8970, type: 'hub', produce: 'Refrigerated Cold Storage & Freight Logistics', availableKg: 50000, priceLkr: 0, emoji: '🚚' },
  ];

  const selectedHub = hubs.find((h) => h.id === selectedHubId) || hubs[5];

  // Tile layer URLs based on mapStyle mode (100% Free, No API Key Required)
  const getTileUrlAndAttribution = (style: 'vector' | 'satellite' | 'routes') => {
    switch (style) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri World Imagery &mdash; Source: Esri, Maxar, Earthstar Geographics'
        };
      case 'routes':
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        };
      case 'vector':
      default:
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        };
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let L: any;
    try {
      L = require('leaflet');
    } catch (e) {
      console.error('Leaflet failed to load:', e);
      return;
    }

    // Initialize Map centered on Sri Lanka
    const map = L.map(mapContainerRef.current, {
      center: [7.8731, 80.7718],
      zoom: 8,
      minZoom: 7,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    const { url, attribution } = getTileUrlAndAttribution(mapStyle);
    const initialTileLayer = L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
    tileLayerRef.current = initialTileLayer;

    // Add Attribution at bottom right
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when mapStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = require('leaflet');
    const { url, attribution } = getTileUrlAndAttribution(mapStyle);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const newTileLayer = L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [mapStyle]);

  // Render Markers and Freight Corridors Polylines
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const L = require('leaflet');

    // Clear existing markers & polylines
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    polylinesRef.current.forEach((p) => p.remove());
    polylinesRef.current = [];

    // Render Highway Freight Corridors (A9, A1/A5, Southern Expressway)
    const A9_Polyline = [[6.9360, 79.8530], [7.2906, 80.6337], [7.8731, 80.6517], [8.3114, 80.4037], [9.6615, 80.0255]];
    const A1_A5_Polyline = [[6.9360, 79.8530], [7.2906, 80.6337], [6.9497, 80.7891], [6.9022, 80.9168]];
    const Southern_Polyline = [[6.9360, 79.8530], [6.0535, 80.2210], [6.1241, 81.1185]];

    const polyOptions = {
      vector: { color: '#10b981', weight: 3, opacity: 0.6, dashArray: '6, 6' },
      satellite: { color: '#38bdf8', weight: 3, opacity: 0.8 },
      routes: { color: '#d97706', weight: 4, opacity: 0.9 },
    }[mapStyle];

    const poly1 = L.polyline(A9_Polyline, polyOptions).addTo(mapInstanceRef.current);
    const poly2 = L.polyline(A1_A5_Polyline, polyOptions).addTo(mapInstanceRef.current);
    const poly3 = L.polyline(Southern_Polyline, polyOptions).addTo(mapInstanceRef.current);

    polylinesRef.current.push(poly1, poly2, poly3);

    // Active Shipment Route
    if (activeShipment) {
      const activeRouteCoords = [[6.9497, 80.7891], [7.8731, 80.6517], [6.9360, 79.8530]];
      const activePoly = L.polyline(activeRouteCoords, {
        color: '#0284c7',
        weight: 5,
        opacity: 0.9,
        dashArray: '8, 8'
      }).addTo(mapInstanceRef.current);
      polylinesRef.current.push(activePoly);

      // Active Truck Marker
      const truckIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background:#0284c7; color:#fff; padding:6px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 12px rgba(2,132,199,0.8); font-size:14px;">🚚</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      const truckMarker = L.marker([7.4, 80.2], { icon: truckIcon }).addTo(mapInstanceRef.current);
      truckMarker.bindPopup(`<b>🚚 Active Shipment: ${activeShipment.id}</b><br/>${activeShipment.produceTitle}`);
      markersRef.current.push(truckMarker);
    }

    // Render Interactive Hub Pins
    hubs.forEach((hub) => {
      const isSelected = selectedHubId === hub.id;
      const markerColor = isSelected 
        ? '#059669' 
        : hub.type === 'market' 
          ? '#d97706' 
          : hub.type === 'hub' 
            ? '#0284c7' 
            : '#047857';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="background:${markerColor}; color:#fff; border:2px solid #ffffff; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-center; box-shadow:0 4px 10px rgba(0,0,0,0.5); font-size:16px; font-weight:bold; transition:all 0.2s;">
              <span style="margin:auto;">${hub.emoji}</span>
            </div>
            <div style="background:${isSelected ? '#064e3b' : '#0f172a'}; color:${isSelected ? '#ffffff' : '#cbd5e1'}; font-size:10px; font-weight:bold; padding:2px 8px; border-radius:6px; border:1px solid ${isSelected ? '#34d399' : '#334155'}; margin-top:2px; white-space:nowrap; box-shadow:0 2px 6px rgba(0,0,0,0.4);">
              ${hub.name.split(' ')[0]}
            </div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(mapInstanceRef.current);

      marker.on('click', () => {
        setSelectedHubId(hub.id);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([hub.lat, hub.lng]);
        }
      });

      markersRef.current.push(marker);
    });
  }, [mapStyle, selectedHubId, activeShipment]);

  // Zoom Handlers
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Top Google Maps Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-lg text-emerald-400">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">Sri Lanka Interactive Agri Map</h3>
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400 animate-spin" /> Live GIS OpenStreetMap
              </span>
            </div>
            <p className="text-xs text-slate-400">Real Interactive Map with Live Produce Pins, Highways & Logistics Checkpoints</p>
          </div>
        </div>

        {/* Map View Mode Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setMapStyle('vector')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              mapStyle === 'vector' ? 'bg-[#064e3b] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dark Vector</span>
          </button>
          <button
            onClick={() => setMapStyle('satellite')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              mapStyle === 'satellite' ? 'bg-sky-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Satellite Hybrid</span>
          </button>
          <button
            onClick={() => setMapStyle('routes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
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
        <div className="lg:col-span-8 relative rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-center min-h-[460px] sm:min-h-[520px] shadow-inner">
          
          {/* Leaflet Map Div Container */}
          <div ref={mapContainerRef} className="w-full h-full min-h-[460px] sm:min-h-[520px] z-0" />

          {/* Compass Rose Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-2 shadow-md pointer-events-none">
            <span className="text-emerald-400 font-mono">N 🧭 7.8731° N, 80.7718° E</span>
            <span className="text-slate-600">|</span>
            <span>Sri Lanka Grid</span>
          </div>

          {/* Floating Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
            <button
              onClick={handleZoomIn}
              className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Google Maps Interactive Information Panel (Right Side) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          
          {/* Selected Location Info Card */}
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

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide">Primary Produce Crop</span>
                  <span className="font-bold text-white text-sm block">{selectedHub.produce}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wide">Stock Volume</span>
                    <span className="font-extrabold text-emerald-400 text-xs">
                      {selectedHub.availableKg.toLocaleString()} Kg
                    </span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wide">Avg Market Rate</span>
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

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">Map Legend</span>
              <Info className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-full px-2 py-1"><span className="w-2 h-2 rounded-full bg-emerald-500 block" />Origin</span>
              <span className="inline-flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-full px-2 py-1"><span className="w-2 h-2 rounded-full bg-sky-500 block" />Hub</span>
              <span className="inline-flex items-center gap-1 bg-slate-950 border border-slate-700 rounded-full px-2 py-1"><span className="w-2 h-2 rounded-full bg-amber-500 block" />Wholesale</span>
            </div>
          </div>

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
