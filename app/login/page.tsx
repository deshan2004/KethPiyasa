'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { UserRole } from '@/lib/types';

import {
  Sprout,
  ShoppingBag,
  Truck,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

type MainRole = 'farmer' | 'buyer' | 'logistics';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get('redirect');
  const { login } = useAuth();
  const { lang } = useApp();
  const t = getTranslation(lang);

  const [selectedRole, setSelectedRole] = useState<MainRole>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const roleDetails: Record<
    MainRole,
    {
      title: string;
      desc: string;
      icon: React.ReactNode;
      color: string;
    }
  > = {
    farmer: {
      title:
        lang === 'si'
          ? 'ගොවි නිෂ්පාදක (ගොවි ද්වාරය)'
          : lang === 'ta'
          ? 'விவசாய உற்பத்தியாளர் (விவசாயி போர்ட்டல்)'
          : 'Farmer Producer',
      desc:
        lang === 'si'
          ? 'අස්වැන්න පළ කරන්න, ගැනුම්කරුවන්ගේ මිල ගණන් ලබා ගන්න, සහ බැංකු ගෙවීම් පරීක්ෂා කරන්න.'
          : lang === 'ta'
          ? 'பயிர்களைப் பதிவிடவும், வாங்குபவர் மேற்கோள்களைப் பெறவும், வங்கிப் பணத்தைக் கண்காணிக்கவும்.'
          : 'Post crops, receive direct buyer quotations, counter-offer, and track bank payouts.',
      icon: <Sprout className="w-5 h-5 text-white" />,
      color: 'bg-[#064e3b] text-white',
    },

    buyer: {
      title:
        lang === 'si'
          ? 'වාණිජ මිලදී ගන්නා (මිලදී ගැනුම්කරු)'
          : lang === 'ta'
          ? 'வணிக ரீதியாக வாங்குபவர் (கொள்முதல் போர்ட்டல்)'
          : 'Commercial Buyer',
      desc:
        lang === 'si'
          ? 'තොග අස්වැන්න සොයන්න, ගුණාත්මකභාවය පරීක්ෂා කරන්න, සහ ඇස්ක්‍රෝ තැන්පතු තහවුරු කරන්න.'
          : lang === 'ta'
          ? 'மொத்த பயிர்களைத் தேடுங்கள், தர நிலைகளைச் சரிபார்க்கவும், எஸ்க்ரோ வைப்புகளைப் பாதுகாக்கவும்.'
          : 'Search bulk crops, verify quality grades, request quotes, and secure escrow deposits.',
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      color: 'bg-amber-600 text-white',
    },

    logistics: {
      title:
        lang === 'si'
          ? 'ප්‍රවාහන පාර්ශවකරු (ප්‍රවාහන ද්වාරය)'
          : lang === 'ta'
          ? 'போக்குவரத்து சேவை (போக்குவரத்து போர்ட்டல்)'
          : 'Logistics Hauler',
      desc:
        lang === 'si'
          ? 'ලබා ගත හැකි ප්‍රවාහන රැකියා බලන්න, මාර්ග සටහන් යාවත්කාලීන කරන්න, සහ QR බෙදාහැරීම් පරීක්ෂා කරන්න.'
          : lang === 'ta'
          ? 'கிடைக்கக்கூடிய சரக்கு வேலைகளைப் பார்க்கவும், வழிகளைப் புதுப்பிக்கவும், QR விநியோகங்களைச் சரிபார்க்கவும்.'
          : 'View available freight jobs, update route checkpoints, and verify QR deliveries.',
      icon: <Truck className="w-5 h-5 text-white" />,
      color: 'bg-blue-600 text-white',
    },
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(email.trim(), password, selectedRole as UserRole);

      setSuccessMsg(
        lang === 'si'
          ? 'ලොග් වීම සාර්ථකයි. පිවිසෙමින් පවතී...'
          : lang === 'ta'
          ? 'உள்நுழைவு வெற்றி. திசைதிருப்பப்படுகிறது...'
          : 'Login successful. Redirecting...'
      );

      const targetRoute =
        redirectPath ||
        (selectedRole === 'farmer'
          ? '/farmer'
          : selectedRole === 'buyer'
          ? '/buyer'
          : '/logistics');

      setTimeout(() => {
        router.push(targetRoute);
      }, 500);
    } catch (error: any) {
      console.error('Login error:', error);

      if (error?.code === 'auth/invalid-credential') {
        setErrorMsg(
          lang === 'si'
            ? 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි. කරුණාකර නැවත පරීක්ෂා කරන්න.'
            : lang === 'ta'
            ? 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். சரிபார்க்கவும்.'
            : 'Invalid email or password. Please check your credentials.'
        );
      } else if (error?.code === 'auth/user-not-found') {
        setErrorMsg(
          lang === 'si'
            ? 'මෙම විද්‍යුත් තැපෑලෙන් ගිණුමක් හමු නොවීය.'
            : lang === 'ta'
            ? 'இந்த மின்னஞ்சலில் கணக்கு எதுவும் இல்லை.'
            : 'No account found with this email address.'
        );
      } else if (error?.code === 'auth/wrong-password') {
        setErrorMsg(
          lang === 'si'
            ? 'මුරපදය වැරදියි.'
            : lang === 'ta'
            ? 'தவறான கடவுச்சொல்.'
            : 'Incorrect password.'
        );
      } else if (error?.code === 'auth/invalid-email') {
        setErrorMsg(
          lang === 'si'
            ? 'කරුණාකර නිවැරදි විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.'
            : lang === 'ta'
            ? 'செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும்.'
            : 'Please enter a valid email address.'
        );
      } else if (error?.message?.includes('registered as')) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(
          error?.message ||
            (lang === 'si'
              ? 'ලොග් වීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.'
              : lang === 'ta'
              ? 'உள்நுழைவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.'
              : 'Login failed. Please try again.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
          <span>{t.loginBadge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.loginHeaderTitle}
        </h1>

        <p className="text-xs text-slate-500">
          {t.loginHeaderDesc}
        </p>
      </div>

      {/* Role Selection - Only Farmer, Buyer, Logistics */}
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        {(['farmer', 'buyer', 'logistics'] as MainRole[]).map((rKey) => {
          const isSelected = selectedRole === rKey;

          return (
            <button
              key={rKey}
              type="button"
              onClick={() => setSelectedRole(rKey)}
              className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center ${
                isSelected
                  ? roleDetails[rKey].color + ' shadow-sm scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {roleDetails[rKey].icon}
              <span className="capitalize">{rKey}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Role Info */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-1 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]" />
          <h3 className="font-bold text-slate-900 text-sm">
            {roleDetails[selectedRole].title}
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          {roleDetails[selectedRole].desc}
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs"
      >
        {/* Error */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-700 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="text-slate-700 font-semibold block mb-1">
            {t.emailLabel}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-slate-700 font-semibold block mb-1">
            {t.passwordLabel}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-2 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>{t.loginBtn}...</span>
            </>
          ) : (
            <>
              <span>{t.loginBtn} ({selectedRole.toUpperCase()})</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Register */}
        <div className="pt-2 text-center text-slate-500 text-[11px]">
          {t.noAccount}{' '}
          <Link href="/register" className="text-[#064e3b] font-bold underline">
            {t.registerLink}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs font-bold text-slate-500">
          Loading...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}