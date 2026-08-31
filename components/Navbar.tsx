'use client';

import React, { useState } from 'react';
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
  LogIn, 
  LogOut, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Store
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, lang, setLang } = useApp();
  const { user, logout } = useAuth();
  const t = getTranslation(lang);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleConfigs: { role: UserRole; label: string; icon: React.ReactNode; color: string; activeBg: string }[] = [
    { role: 'farmer', label: t.roleFarmer, icon: <Sprout className="w-3.5 h-3.5" />, color: 'text-emerald-700', activeBg: 'bg-[#064e3b] text-white shadow-sm' },
    { role: 'buyer', label: t.roleBuyer, icon: <ShoppingBag className="w-3.5 h-3.5" />, color: 'text-amber-700', activeBg: 'bg-amber-600 text-white shadow-sm' },
    { role: 'logistics', label: t.roleLogistics, icon: <Truck className="w-3.5 h-3.5" />, color: 'text-blue-700', activeBg: 'bg-blue-600 text-white shadow-sm' },
    { role: 'admin', label: t.roleAdmin, icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'text-indigo-700', activeBg: 'bg-indigo-600 text-white shadow-sm' },
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

  const navLinks = [
    { href: '/', label: t.navMarketplace, icon: <Store className="w-4 h-4 text-emerald-600" /> },
    { href: '/farmer', label: t.navFarmer, icon: <Sprout className="w-4 h-4 text-emerald-600" /> },
    { href: '/buyer', label: t.navBuyer, icon: <ShoppingBag className="w-4 h-4 text-amber-600" /> },
    { href: '/logistics', label: t.navLogistics, icon: <Truck className="w-4 h-4 text-blue-600" /> },
    { href: '/admin', label: t.navAdmin, icon: <ShieldCheck className="w-4 h-4 text-indigo-600" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-100 py-1.5 px-3 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 font-medium text-emerald-400 text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Farmer-to-Buyer B2B Platform
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">SE3106 Software Construction</span>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {/* Role Switcher Pill Bar (Desktop & Mobile horizontal scroll) */}
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <span className="text-slate-400 font-medium px-1.5 text-[10px] uppercase tracking-wider hidden md:inline">
                {t.roleLabel}:
              </span>
              {roleConfigs.map((r) => {
                const isActive = role === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSwitch(r.role)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all touch-manipulation ${
                      isActive ? r.activeBg : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs border border-slate-700 text-slate-200">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="si" className="bg-slate-900 text-white">සිංහල</option>
                <option value="ta" className="bg-slate-900 text-white">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-600 to-amber-300 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img 
              src="/logo.png" 
              alt="KethPiyasa Logo" 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover bg-[#042e23]" 
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans leading-none">kethpiyasa</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 w-fit">(කෙත්පියස)</span>
          </div>
        </Link>

        {/* Desktop Role Portal Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-[#064e3b] font-bold border border-emerald-200/60 shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth / User Info & Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#064e3b]" />
                <div className="text-left">
                  <span className="font-bold text-slate-800 block text-[11px] leading-tight">{user.name}</span>
                  <span className="text-[9px] text-[#064e3b] font-bold uppercase tracking-wider">{user.role} • Verified</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="hidden sm:flex items-center gap-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs px-3 py-2 rounded-lg border border-slate-200 transition-all cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Register</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button (Touch Friendly) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none touch-manipulation active:bg-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 py-4 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          {/* User Info / Mobile Login Button */}
          <div className="pt-1">
            {user ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{user.name}</span>
                    <span className="text-[10px] font-bold text-[#064e3b] uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {user.role} • NIC Verified
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    router.push('/login');
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register Account</span>
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation Portals</span>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'bg-[#064e3b] text-white shadow-md font-bold' 
                      : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {link.icon}
                    </div>
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                </Link>
              );
            })}
          </div>

          {/* Role Selection inside Mobile Drawer */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">Switch Active Role Portal</span>
            <div className="grid grid-cols-2 gap-2">
              {roleConfigs.map((r) => {
                const isActive = role === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => {
                      handleRoleSwitch(r.role);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isActive 
                        ? 'border-emerald-600 bg-emerald-50 text-[#064e3b] shadow-2xs' 
                        : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`p-1 rounded-md ${isActive ? 'bg-[#064e3b] text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {r.icon}
                    </div>
                    <span className="capitalize">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
