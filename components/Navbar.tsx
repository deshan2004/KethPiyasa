'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { getTranslation } from '@/lib/i18n';
import { UserRole, Language } from '@/lib/types';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Globe, 
  UserCheck, 
  TrendingUp,
  LogIn,
  LogOut,
  CheckCircle2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, lang, setLang } = useApp();
  const { user, logout } = useAuth();
  const t = getTranslation(lang);
  const pathname = usePathname();
  const router = useRouter();

  const roleConfigs: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'farmer', label: t.roleFarmer, icon: <Sprout className="w-3.5 h-3.5" />, color: 'bg-[#064e3b] text-white' },
    { role: 'buyer', label: t.roleBuyer, icon: <ShoppingBag className="w-3.5 h-3.5" />, color: 'bg-amber-600 text-white' },
    { role: 'logistics', label: t.roleLogistics, icon: <Truck className="w-3.5 h-3.5" />, color: 'bg-blue-600 text-white' },
    { role: 'admin', label: t.roleAdmin, icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-indigo-600 text-white' },
  ];

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    const route =
      newRole === 'farmer'
        ? '/farmer'
        : newRole === 'buyer'
        ? '/buyer'
        : newRole === 'logistics'
        ? '/logistics'
        : '/admin';
    router.push(route);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-1.5 px-4 sm:px-8 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="flex items-center gap-1 font-semibold text-[#064e3b]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct Farmer-to-Buyer B2B Platform
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">SE3106 Software Construction</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher Pill */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
            <span className="text-slate-500 font-medium px-2 hidden sm:inline">{t.roleLabel}</span>
            {roleConfigs.map((r) => {
              const isActive = role === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => handleRoleSwitch(r.role)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                    isActive ? r.color + ' shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md text-xs border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-[#064e3b]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#064e3b] flex items-center justify-center text-white shadow-sm">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">kethpiyasa</span>
            <span className="text-sm font-bold text-[#064e3b]">(KethPiyasa)</span>
          </div>
        </Link>

        {/* Role-Specific Portal Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/' ? 'bg-slate-100 text-[#064e3b]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {t.navMarketplace}
          </Link>
          <Link
            href="/farmer"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/farmer' ? 'bg-slate-100 text-[#064e3b]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-[#064e3b]" />
            {t.navFarmer}
          </Link>
          <Link
            href="/buyer"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/buyer' ? 'bg-slate-100 text-[#064e3b]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
            {t.navBuyer}
          </Link>
          <Link
            href="/logistics"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/logistics' ? 'bg-slate-100 text-[#064e3b]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            {t.navLogistics}
          </Link>
          <Link
            href="/admin"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/admin' ? 'bg-slate-100 text-[#064e3b]' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            {t.navAdmin}
          </Link>
        </nav>

        {/* User Identity & Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#064e3b]" />
                <div className="text-left">
                  <span className="font-bold text-slate-800 block text-[11px]">{user.name}</span>
                  <span className="text-[9px] text-[#064e3b] font-semibold uppercase">{user.role} • NIC Verified</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-all"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
