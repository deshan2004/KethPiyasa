'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserRole, UserProfile } from './types';
import { useApp } from './store';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from './firebase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
<<<<<<< HEAD
  login: (
    email: string,
    password: string,
    selectedRole: UserRole
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'id' | 'verified'>
  ) => Promise<void>;
  logout: () => Promise<void>;
}

=======
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

>>>>>>> main
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { setRole } = useApp();
<<<<<<< HEAD
=======
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem('kp_auth_user');
        if (savedAuth) return JSON.parse(savedAuth);
      } catch {
        // ignore
      }
    }
    return null;
  });
>>>>>>> main

  const [user, setUser] = useState<UserProfile | null>(null);

  /*
   * Firebase authentication state listener
   */
  useEffect(() => {
<<<<<<< HEAD
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const profile = userSnap.data() as UserProfile;

          setUser(profile);
          setRole(profile.role);
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    });

    return () => unsubscribe();
  }, [setRole]);

  /*
   * LOGIN
   */
  const login = async (
    email: string,
    password: string,
    selectedRole: UserRole
  ) => {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = result.user.uid;

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error('User profile was not found.');
    }

    const profile = userSnap.data() as UserProfile;

    /*
     * Check selected role
     */
    if (profile.role !== selectedRole) {
      await signOut(auth);

      throw new Error(
        `This account is registered as ${profile.role}, not ${selectedRole}.`
      );
    }
=======
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
>>>>>>> main

    setUser(profile);
    setRole(profile.role);
  };

<<<<<<< HEAD
  /*
   * REGISTER
   */
  const register = async (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'id' | 'verified'>
  ) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = result.user.uid;

    const newProfile: UserProfile = {
      ...profileData,
      id: uid,
      verified: false,
    };

    await setDoc(doc(db, 'users', uid), {
      ...newProfile,
      email,
      createdAt: serverTimestamp(),
    });

    setUser(newProfile);
    setRole(newProfile.role);
  };

  /*
   * LOGOUT
   */
  const logout = async () => {
    await signOut(auth);

=======
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
>>>>>>> main
    setUser(null);
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
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
};