'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { getTranslation } from '@/lib/i18n';
import { Language } from '@/lib/types';
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
  Store,
  UserPlus
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang } = useApp();
  const { user, logout } = useAuth();
  const t = getTranslation(lang);
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-100 py-1.5 px-3 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 font-semibold text-emerald-400 text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Farmer-to-Buyer B2B Platform
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">Sri Lanka Agrarian Network</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {/* Logged In User Profile Summary */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={
                    user.role === 'farmer' ? '/farmer' : user.role === 'buyer' ? '/buyer' : user.role === 'logistics' ? '/logistics' : '/admin'
                  }
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold">{user.name}</span>
                  <span className="bg-emerald-950 text-emerald-300 font-extrabold text-[9px] px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                    {user.role}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 text-[11px] font-semibold transition-colors px-1"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-slate-300 hover:text-white text-[11px] font-medium px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-3 h-3 text-emerald-400" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 text-[11px] font-semibold bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800 hover:bg-emerald-900 transition-colors"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-lg text-xs border border-slate-700 text-slate-200">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              pathname === '/' 
                ? 'bg-emerald-50 text-[#064e3b] font-bold border border-emerald-200/60 shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-600" />
            <span>{t.navMarketplace}</span>
          </Link>

          {userPortal ? (
            <Link
              href={userPortal.href}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                pathname === userPortal.href
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-emerald-800 bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {userPortal.icon}
              <span>{userPortal.label}</span>
            </Link>
          ) : (
            <>
              <Link
                href="/login?role=farmer"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`}
              >
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{t.navFarmer}</span>
              </Link>
              <Link
                href="/login?role=buyer"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>{t.navBuyer}</span>
              </Link>
              <Link
                href="/login?role=logistics"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100`}
              >
                <Truck className="w-4 h-4 text-blue-600" />
                <span>{t.navLogistics}</span>
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Auth / User Info & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href={userPortal?.href || '/'}
                className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs hover:border-emerald-300 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#064e3b]" />
                <div className="text-left">
                  <span className="font-bold text-slate-800 block text-[11px] leading-tight">{user.name}</span>
                  <span className="text-[9px] text-[#064e3b] font-bold uppercase tracking-wider">{user.role} • Verified</span>
                </div>
              </Link>

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
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-[#064e3b] hover:bg-[#043e2f] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
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
                  className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-white px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#064e3b] text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-amber-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation Portals</span>
            
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/' 
                  ? 'bg-[#064e3b] text-white shadow-md font-bold' 
                  : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${pathname === '/' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
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
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === userPortal.href
                    ? 'bg-[#064e3b] text-white shadow-md font-bold'
                    : 'text-emerald-900 bg-emerald-50 border border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${pathname === userPortal.href ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
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
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <span>{t.navFarmer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/login?role=buyer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span>{t.navBuyer}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/login?role=logistics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
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
  );
};
