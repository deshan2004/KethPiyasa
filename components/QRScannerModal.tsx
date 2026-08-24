'use client';

import React, { useState } from 'react';
import { ShipmentJob } from '@/lib/types';
import { QrCode, CheckCircle2, ShieldCheck, X, Camera, PenTool } from 'lucide-react';

interface QRScannerModalProps {
  shipment: ShipmentJob;
  onVerify: () => void;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ shipment, onVerify, onClose }) => {
  const [signatureName, setSignatureName] = useState('S. Wickramasinghe (Store Manager)');
  const [scanning, setScanning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleScanAndVerify = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setCompleted(true);
      setTimeout(() => {
        onVerify();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Delivery Verification & Signature</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-slate-200 text-xs">
          {completed ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-90 duration-300">
              <div className="w-16 h-16 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-700 shadow-xl shadow-emerald-950">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-base font-bold text-white">Delivery Confirmed!</h4>
              <p className="text-slate-400">
                QR signature verified successfully. Escrow funds have been released to the seller's bank account.
              </p>
              <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60 font-mono text-[11px] text-emerald-300">
                STATUS: ESCROW_FUNDS_RELEASED
              </div>
            </div>
          ) : (
            <>
              {/* Shipment Info */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <p className="font-bold text-white text-sm">{shipment.produceTitle}</p>
                <p className="text-slate-400">Hauler: {shipment.haulerName} • {shipment.driverName}</p>
                <p className="text-slate-400">Destination: {shipment.destinationHub}</p>
              </div>

              {/* QR Scanner Simulation Area */}
              <div className="bg-slate-950 p-6 rounded-xl border border-dashed border-emerald-600/50 text-center space-y-3 relative overflow-hidden">
                <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg relative">
                  <QrCode className="w-full h-full text-slate-950" />
                  {scanning && (
                    <div className="absolute inset-0 bg-emerald-500/20 border-b-2 border-emerald-400 animate-pulse"></div>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-200">Scan Receiver QR Code</p>
                  <p className="text-[11px] text-slate-400">Position camera over buyer's invoice QR code</p>
                </div>
              </div>

              {/* Digital Signature Confirmation */}
              <div className="space-y-1.5">
                <label className="text-slate-400 font-medium flex items-center gap-1">
                  <PenTool className="w-3.5 h-3.5 text-amber-400" /> Receiver Digital Signature / Name
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-emerald-500"
                  placeholder="Enter receiver name or NIC"
                />
              </div>

              <button
                onClick={handleScanAndVerify}
                disabled={scanning}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                {scanning ? (
                  <span>Verifying QR Signature...</span>
                ) : (
                  <>
                    <Camera className="w-4 h-4" /> Scan & Confirm Drop-Off
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
