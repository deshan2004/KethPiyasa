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
<<<<<<< HEAD
  ShoppingBag,
  Truck,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
=======
  ArrowRight,
  ShieldCheck,
  AlertCircle
>>>>>>> main
} from 'lucide-react';

type MainRole = 'farmer' | 'buyer' | 'logistics';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD

  const redirectPath = searchParams.get('redirect');

  const { login } = useAuth();
  const { lang } = useApp();
  const t = getTranslation(lang);

<<<<<<< Updated upstream
  const [selectedRole, setSelectedRole] =
    useState<UserRole>('buyer');

=======
  const [selectedRole, setSelectedRole] = useState<MainRole>('buyer');
>>>>>>> Stashed changes
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

  const handleLoginSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
<<<<<<< Updated upstream
      await login(
        email.trim(),
        password,
        selectedRole
      );
=======
      await login(email.trim(), password, selectedRole as UserRole);
>>>>>>> Stashed changes

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

      if (
        error?.code === 'auth/invalid-credential'
      ) {
        setErrorMsg(
          lang === 'si'
            ? 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි. කරුණාකර නැවත පරීක්ෂා කරන්න.'
            : lang === 'ta'
            ? 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். சரிபார்க்கவும்.'
            : 'Invalid email or password. Please check your credentials.'
        );
<<<<<<< Updated upstream
      } else if (
        error?.code === 'auth/user-not-found'
      ) {
        setErrorMsg(
          'No account found with this email address.'
        );
      } else if (
        error?.code === 'auth/wrong-password'
      ) {
        setErrorMsg('Incorrect password.');
      } else if (
        error?.code === 'auth/invalid-email'
      ) {
        setErrorMsg(
          'Please enter a valid email address.'
        );
      } else if (
        error?.message?.includes(
          'registered as'
        )
      ) {
=======
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
>>>>>>> Stashed changes
        setErrorMsg(error.message);
      } else {
        setErrorMsg(
          error?.message ||
<<<<<<< Updated upstream
            'Login failed. Please try again.'
=======
            (lang === 'si'
              ? 'ලොග් වීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.'
              : lang === 'ta'
              ? 'உள்நுழைவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.'
              : 'Login failed. Please try again.')
>>>>>>> Stashed changes
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
=======
  const defaultRoleQuery = (searchParams.get('role') as UserRole) || 'farmer';

  const { login, user } = useAuth();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [passwordOrNic, setPasswordOrNic] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [adminDetected, setAdminDetected] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const inputLower = emailOrPhone.toLowerCase().trim();
    const passLower = passwordOrNic.toLowerCase().trim();

    // Smart Admin Check: If credentials match admin email/ID or admin password
    const isAdminAccount = 
      inputLower.includes('admin') || 
      passLower === 'admin123' || 
      passLower === 'admin' || 
      passLower === 'gov-sl-89201';

    if (isAdminAccount) {
      setAdminDetected(true);
      login(emailOrPhone || 'admin@kethpiyasa.lk', 'admin');
      setTimeout(() => {
        router.push('/admin');
      }, 400);
      return;
    }

    // Determine role based on input or query or existing session
    let targetRole: UserRole = defaultRoleQuery;
    if (inputLower.includes('farmer')) targetRole = 'farmer';
    else if (inputLower.includes('logistics') || inputLower.includes('truck')) targetRole = 'logistics';
    else if (inputLower.includes('buyer') || inputLower.includes('keells')) targetRole = 'buyer';
    else if (user?.role) targetRole = user.role;

    login(emailOrPhone, targetRole);
    const targetRoute = targetRole === 'farmer' ? '/farmer' : targetRole === 'buyer' ? '/buyer' : targetRole === 'logistics' ? '/logistics' : '/admin';
    router.push(targetRoute);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
>>>>>>> main
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
<<<<<<< Updated upstream
<<<<<<< HEAD
          <span>KethPiyasa Firebase Authentication</span>
=======
          <span>{t.loginBadge}</span>
>>>>>>> Stashed changes
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.loginHeaderTitle}
        </h1>

        <p className="text-xs text-slate-500">
<<<<<<< Updated upstream
          Access your personalized B2B portal using
          your registered email and password.
        </p>
      </div>

      {/* Role Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        {(Object.keys(roleDetails) as UserRole[]).map(
          (rKey) => {
            const isSelected =
              selectedRole === rKey;
=======
          {t.loginHeaderDesc}
        </p>
      </div>

      {/* Role Selection - Only Farmer, Buyer, Logistics */}
      <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
        {(['farmer', 'buyer', 'logistics'] as MainRole[]).map((rKey) => {
          const isSelected = selectedRole === rKey;
>>>>>>> Stashed changes

            return (
              <button
                key={rKey}
                type="button"
                onClick={() =>
                  setSelectedRole(rKey)
                }
                className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all text-center ${
                  isSelected
                    ? roleDetails[rKey].color +
                      ' shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {roleDetails[rKey].icon}

                <span className="capitalize">
                  {rKey}
                </span>
              </button>
            );
          }
        )}
      </div>

      {/* Selected Role */}
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
=======
          <span>KethPiyasa B2B Secure Login</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Account Sign In</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Enter your registered account credentials below. System will automatically route to your assigned portal interface.
        </p>
      </div>

      <form onSubmit={handleLoginSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-xs">
>>>>>>> main
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-rose-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />

            <span>{errorMsg}</span>
          </div>
        )}

<<<<<<< HEAD
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
<<<<<<< Updated upstream
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="user@example.com"
=======
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
>>>>>>> Stashed changes
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
=======
        {adminDetected && (
          <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl text-amber-900 font-bold flex items-center gap-2 animate-pulse">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="block text-xs font-extrabold">Secure Authentication: Admin Recognized</span>
              <span className="text-[10px] font-medium text-amber-800">Redirecting to Governance Control Console...</span>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <div className="space-y-3.5 pt-1">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              Email Address or Mobile Phone
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="buyer@kethpiyasa.lk or +94 77 123 4567"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
              required
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Password or NIC / BRN Key</label>
            <input
              type="password"
              value={passwordOrNic}
              onChange={(e) => setPasswordOrNic(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
>>>>>>> main
              required
              autoComplete="email"
            />
          </div>
        </div>

<<<<<<< HEAD
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
<<<<<<< Updated upstream
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
=======
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
>>>>>>> Stashed changes
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
            loading
              ? 'opacity-60 cursor-not-allowed'
              : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
<<<<<<< Updated upstream

              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>
                Log In as{' '}
                {selectedRole.toUpperCase()}
              </span>

=======
              <span>{t.loginBtn}...</span>
            </>
          ) : (
            <>
              <span>{t.loginBtn} ({selectedRole.toUpperCase()})</span>
>>>>>>> Stashed changes
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Register */}
        <div className="pt-2 text-center text-slate-500 text-[11px]">
<<<<<<< Updated upstream
          Don't have an account?{' '}

          <Link
            href="/register"
            className="text-[#064e3b] font-bold underline"
          >
            Register new account
=======
        <button
          type="submit"
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm mt-3 cursor-pointer active:scale-98"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-xs">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-[#064e3b] font-bold underline">
            Register new Farmer / Buyer account
>>>>>>> main
=======
          {t.noAccount}{' '}
          <Link href="/register" className="text-[#064e3b] font-bold underline">
            {t.registerLink}
>>>>>>> Stashed changes
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