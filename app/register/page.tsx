'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/lib/auth';
import { useApp } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { UserRole } from '@/lib/types';

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

type MainRole = 'farmer' | 'buyer' | 'logistics';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { lang } = useApp();
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

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 6) {
      setErrorMsg(
        lang === 'si'
          ? 'මුරපදයේ අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුය.'
          : lang === 'ta'
          ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்.'
          : 'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(
        lang === 'si'
          ? 'මුරපද එකිනෙකට ගැලපෙන්නේ නැත.'
          : lang === 'ta'
          ? 'கடவுச்சொற்கள் பொருந்தவில்லை.'
          : 'Passwords do not match.'
      );
      return;
    }

    if (!email.trim()) {
      setErrorMsg(
        lang === 'si'
          ? 'කරුණාකර විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'மின்னஞ்சல் முகவரியை உள்ளிடவும்.'
          : 'Please enter your email address.'
      );
      return;
    }

    if (!name.trim()) {
      setErrorMsg(
        lang === 'si'
          ? 'කරුණාකර ඔබගේ නම හෝ ගොවිපළේ නම ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'உங்கள் பெயரை அல்லது பண்ணை பெயரை உள்ளிடவும்.'
          : 'Please enter your name or enterprise name.'
      );
      return;
    }

    if (!nicOrBrn.trim()) {
      setErrorMsg(
        lang === 'si'
          ? 'කරුණාකර ජාතික හැඳුනුම්පත් හෝ ව්‍යාපාර ලියාපදිංචි අංකය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'தேசிய அடையாள அட்டை அல்லது வணிக பதிவை உள்ளிடவும்.'
          : 'Please enter your NIC or Business Registration Number.'
      );
      return;
    }

    if (!phone.trim()) {
      setErrorMsg(
        lang === 'si'
          ? 'කරුණාකර ජංගම දුරකථන අංකය ඇතුළත් කරන්න.'
          : lang === 'ta'
          ? 'கைப்பேசி எண்ணை உள்ளிடவும்.'
          : 'Please enter your mobile phone number.'
      );
      return;
    }

    setLoading(true);

    try {
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
      console.error('Registration error:', error);

      if (error?.code === 'auth/email-already-in-use') {
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
            (lang === 'si'
              ? 'ලියාපදිංචි වීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.'
              : lang === 'ta'
              ? 'பதிவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
              : 'Registration failed. Please try again.')
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
          <span>{t.registerBadge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t.registerHeaderTitle}
        </h1>

        <p className="text-xs text-slate-500">
          {t.registerHeaderDesc}
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

          <div className="grid grid-cols-3 gap-2">
            {(['farmer', 'buyer', 'logistics'] as MainRole[]).map(
              (r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-3 rounded-xl font-bold capitalize transition-all border ${
                    role === r
                      ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
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
                </button>
              )
            )}
          </div>
        </div>

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
              onChange={(e) => setName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
            />
          </div>
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">
              {t.confirmPasswordLabel}
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.confirmPasswordPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
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
                onChange={(e) => setNicOrBrn(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
            >
              <option value="Nuwara Eliya">Nuwara Eliya (නුවරඑළිය / நுவரெலியா)</option>
              <option value="Dambulla">Dambulla (දඹුල්ල / தம்புள்ளை)</option>
              <option value="Badulla">Badulla (බදුල්ල / பதுளை)</option>
              <option value="Polonnaruwa">Polonnaruwa (පොළොන්නරුව / பொலன்னறுவை)</option>
              <option value="Jaffna">Jaffna (යාපනය / யாழ்ப்பாணம்)</option>
              <option value="Monaragala">Monaragala (මොණරාගල / மொனராகலை)</option>
              <option value="Colombo">Colombo (කොළඹ / கொழும்பு)</option>
            </select>
          </div>
        </div>

        {/* Bank (Optional) */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#064e3b]" />
              <span className="font-bold text-slate-800">
                {t.bankSectionTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t.optionalBadge}
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            {t.bankSectionNote}
          </p>

          <div>
            <label className="text-slate-600 block mb-1">{t.bankNameLabel}</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. Commercial Bank of Ceylon"
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
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 8001928374"
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
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="e.g. Nuwara Eliya Branch"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#064e3b] hover:bg-[#043e2f] text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>{t.registerBtn}...</span>
            </>
          ) : (
            <>
              <span>{t.registerBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Login */}
        <div className="pt-2 text-center text-slate-500 text-[11px]">
          {t.alreadyRegistered}{' '}
          <Link href="/login" className="text-[#064e3b] font-bold underline">
            {t.loginLink}
          </Link>
        </div>
      </form>
    </div>
  );
}