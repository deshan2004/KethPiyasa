'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { ShipmentJob } from '@/lib/types';
import { SriLankaMap } from '@/components/SriLankaMap';
import { QRScannerModal } from '@/components/QRScannerModal';
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
  ArrowRight
} from 'lucide-react';

export default function LogisticsPage() {
  const { shipments, updateShipmentStatus, verifyDeliveryQr, lang } = useApp();
  const t = getTranslation(lang);

  const [activeShipment, setActiveShipment] = useState<ShipmentJob | undefined>(shipments[0]);
  const [selectedQrShipment, setSelectedQrShipment] = useState<ShipmentJob | null>(null);

  const availableJobs = shipments.filter((s) => s.status === 'available');

  const handleAcceptJob = (shipmentId: string) => {
    updateShipmentStatus(shipmentId, 'in_transit', 'Dispatched from Hub');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner matching 2nd mockup */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-xs text-slate-500 font-mono font-bold block">SHIPMENT TRACKING</span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Tracking ID: {activeShipment ? activeShipment.id : 'TRK-5892-AB'}
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
          <UserCheck className="w-4 h-4 text-[#064e3b]" />
          <div>
            <span className="font-bold text-slate-900 block text-[11px]">Lanka Logistics Express</span>
            <span className="text-[10px] text-slate-500">Verified Hauler</span>
          </div>
        </div>
      </div>

      {/* 2-Column Logistics Layout matching 2nd mockup */}
      {activeShipment && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Shipment Details & Checkpoints */}
          <div className="lg:col-span-5 space-y-4">
            {/* ETA Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="bg-emerald-100 text-[#064e3b] font-bold text-xs px-2.5 py-1 rounded-md">
                  In-Transit
                </span>
                <span className="text-xs text-slate-500 font-semibold">ETA: {activeShipment.estimatedArrival}</span>
              </div>

              {/* Stepper matching mockup */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {activeShipment.checkpoints.map((cp, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        cp.status === 'completed'
                          ? 'bg-[#064e3b]'
                          : cp.status === 'current'
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-slate-300'
                      }`}
                    ></div>
                    <div className="flex-1 flex justify-between">
                      <span className="font-bold text-slate-800">{cp.name}</span>
                      <span className="text-slate-400 text-[10px]">{cp.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipment Details Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Shipment Details</h3>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#064e3b] text-white flex items-center justify-center font-bold">
                  🚚
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{activeShipment.driverName} (Driver)</span>
                  <span className="text-slate-500">Vehicle: {activeShipment.haulerVehicle}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cargo:</span>
                  <span className="font-bold text-slate-900">{activeShipment.produceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weight:</span>
                  <span className="font-bold text-[#064e3b]">{activeShipment.weightKg.toLocaleString()} Kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Freight Payout:</span>
                  <span className="font-extrabold text-amber-600">LKR {activeShipment.payoutLkr.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedQrShipment(activeShipment)}
                className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold py-2.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4 h-4" /> Delivery Verification (QR / Signature)
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
      <div className="space-y-3 pt-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#064e3b]" /> Available Freight Jobs Marketplace
        </h2>

        <div className="space-y-2">
          {availableJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs text-xs"
            >
              <div>
                <span className="font-bold text-slate-900 text-sm block">{job.produceTitle}</span>
                <span className="text-slate-500">
                  {job.originHub} → {job.destinationHub} • {job.weightKg} Kg
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-black text-amber-600 text-sm">LKR {job.payoutLkr.toLocaleString()}</span>
                <button
                  onClick={() => handleAcceptJob(job.id)}
                  className="bg-[#064e3b] text-white font-bold px-3 py-1.5 rounded-lg shadow-2xs"
                >
                  Accept Freight Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
