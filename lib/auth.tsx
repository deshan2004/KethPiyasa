'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile } from './types';
import { useApp } from './store';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, role: UserRole) => void;
  register: (profileData: Omit<UserProfile, 'id' | 'verified'>) => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
}

export const defaultProfiles: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'usr-farmer-01',
    name: 'Bandara Organic Farms',
    role: 'farmer',
    nicOrBrn: '781920394V',
    phone: '+94 77 123 4567',
    district: 'Nuwara Eliya',
    bankAccount: {
      bankName: 'Commercial Bank of Ceylon',
      accountNumber: '8001928374',
      branchName: 'Nuwara Eliya Branch',
      verified: true,
    },
    nicVerified: true,
    bankVerified: true,
    verified: true,
  },
  buyer: {
    id: 'usr-buyer-01',
    name: 'Keells Agri Procurement',
    role: 'buyer',
    nicOrBrn: 'BRN-2024-98124',
    phone: '+94 11 234 5678',
    district: 'Colombo',
    bankAccount: {
      bankName: 'Hatton National Bank',
      accountNumber: '1002938475',
      branchName: 'Head Office Colombo',
      verified: true,
    },
    nicVerified: true,
    bankVerified: true,
    verified: true,
  },
  logistics: {
    id: 'usr-log-01',
    name: 'Lanka Logistics Express',
    role: 'logistics',
    nicOrBrn: 'BRN-2022-44120',
    phone: '+94 71 444 5566',
    district: 'Colombo',
    bankAccount: {
      bankName: 'Sampath Bank PLC',
      accountNumber: '0092817263',
      branchName: 'Welisara Hub Branch',
      verified: true,
    },
    nicVerified: true,
    bankVerified: true,
    verified: true,
  },
  admin: {
    id: 'usr-admin-01',
    name: 'Dambulla Agri Governance',
    role: 'admin',
    nicOrBrn: 'GOV-SL-89201',
    phone: '+94 66 222 3344',
    district: 'Dambulla',
    bankAccount: {
      bankName: 'Central Bank of Sri Lanka',
      accountNumber: '0000111222',
      branchName: 'Colombo HQ',
      verified: true,
    },
    nicVerified: true,
    bankVerified: true,
    verified: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setRole } = useApp();
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem('kp_auth_user');
        if (savedAuth) return JSON.parse(savedAuth);
      } catch {
        // ignore
      }
    }
    return defaultProfiles.farmer;
  });

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user, setRole]);

  const login = (emailOrPhone: string, selectedRole: UserRole) => {
    const profile = defaultProfiles[selectedRole] || {
      id: `usr-${Date.now()}`,
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Sri Lanka Registered User',
      role: selectedRole,
      nicOrBrn: '891029384V',
      phone: emailOrPhone,
      district: 'Colombo',
      bankAccount: { bankName: 'Bank of Ceylon', accountNumber: '77281923', branchName: 'Main' },
      verified: true,
    };

    setUser(profile);
    setRole(selectedRole);
    try {
      localStorage.setItem('kp_auth_user', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  const register = (profileData: Omit<UserProfile, 'id' | 'verified'>) => {
    // Prevent registering as admin
    const safeRole: UserRole = profileData.role === 'admin' ? 'farmer' : profileData.role;
    
    const newProfile: UserProfile = {
      ...profileData,
      role: safeRole,
      id: `usr-${Date.now()}`,
      verified: true,
    };

    setUser(newProfile);
    setRole(safeRole);
    try {
      localStorage.setItem('kp_auth_user', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    try {
      localStorage.setItem('kp_auth_user', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('kp_auth_user');
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
