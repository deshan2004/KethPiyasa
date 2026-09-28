'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { UserRole } from '@/lib/types';
<<<<<<< HEAD

import {
  Sprout,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  MapPin,
  Landmark,
} from 'lucide-react';
=======
import { useApp } from '@/lib/store';
import { Sprout, ShoppingBag, Truck, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
>>>>>>> main

type MainRole = 'farmer' | 'buyer' | 'logistics';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { lang } = useApp();
<<<<<<< Updated upstream

  const [name, setName] = useState('');
<<<<<<< HEAD
  const [role, setRole] =
    useState<UserRole>('farmer');
=======
  const [role, setRole] = useState<'farmer' | 'buyer' | 'logistics'>('farmer');
  const [nicOrBrn, setNicOrBrn] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nuwara Eliya');
>>>>>>> main
=======
  const t = getTranslation(lang);

  const [name, setName] = useState('');
  const [role, setRole] = useState<MainRole>('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicOrBrn, setNicOrBrn] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Nuwara Eliya');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchName, setBranchName] = useState('');
>>>>>>> Stashed changes

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [nicOrBrn, setNicOrBrn] =
    useState('');
  const [phone, setPhone] =
    useState('');

  const [district, setDistrict] =
    useState('Nuwara Eliya');

  const [bankName, setBankName] =
    useState(
      'Commercial Bank of Ceylon'
    );

  const [accountNumber, setAccountNumber] =
    useState('');

  const [branchName, setBranchName] =
    useState('Main Branch');

  const [errorMsg, setErrorMsg] =
    useState('');

  const [successMsg, setSuccessMsg] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleRegisterSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
<<<<<<< HEAD

    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 6) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Password must contain at least 6 characters.'
=======
        lang === 'si'
          ? 'මුරපදයේ අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුය.'
          : lang === 'ta'
          ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்.'
          : 'Password must contain at least 6 characters.'
>>>>>>> Stashed changes
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Passwords do not match.'
=======
        lang === 'si'
          ? 'මුරපද එකිනෙකට ගැලපෙන්නේ නැත.'
          : lang === 'ta'
          ? 'கடவுச்சொற்கள் பொருந்தவில்லை.'
          : 'Passwords do not match.'
>>>>>>> Stashed changes
      );
      return;
    }

    if (!email.trim()) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Please enter your email address.'
=======
        lang === 'si'
          ? 'කරුණාකර විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'மின்னஞ்சல் முகவரியை உள்ளிடவும்.'
          : 'Please enter your email address.'
>>>>>>> Stashed changes
      );
      return;
    }

    if (!name.trim()) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Please enter your name or enterprise name.'
=======
        lang === 'si'
          ? 'කරුණාකර ඔබගේ නම හෝ ගොවිපළේ නම ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'உங்கள் பெயரை அல்லது பண்ணை பெயரை உள்ளிடவும்.'
          : 'Please enter your name or enterprise name.'
>>>>>>> Stashed changes
      );
      return;
    }

    if (!nicOrBrn.trim()) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Please enter your NIC or Business Registration Number.'
=======
        lang === 'si'
          ? 'කරුණාකර ජාතික හැඳුනුම්පත් හෝ ව්‍යාපාර ලියාපදිංචි අංකය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'தேசிய அடையாள அட்டை அல்லது வணிக பதிவை உள்ளிடவும்.'
          : 'Please enter your NIC or Business Registration Number.'
