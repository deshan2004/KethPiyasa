'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ShipmentJob } from '@/lib/types';
import { SriLankaMap } from '@/components/SriLankaMap';
import { QRScannerModal } from '@/components/QRScannerModal';
import { ProfileVerificationModal } from '@/components/ProfileVerificationModal';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  QrCode,
  Phone,
  Navigation,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  LogIn,
  UserPlus,
  DollarSign,
  TrendingUp,
  Package,
  Building2,
  Check,
  RefreshCw,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function LogisticsPage() {
  const { user } = useAuth();
  const { shipments, updateShipmentStatus, verifyDeliveryQr, lang } = useApp();
  const t = getTranslation(lang);

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(shipments[0]?.id || 'ship-901');
  const [selectedQrShipment, setSelectedQrShipment] = useState<ShipmentJob | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto border border-emerald-200 shadow-2xs">
          <Truck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Logistics Hub Authentication Required</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You must be logged in with a registered Freight Hauler account to accept transport jobs, track active routes, and execute QR delivery confirmations.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/login?role=logistics"
            className="w-full sm:w-auto bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Login as Logistics Partner
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> Register Hauler Account
          </Link>
        </div>
      </div>
    );
  }

  const activeShipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];
  const availableJobs = shipments.filter((s) => s.status === 'available');
  const activeInTransitShipments = shipments.filter((s) => s.status === 'in_transit' || s.status === 'assigned');

  const totalEarningsLkr = shipments.reduce((acc, s) => acc + (s.status === 'delivered' ? s.payoutLkr : s.payoutLkr * 0.8), 33000);

  const handleAcceptJob = (shipmentId: string) => {
    updateShipmentStatus(shipmentId, 'in_transit', 'Dispatched from Hub');
    setSelectedShipmentId(shipmentId);
  };

  const handleAdvanceCheckpoint = (shipment: ShipmentJob) => {
    const nextCheckpoint = shipment.checkpoints.find(cp => cp.status === 'pending');
    if (nextCheckpoint) {
      updateShipmentStatus(shipment.id, 'in_transit', nextCheckpoint.name);
    } else {
      updateShipmentStatus(shipment.id, 'delivered', 'Arrived at Destination Hub');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-xs text-slate-500 font-mono font-bold block">FREIGHT LOGISTICS & FLEET MANAGEMENT</span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Agricultural Freight Dispatch Operations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage haulage jobs, update checkpoints, and execute QR delivery handovers</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs">
            <UserCheck className="w-4 h-4 text-[#064e3b]" />
            <div>
              <span className="font-bold text-slate-900 block text-[11px]">Lanka Logistics Express</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Verified Hauler Partner</span>
            </div>
          </div>

          <button
            onClick={() => setShowVerificationModal(true)}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer"
          >
            Fleet Info
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Total Freight Earnings</span>
          <div className="text-2xl font-black text-[#064e3b]">LKR {totalEarningsLkr.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Direct Escrow Payouts
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Active In-Transit Jobs</span>
          <div className="text-2xl font-black text-amber-600">{activeInTransitShipments.length}</div>
          <span className="text-[11px] text-amber-600 font-semibold">Active cargo dispatches</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-1 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium block">Available Market Jobs</span>
          <div className="text-2xl font-black text-slate-900">{availableJobs.length}</div>
          <span className="text-[11px] text-slate-500">Ready for hauler acceptance</span>
        </div>
      </div>

      {/* Active Shipment Selector Pills */}
      {activeInTransitShipments.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Active Trucks:</span>
          {activeInTransitShipments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedShipmentId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedShipmentId === s.id
                  ? 'bg-[#064e3b] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{s.id} ({s.produceTitle.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      )}

      {/* 2-Column Logistics Layout */}
      {activeShipment && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Shipment Details & Stepper */}
          <div className="lg:col-span-5 space-y-4">
            {/* ETA & Checkpoint Progress Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-[#064e3b] font-bold text-[11px] block">{activeShipment.id}</span>
                  <h3 className="font-extrabold text-slate-900 text-base">{activeShipment.produceTitle}</h3>
                </div>
                <span className="bg-emerald-100 text-[#064e3b] font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {activeShipment.status.replace('_', ' ')}
                </span>
              </div>

              {/* Stepper */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-500 font-semibold">
                  <span>Route Checkpoint Progress</span>
                  <span className="font-mono text-emerald-700">ETA: {activeShipment.estimatedArrival}</span>
                </div>

                <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {activeShipment.checkpoints.map((cp, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                          cp.status === 'completed'
                            ? 'bg-[#064e3b] text-white'
                            : cp.status === 'current'
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-slate-300'
                        }`}
                      >
                        {cp.status === 'completed' && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className={`font-bold ${cp.status === 'current' ? 'text-amber-900' : 'text-slate-800'}`}>
                          {cp.name}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{cp.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advance Checkpoint Button */}
                {activeShipment.status !== 'delivered' && (
                  <button
                    onClick={() => handleAdvanceCheckpoint(activeShipment)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Update Next Checkpoint Status
                  </button>
                )}
              </div>
            </div>

            {/* Shipment Details Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Haulier & Driver Profile</h3>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-black text-lg shadow-2xs">
                  🚚
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block">{activeShipment.driverName} (Driver)</span>
                  <span className="text-slate-500 font-medium">Vehicle: {activeShipment.haulerVehicle}</span>
                </div>
              </div>

              <div className="space-y-2 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Origin Loading:</span>
                  <span className="font-bold text-slate-900">{activeShipment.originHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Destination Drop:</span>
                  <span className="font-bold text-slate-900">{activeShipment.destinationHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cargo Weight:</span>
                  <span className="font-bold text-[#064e3b]">{activeShipment.weightKg.toLocaleString()} Kg</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-500 font-semibold">Freight Payout:</span>
                  <span className="font-black text-amber-600 text-sm">LKR {activeShipment.payoutLkr.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedQrShipment(activeShipment)}
                className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold py-2.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <QrCode className="w-4 h-4" /> Execute Delivery Verification (QR / Signature)
              </button>
            </div>
          </div>

          {/* Right Column: Route Map */}
          <div className="lg:col-span-7">
            <SriLankaMap activeShipment={activeShipment} />
          </div>
        </div>
      )}

      {/* Available Jobs Marketplace */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#064e3b]" /> Available Agricultural Freight Jobs Marketplace
            </h2>
            <p className="text-xs text-slate-500">Accept outgoing produce shipments from regional economic hubs</p>
          </div>
          <span className="text-xs font-bold text-slate-500">{availableJobs.length} Jobs Available</span>
        </div>

        <div className="space-y-3">
          {availableJobs.length > 0 ? (
            availableJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 transition-all text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#064e3b] font-bold">JOB ID: {job.id}</span>
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      READY FOR LOADING
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-sm block">{job.produceTitle}</span>
                  <span className="text-slate-600 font-medium">
                    Route: <span className="font-bold text-slate-900">{job.originHub} → {job.destinationHub}</span> • Weight: <span className="font-bold text-slate-900">{job.weightKg.toLocaleString()} Kg</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Freight Payout</span>
                    <span className="font-black text-amber-600 text-base">LKR {job.payoutLkr.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleAcceptJob(job.id)}
                    className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-2 rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-1"
                  >
                    Accept Freight Job <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">All Freight Jobs Assigned</p>
              <p className="text-xs text-slate-500">Check back shortly as farmers and buyers generate new B2B shipments.</p>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />

      {/* QR Modal */}
      {selectedQrShipment && (
        <QRScannerModal
          shipment={selectedQrShipment}
          onVerify={() => {
            verifyDeliveryQr(selectedQrShipment.id);
            setSelectedQrShipment(null);
          }}
          onClose={() => setSelectedQrShipment(null)}
        />
      )}
    </div>
  );
}
