'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/lib/types';

import {
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get('redirect');

  const { login } = useAuth();

  const [selectedRole, setSelectedRole] =
    useState<UserRole>('buyer');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const roleDetails: Record<
    UserRole,
    {
      title: string;
      desc: string;
      icon: React.ReactNode;
      color: string;
    }
  > = {
    farmer: {
      title: 'Farmer Producer (ගොවි ද්වාරය)',
      desc: 'Post crops, receive direct buyer quotations, counter-offer, and track bank payouts.',
      icon: <Sprout className="w-5 h-5 text-white" />,
      color: 'bg-[#064e3b] text-white',
    },

    buyer: {
      title: 'Commercial Buyer (වාණිජ මිලදී ගන්නා)',
      desc: 'Search bulk crops, verify quality grades, request quotes, and secure escrow deposits.',
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      color: 'bg-amber-600 text-white',
    },

    logistics: {
      title: 'Logistics Hauler (ප්‍රවාහන පාර්ශවකරු)',
      desc: 'View available freight jobs, update route checkpoints, and verify QR deliveries.',
      icon: <Truck className="w-5 h-5 text-white" />,
      color: 'bg-blue-600 text-white',
    },

    admin: {
      title: 'System Admin (පරිපාලක ද්වාරය)',
      desc: 'Verify identity records, monitor escrow ledgers, moderate disputes, and set market prices.',
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: 'bg-indigo-600 text-white',
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
      await login(
        email.trim(),
        password,
        selectedRole
      );

      setSuccessMsg('Login successful. Redirecting...');

      const targetRoute =
        redirectPath ||
        (selectedRole === 'farmer'
          ? '/farmer'
          : selectedRole === 'buyer'
          ? '/buyer'
          : selectedRole === 'logistics'
          ? '/logistics'
          : '/admin');

      setTimeout(() => {
        router.push(targetRoute);
      }, 500);
    } catch (error: any) {
      console.error('Login error:', error);

      if (
        error?.code === 'auth/invalid-credential'
      ) {
        setErrorMsg(
          'Invalid email or password. Please check your credentials.'
        );
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
        setErrorMsg(error.message);
      } else {
        setErrorMsg(
          error?.message ||
            'Login failed. Please try again.'
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
        <div className="inline-flex items-center gap-2 bg-[#064e3b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <Sprout className="w-4 h-4" />
          <span>KethPiyasa Firebase Authentication</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Select Role & Log In
        </h1>

        <p className="text-xs text-slate-500">
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
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="user@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 font-medium focus:outline-none focus:border-[#064e3b]"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-slate-700 font-semibold block mb-1">
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
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

              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>
                Log In as{' '}
                {selectedRole.toUpperCase()}
              </span>

              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Register */}
        <div className="pt-2 text-center text-slate-500 text-[11px]">
          Don't have an account?{' '}

          <Link
            href="/register"
            className="text-[#064e3b] font-bold underline"
          >
            Register new account
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
          Loading Login...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}