>>>>>>> Stashed changes
      );
      return;
    }

    if (!phone.trim()) {
      setErrorMsg(
<<<<<<< Updated upstream
        'Please enter your mobile phone number.'
=======
        lang === 'si'
          ? 'කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'கைப்பேசி எண்ணை உள்ளிடவும்.'
          : 'Please enter your mobile phone number.'
>>>>>>> Stashed changes
      );
      return;
    }

    setLoading(true);

    try {
<<<<<<< Updated upstream
      await register(
        email.trim(),
        password,
        {
          name: name.trim(),
          role,
          nicOrBrn: nicOrBrn.trim(),
          phone: phone.trim(),
          district,
          bankAccount: {
            bankName:
              bankName.trim(),
            accountNumber:
              accountNumber.trim(),
            branchName:
              branchName.trim(),
          },
        }
      );

      setSuccessMsg(
        'Account created successfully. Redirecting...'
=======
      await register(email.trim(), password, {
        name: name.trim(),
        role: role as UserRole,
        nicOrBrn: nicOrBrn.trim(),
        phone: phone.trim(),
        district,
        bankAccount: {
          bankName: bankName.trim(),
          accountNumber: accountNumber.trim(),
          branchName: branchName.trim(),
          verified: false,
        },
        nicVerified: false,
        bankVerified: false,
      });

      setSuccessMsg(
        lang === 'si'
          ? 'ගිණුම සාර්ථකව සාදන ලදී. පිවිසෙමින් පවතී...'
          : lang === 'ta'
          ? 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது. திசைதிருப்பப்படுகிறது...'
          : 'Account created successfully. Redirecting...'
>>>>>>> Stashed changes
      );

      const targetRoute =
        role === 'farmer'
          ? '/farmer'
          : role === 'buyer'
          ? '/buyer'
          : '/logistics';

      setTimeout(() => {
        router.push(targetRoute);
      }, 700);
    } catch (error: any) {
      console.error(
        'Registration error:',
        error
      );

<<<<<<< Updated upstream
      if (
        error?.code ===
        'auth/email-already-in-use'
      ) {
        setErrorMsg(
          'This email address is already registered.'
        );
      } else if (
        error?.code ===
        'auth/invalid-email'
      ) {
        setErrorMsg(
          'Please enter a valid email address.'
        );
      } else if (
        error?.code ===
        'auth/weak-password'
      ) {
        setErrorMsg(
          'Password is too weak. Please use at least 6 characters.'
        );
      } else if (
        error?.code ===
        'auth/network-request-failed'
      ) {
        setErrorMsg(
          'Network error. Please check your internet connection.'
        );
      } else if (
        error?.code ===
          'permission-denied' ||
        error?.message?.includes(
          'permission'
        ) ||
        error?.message?.includes(
          'insufficient permissions'
        )
      ) {
=======
      if (error?.code === 'auth/email-already-in-use') {
>>>>>>> Stashed changes
        setErrorMsg(
          lang === 'si'
            ? 'මෙම විද්‍යුත් තැපැල් ලිපිනයෙන් දැනටමත් ගිණුමක් සාදා ඇත.'
            : lang === 'ta'
            ? 'இந்த மின்னஞ்சல் முகவரி ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது.'
            : 'This email address is already registered.'
        );
      } else if (error?.code === 'auth/invalid-email') {
        setErrorMsg(
          lang === 'si'
            ? 'කරුණාකර නිවැරදි විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න.'
            : lang === 'ta'
            ? 'செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும்.'
            : 'Please enter a valid email address.'
        );
      } else if (error?.code === 'auth/weak-password') {
        setErrorMsg(
          lang === 'si'
            ? 'මුරපදය ප්‍රමාණවත් නොවේ. අවම වශයෙන් අක්ෂර 6ක් භාවිතා කරන්න.'
            : lang === 'ta'
            ? 'கடவுச்சொல் மிகவும் பலவீனமாக உள்ளது. குறைந்தது 6 எழுத்துக்களைப் பயன்படுத்தவும்.'
            : 'Password is too weak. Please use at least 6 characters.'
        );
      } else {
        setErrorMsg(
          error?.message ||
<<<<<<< Updated upstream
            'Registration failed. Please try again.'
=======
            (lang === 'si'
              ? 'ලියාපදිංචි වීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.'
              : lang === 'ta'
              ? 'பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
              : 'Registration failed. Please try again.')
>>>>>>> Stashed changes
        );
      }
    } finally {
      setLoading(false);
    }
=======

    register({
      name: name || (role === 'farmer' ? 'Nuwara Eliya Organic Producer' : role === 'buyer' ? 'Keells Super Logistics Ltd' : 'Lanka Transporters'),
      role: role as UserRole,
      nicOrBrn: nicOrBrn || '912039485V',
      phone: phone || '+94 77 000 1122',
      district,
      bankAccount: {
        bankName: '',
        accountNumber: '',
        branchName: '',
        verified: false,
      },
      nicVerified: true,
      bankVerified: false,
    });

    // Automatically route to the registered interface
    const targetRoute = role === 'farmer' ? '/farmer' : role === 'buyer' ? '/buyer' : '/logistics';
    router.push(targetRoute);
>>>>>>> main
  };

  const roleOptions: { key: 'farmer' | 'buyer' | 'logistics'; title: string; subtitle: string; icon: React.ReactNode; color: string }[] = [
    {
      key: 'farmer',
      title: 'Farmer Producer',
      subtitle: lang === 'si' ? 'ගොවි ජනතාව' : lang === 'ta' ? 'விவசாயி' : 'Agricultural Producer',
      icon: <Sprout className="w-5 h-5" />,
      color: 'border-emerald-600 bg-emerald-50 text-[#064e3b]',
    },
    {
      key: 'buyer',
      title: 'Commercial Buyer',
      subtitle: lang === 'si' ? 'මිලදී ගන්නා' : lang === 'ta' ? 'கொள்முதல்' : 'Commercial Buyer',
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'border-amber-600 bg-amber-50 text-amber-900',
    },
    {
      key: 'logistics',
      title: 'Logistics Partner',
      subtitle: lang === 'si' ? 'ප්‍රවාහන පාර්ශවය' : lang === 'ta' ? 'போக்குவரத்து' : 'Freight & Fleet',
      icon: <Truck className="w-5 h-5" />,
      color: 'border-blue-600 bg-blue-50 text-blue-900',
    },
  ];

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
          <Sprout className="w-4 h-4" />
<<<<<<< Updated upstream
<<<<<<< HEAD

          <span>
            KethPiyasa B2B Registration
          </span>
=======
          <span>{t.registerBadge}</span>
>>>>>>> Stashed changes
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.registerHeaderTitle}
        </h1>

        <p className="text-xs text-slate-500">
