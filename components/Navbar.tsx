'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { getTranslation } from '@/lib/i18n';
import { Language } from '@/lib/types';
import { ProfileVerificationModal } from './ProfileVerificationModal';
import { 
  Sprout, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Globe, 
  UserCheck, 
  LogIn, 
  LogOut, 
  Menu,
  X,
  ChevronRight,
  Store,
  UserPlus,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang } = useApp();
  const { user, logout } = useAuth();
  const t = getTranslation(lang);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const getPortalLinkForRole = () => {
    if (!user) return null;
    switch (user.role) {
      case 'farmer':
        return { href: '/farmer', label: 'My Farmer Portal', icon: <Sprout className="w-4 h-4 text-emerald-600" /> };
      case 'buyer':
        return { href: '/buyer', label: 'My Buyer Portal', icon: <ShoppingBag className="w-4 h-4 text-amber-600" /> };
      case 'logistics':
        return { href: '/logistics', label: 'Logistics Hub', icon: <Truck className="w-4 h-4 text-blue-600" /> };
      case 'admin':
        return { href: '/admin', label: 'System Admin Console', icon: <ShieldCheck className="w-4 h-4 text-indigo-600" /> };
      default:
        return null;
    }
  };

  const userPortal = getPortalLinkForRole();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-slate-200 py-1.5 px-4 sm:px-8 text-xs border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-300 text-[11px] sm:text-xs tracking-tight">
                Direct Farmer-to-Buyer B2B Platform
              </span>
            </div>
            <span className="hidden md:inline text-slate-700 font-extrabold">•</span>
            <span className="hidden md:inline text-slate-400 text-[11px] font-medium">Sri Lanka Agrarian Grid</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 px-2.5 py-0.5 rounded-full text-xs transition-all shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs py-0.5"
              >
                <option value="en" className="bg-slate-900 text-white font-medium">English</option>
                <option value="si" className="bg-slate-900 text-white font-medium">සිංහල</option>
                <option value="ta" className="bg-slate-900 text-white font-medium">தமிழ்</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 shadow-md shadow-emerald-950/20 group-hover:scale-105 group-hover:shadow-emerald-500/30 transition-all duration-300 shrink-0">
            <img 
              src="/logo.png" 
              alt="KethPiyasa Modern Logo" 
              className="w-11 h-11 rounded-full object-cover bg-[#042e23]" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900 font-sans leading-none">
                keth<span className="text-emerald-700 font-extrabold">piyasa</span>
              </span>
              {t.subBrand && (
                <span className="hidden sm:inline-block text-[10px] font-extrabold text-[#064e3b] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 uppercase tracking-wider">
                  {t.subBrand}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-slate-400 leading-tight hidden xs:block">
              B2B Agri Marketplace • Sri Lanka
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60 shadow-2xs text-xs font-semibold">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              pathname === '/' 
                ? 'bg-white text-[#064e3b] font-bold shadow-xs border border-emerald-200/60' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-600" />
            <span>{t.navMarketplace}</span>
          </Link>

          {userPortal ? (
            <Link
              href={userPortal.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                pathname === userPortal.href
                  ? 'bg-[#064e3b] text-white font-bold shadow-sm'
                  : 'text-emerald-900 bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {userPortal.icon}
              <span>{userPortal.label}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login?role=farmer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-600 hover:text-emerald-900 hover:bg-white/70 transition-all duration-200"
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t.navFarmer}</span>
              </Link>
              <Link
                href="/login?role=buyer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-600 hover:text-amber-900 hover:bg-white/70 transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>{t.navBuyer}</span>
              </Link>
              <Link
                href="/login?role=logistics"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-white/70 transition-all duration-200"
              >
                <Truck className="w-4 h-4 text-blue-600" />
                <span>{t.navLogistics}</span>
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth / User Info & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setProfileModalOpen(true)}
                className="hidden sm:flex items-center gap-2.5 bg-gradient-to-r from-emerald-50 via-slate-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 px-3 py-1.5 rounded-xl border border-emerald-200/80 text-xs transition-all cursor-pointer shadow-2xs hover:shadow-xs group text-left"
                title="Open Profile & Verification Center"
              >
                <div className="w-7 h-7 rounded-lg bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="font-bold text-slate-900 block text-[11px] leading-tight group-hover:text-emerald-900">{user.name}</span>
                  <span className="text-[9px] text-[#064e3b] font-bold uppercase tracking-wider block leading-tight">
                    {user.role} • Verified
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="hidden sm:flex items-center justify-center p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-200/80"
                title="Log Out"
              >
                <LogOut className="w-4 h-4 text-slate-600 hover:text-rose-600" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 font-bold text-xs px-4 py-2 rounded-xl border border-slate-200/90 shadow-2xs transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-800 via-[#064e3b] to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-bold text-xs px-4.5 py-2 rounded-xl shadow-sm shadow-emerald-900/20 transition-all active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200 border border-slate-200/80 focus:outline-none touch-manipulation active:scale-95 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 py-4 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
          {/* User Info / Mobile Login Button */}
          <div className="pt-1">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#064e3b] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">{user.name}</span>
                      <span className="text-[10px] font-extrabold text-[#064e3b] uppercase tracking-wider bg-emerald-100/80 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-emerald-200">
                        {user.role} • Verified
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      router.push('/login');
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-white px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 shadow-2xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setProfileModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs cursor-pointer transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Open Verification Center</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-200/80 shadow-2xs"
                >
                  <LogIn className="w-4 h-4 text-emerald-600" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-800 via-[#064e3b] to-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-2">Navigation Portals</span>
            
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                pathname === '/' 
                  ? 'bg-[#064e3b] text-white shadow-md font-bold' 
                  : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${pathname === '/' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Store className="w-4 h-4" />
                </div>
                <span>{t.navMarketplace}</span>
              </div>
              <ChevronRight className={`w-4 h-4 ${pathname === '/' ? 'text-white' : 'text-slate-400'}`} />
            </Link>

            {userPortal ? (
              <Link
                href={userPortal.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                  pathname === userPortal.href
                    ? 'bg-[#064e3b] text-white shadow-md font-bold'
                    : 'text-emerald-900 bg-emerald-50 border border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${pathname === userPortal.href ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {userPortal.icon}
                  </div>
                  <span>{userPortal.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${pathname === userPortal.href ? 'text-white' : 'text-slate-400'}`} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login?role=farmer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span>{t.navFarmer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/login?role=buyer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span>{t.navBuyer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/login?role=logistics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span>{t.navLogistics}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>

    {/* Identity & Bank Verification Modal */}
    <ProfileVerificationModal
      isOpen={profileModalOpen}
      onClose={() => setProfileModalOpen(false)}
    />
    </>
  );
};
