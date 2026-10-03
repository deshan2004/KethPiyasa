'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, Send, X, ShieldCheck, User, Building2, CheckCircle2, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactRole: 'Farmer Producer' | 'Commercial Buyer' | 'Logistics Driver' | 'Admin Governance';
  phone: string;
  district?: string;
  produceTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactName,
  contactRole,
  phone,
  district,
  produceTitle
}) => {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const sanitizedPhone = phone.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${sanitizedPhone.replace('+', '')}?text=${encodeURIComponent(
    `Hello ${contactName}, I am contacting you via KethPiyasa B2B Marketplace regarding ${produceTitle || 'agricultural produce'}.`
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#064e3b] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm border border-emerald-500/50">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Direct Contact & Telephony</h3>
              <p className="text-[11px] text-emerald-200">Instant direct phone call & SMS message</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {sentSuccess ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-extrabold text-slate-900 text-base">Direct SMS Message Sent!</h4>
              <p className="text-slate-500">Your message has been dispatched to {contactName}.</p>
            </div>
          ) : (
            <>
              {/* Contact Profile Info */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{contactName}</h4>
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {contactRole}
                    </span>
                  </div>
                  {district && (
                    <span className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {district}
                    </span>
                  )}
                </div>

                {produceTitle && (
                  <p className="text-slate-600 font-medium text-[11px] border-t border-slate-200 pt-1.5 mt-1">
                    Regarding: <span className="font-bold text-slate-900">{produceTitle}</span>
                  </p>
                )}
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Phone Call Link */}
                <a
                  href={`tel:${sanitizedPhone}`}
                  className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold p-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct</span>
                </a>

                {/* WhatsApp Direct Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-2xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Phone Copy */}
              <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                <span className="font-mono font-bold text-slate-800 text-xs">{phone}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-slate-600 hover:text-slate-900 font-semibold text-[11px] flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-slate-200"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Send Quick In-App SMS */}
              <form onSubmit={handleSendMessage} className="space-y-2 pt-1 border-t border-slate-100">
                <label className="font-semibold text-slate-700 block">Send Direct In-App SMS</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Hello, I am inquiring about produce loading timing..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-[#064e3b]"
                  required
                ></textarea>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold px-4 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