<<<<<<< Updated upstream
          Register your Farmer, Buyer,
          Logistics or Admin account.
=======
          {t.registerHeaderDesc}
>>>>>>> Stashed changes
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleRegisterSubmit}
        className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-sm text-xs"
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

        {/* Role Selection (Only Farmer, Buyer, Logistics) */}
        <div className="space-y-2">
          <label className="text-slate-700 font-semibold block">
            {t.roleSelectLabel}
          </label>

<<<<<<< Updated upstream
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                'farmer',
                'buyer',
                'logistics',
                'admin',
              ] as UserRole[]
            ).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() =>
                  setRole(r)
                }
                className={`py-3 rounded-xl font-bold capitalize transition-all border ${
                  role === r
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
=======
          <span>KethPiyasa Stakeholder Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Create Verified B2B Account</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Select your registered role below. Upon registration, you will be redirected straight to your dedicated portal interface.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5 shadow-sm text-xs">
        {/* Role Selection Cards (Excludes Admin) */}
        <div className="space-y-2">
          <label className="text-slate-800 font-bold block text-sm">Select Your Account Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {roleOptions.map((r) => {
              const isSelected = role === r.key;
              return (
=======
          <div className="grid grid-cols-3 gap-2">
            {(['farmer', 'buyer', 'logistics'] as MainRole[]).map(
              (r) => (
>>>>>>> Stashed changes
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`p-3 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 transition-all border-2 ${
                    isSelected
                      ? r.color + ' shadow-sm font-bold scale-102'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
<<<<<<< Updated upstream
                  {r.icon}
                  <span className="font-extrabold text-xs">{r.title}</span>
                  <span className="text-[10px] opacity-80">{r.subtitle}</span>
=======
                  {r === 'farmer'
                    ? lang === 'si'
                      ? 'ගොවි'
                      : lang === 'ta'
                      ? 'விவசாயி'
                      : 'Farmer'
                    : r === 'buyer'
                    ? lang === 'si'
                      ? 'මිලදී ගන්නා'
                      : lang === 'ta'
                      ? 'கொள்முதல்'
                      : 'Buyer'
                    : lang === 'si'
                    ? 'ප්‍රවාහන'
                    : lang === 'ta'
                    ? 'போக்குவரத்து'
                    : 'Logistics'}
>>>>>>> Stashed changes
                </button>
              );
            })}
