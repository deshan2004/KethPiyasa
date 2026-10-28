'use client';

import React, { useEffect, useState } from 'react';
import { EscrowContract } from '@/lib/types';
import { QRCodeSVG } from 'qrcode.react';
import { FileText, Printer, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface InvoiceModalProps {
  contract: EscrowContract;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ contract, onClose }) => {
  const [isQrEnlarged, setIsQrEnlarged] = useState(false);

  useEffect(() => {
    if (!isQrEnlarged) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsQrEnlarged(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQrEnlarged]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">B2B Digital Escrow Invoice</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 md:p-8 space-y-6 text-slate-200 font-sans" id="printable-invoice">
          {/* Company Branding & Invoice Meta */}
          <div className="flex flex-wrap justify-between items-start border-b border-slate-800 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">🌾 KethPiyasa</span>
                <span className="text-xs bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800">
                  B2B Official
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Direct Farmer-to-Buyer B2B Marketplace Platform</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">VAT Reg: LK-892019482-B2B</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">OFFICIAL TAX INVOICE</span>
              <h2 className="text-xl font-extrabold text-amber-400 font-mono mt-1">{contract.invoiceNumber}</h2>
              <p className="text-xs text-slate-400 font-medium">Issue Date: {contract.depositDate}</p>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-800 mt-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Escrow Funds Deposited
              </span>
            </div>
          </div>

          {/* Seller vs Buyer Details */}
          <div className="grid grid-cols-2 gap-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 uppercase font-bold tracking-wider block mb-1">PRODUCE SELLER (FARMER)</span>
              <p className="font-bold text-white text-sm">{contract.farmerName}</p>
              <p className="text-slate-400 mt-0.5">NIC Verified Farmer Producer</p>
              <p className="text-slate-400">Agricultural Supply Zone, Sri Lanka</p>
            </div>

            <div>
              <span className="text-slate-500 uppercase font-bold tracking-wider block mb-1">COMMERCIAL BUYER</span>
              <p className="font-bold text-white text-sm">{contract.buyerName}</p>
              <p className="text-slate-400 mt-0.5">{contract.buyerCompany}</p>
              <p className="text-slate-400">{contract.deliveryAddress}</p>
            </div>
          </div>

          {/* Itemized Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-right">Quantity</th>
                  <th className="py-2.5 px-3 text-right">Unit Price (LKR)</th>
                  <th className="py-2.5 px-3 text-right">Subtotal (LKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">{contract.produceTitle}</span>
                    <span className="text-[11px] text-slate-400">Direct Farm Produce Order</span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium">{contract.quantityKg.toLocaleString()} Kg</td>
                  <td className="py-3 px-3 text-right font-medium">LKR {contract.agreedPricePerKg}</td>
                  <td className="py-3 px-3 text-right font-bold text-white">LKR {contract.produceAmountLkr.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown & Escrow Barcode QR */}
          <div className="flex flex-wrap items-center justify-between border-t border-slate-800 pt-4 gap-6">
            {/* QR Code Verification Box */}
            <button
              type="button"
              onClick={() => setIsQrEnlarged(true)}
              aria-label="Open QR verification code"
              aria-haspopup="dialog"
              aria-expanded={isQrEnlarged}
              className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-left transition-colors hover:border-emerald-500/60 hover:bg-slate-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shadow-inner">
                <QRCodeSVG
                  value={contract.qrVerificationCode}
                  size={56}
                  level="M"
                  marginSize={4}
                  title="QR verification code"
                />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> QR Verification Code
                </p>
                <p className="font-mono text-[11px] text-slate-400 mt-0.5">{contract.qrVerificationCode}</p>
                <p className="text-[10px] text-slate-500 mt-1">Scan upon transport drop-off for payment release</p>
                <p className="text-[10px] text-emerald-400 mt-1">Click to enlarge</p>
              </div>
            </button>

            {/* Calculations */}
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Produce Subtotal:</span>
                <span>LKR {contract.produceAmountLkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Platform Escrow Fee (1.5%):</span>
                <span>LKR {contract.escrowFeeLkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Freight & Delivery:</span>
                <span>LKR {contract.transportFeeLkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-white pt-2 border-t border-slate-800">
                <span>Total Amount Paid:</span>
                <span className="text-amber-400">LKR {contract.totalPaidLkr.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 text-center text-xs text-slate-400">
          This digital invoice is cryptographically secured by KethPiyasa Escrow Guarantee Engine.
        </div>
      </div>

      {isQrEnlarged && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="QR verification code"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsQrEnlarged(false);
          }}
        >
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setIsQrEnlarged(false)}
              aria-label="Close enlarged QR code"
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-sm font-bold text-white">QR Verification Code</p>
            <p className="mt-1 text-xs text-slate-400">Scan to verify this escrow invoice</p>
            <div className="mx-auto mt-5 w-fit rounded-2xl bg-white p-3 shadow-lg shadow-black/20">
              <QRCodeSVG
                value={contract.qrVerificationCode}
                size={240}
                level="M"
                marginSize={4}
                title="Enlarged QR verification code"
              />
            </div>
            <p className="mt-4 break-all font-mono text-xs text-slate-300">{contract.qrVerificationCode}</p>
            <p className="mt-2 text-[11px] text-slate-500">Press Esc or click outside to close</p>
          </div>
        </div>
      )}
    </div>
  );
};