>>>>>>> main
          </div>
          

        </div>

<<<<<<< HEAD
        {/* Name */}
        <div>
          <label className="text-slate-700 font-semibold block mb-1">
            {t.fullNameLabel}
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Bandara Farms / Keells Agri Ltd"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
=======
        {/* User Details */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">Full Name / Farm or Enterprise Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
<<<<<<< Updated upstream
              placeholder={role === 'farmer' ? 'e.g. Bandara Organic Farms' : role === 'buyer' ? 'e.g. Keells Agri Procurement' : 'e.g. Lanka Logistics Express'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
>>>>>>> main
=======
              placeholder={t.fullNamePlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
>>>>>>> Stashed changes
              required
            />
          </div>
        </div>

<<<<<<< HEAD
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
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {t.passwordLabel}
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-700 font-semibold block mb-1">NIC or Business Reg (BRN)</label>
              <input
                type="text"
                value={nicOrBrn}
                onChange={(e) => setNicOrBrn(e.target.value)}
                placeholder="e.g. 781920394V or BRN-98124"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
                required
              />
            </div>
>>>>>>> main

              <input
<<<<<<< HEAD
                type="password"
                value={password}
<<<<<<< Updated upstream
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Minimum 6 characters"
=======
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
>>>>>>> Stashed changes
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
=======
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
>>>>>>> main
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <label className="text-slate-700 font-semibold block mb-1">
              {t.confirmPasswordLabel}
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="password"
                value={confirmPassword}
<<<<<<< Updated upstream
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
=======
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.confirmPasswordPlaceholder}
>>>>>>> Stashed changes
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
=======
            <label className="text-slate-700 font-semibold block mb-1">Farm / Enterprise District Location</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-[#064e3b] text-xs"
            >
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Dambulla">Dambulla</option>
              <option value="Badulla">Badulla</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Colombo">Colombo</option>
            </select>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900 text-[11px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Bank settlement accounts & additional identity documents can be added/verified anytime from your Profile Verification Center after log in.</span>
>>>>>>> main
          </div>
        </div>

        {/* NIC / Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {t.nicBrnLabel}
            </label>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                value={nicOrBrn}
                onChange={(e) =>
                  setNicOrBrn(
                    e.target.value
                  )
                }
                placeholder="781920394V"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {t.phoneLabel}
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="+94 77 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
              />
            </div>
          </div>
        </div>

        {/* District */}
        <div>
          <label className="text-slate-700 font-semibold block mb-1">
            {t.districtLabel}
          </label>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <select
              value={district}
              onChange={(e) =>
                setDistrict(
                  e.target.value
                )
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
            >
<<<<<<< Updated upstream
              <option value="Nuwara Eliya">
                Nuwara Eliya
              </option>

              <option value="Dambulla">
                Dambulla
              </option>

              <option value="Badulla">
                Badulla
              </option>

              <option value="Polonnaruwa">
                Polonnaruwa
              </option>

              <option value="Jaffna">
                Jaffna
              </option>

              <option value="Monaragala">
                Monaragala
              </option>

              <option value="Colombo">
                Colombo
              </option>
=======
              <option value="Nuwara Eliya">Nuwara Eliya (නුවරඑළිය / நுவரெலியா)</option>
              <option value="Dambulla">Dambulla (දඹුල්ල / தம்புள்ளை)</option>
              <option value="Badulla">Badulla (බදුල්ල / பதுளை)</option>
              <option value="Polonnaruwa">Polonnaruwa (පොළොන්නරුව / பொலன்னறுவை)</option>
              <option value="Jaffna">Jaffna (යාපනය / யாழ்ப்பாணம்)</option>
              <option value="Monaragala">Monaragala (මොණරාගල / மொனராகலை)</option>
              <option value="Colombo">Colombo (කොළඹ / கொழும்பு)</option>
>>>>>>> Stashed changes
            </select>
          </div>
        </div>

        {/* Bank (Optional) */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
<<<<<<< Updated upstream
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#064e3b]" />

            <span className="font-bold text-slate-800">
              Bank Settlement Account
=======
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#064e3b]" />
              <span className="font-bold text-slate-800">
                {t.bankSectionTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t.optionalBadge}
>>>>>>> Stashed changes
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            {t.bankSectionNote}
          </p>

          <div>
<<<<<<< Updated upstream
            <label className="text-slate-600 block mb-1">
              Bank Name
            </label>

            <input
              type="text"
              value={bankName}
              onChange={(e) =>
                setBankName(
                  e.target.value
                )
              }
              placeholder="Commercial Bank of Ceylon"
=======
            <label className="text-slate-600 block mb-1">{t.bankNameLabel}</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. Commercial Bank of Ceylon"
>>>>>>> Stashed changes
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 block mb-1">
                {t.accountNumberLabel}
              </label>

              <input
                type="text"
                value={accountNumber}
<<<<<<< Updated upstream
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value
                  )
                }
                placeholder="8001928374"
=======
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 8001928374"
>>>>>>> Stashed changes
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              />
            </div>

            <div>
              <label className="text-slate-600 block mb-1">
                {t.branchNameLabel}
              </label>

              <input
                type="text"
                value={branchName}
<<<<<<< Updated upstream
                onChange={(e) =>
                  setBranchName(
                    e.target.value
                  )
                }
                placeholder="Main Branch"
=======
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Nuwara Eliya Branch"
>>>>>>> Stashed changes
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              />
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Verification notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800">
          <p className="font-semibold">
            Verification Notice
          </p>

          <p className="mt-1 text-[11px] leading-relaxed">
            Your account will be created with
            <strong> verified = false</strong>.
            An authorized administrator can
            verify your NIC / BRN details later.
          </p>
        </div>

=======
>>>>>>> Stashed changes
        {/* Submit */}
        <button
          type="submit"
<<<<<<< HEAD
          disabled={loading}
          className={`w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm ${
            loading
              ? 'opacity-60 cursor-not-allowed'
              : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
<<<<<<< Updated upstream

              <span>
                Creating Account...
              </span>
            </>
          ) : (
            <>
              <span>
                Complete Registration
              </span>

=======
              <span>{t.registerBtn}...</span>
            </>
          ) : (
            <>
              <span>{t.registerBtn}</span>
>>>>>>> Stashed changes
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Login */}
        <div className="pt-2 text-center text-slate-500 text-[11px]">
<<<<<<< Updated upstream
          Already have an account?{' '}

          <Link
            href="/login"
            className="text-[#064e3b] font-bold underline"
          >
            Log in
=======
          className="w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
        >
          <span>Complete Registration & Open {role.toUpperCase()} Interface</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="pt-2 text-center text-slate-500 text-xs">
          Already registered?{' '}
          <Link href="/login" className="text-[#064e3b] font-bold underline">
            Log in to existing account
>>>>>>> main
=======
          {t.alreadyRegistered}{' '}
          <Link href="/login" className="text-[#064e3b] font-bold underline">
            {t.loginLink}
>>>>>>> Stashed changes
          </Link>
        </div>
      </form>
    </div>
  );
}