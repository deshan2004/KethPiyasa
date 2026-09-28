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
} from '@firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from '@firebase/firestore';

import { auth, db } from './firebase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    selectedRole: UserRole
  ) => Promise<UserProfile>;
  register: (
    email: string,
    password: string,
    profileData: Omit<UserProfile, 'id' | 'verified'>
  ) => Promise<void>;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => Promise<void>;
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

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { setRole } = useApp();
  const [user, setUser] = useState<UserProfile | null>(null);

  /*
   * Firebase authentication state listener
   */
  useEffect(() => {
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
  ): Promise<UserProfile> => {
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
     * Allow Admin to log in from any selected role interface.
     * Block only if a non-admin account role does not match selectedRole.
     */
    if (profile.role !== selectedRole && profile.role !== 'admin') {
      await signOut(auth);

      throw new Error(
        `This account is registered as ${profile.role}, not ${selectedRole}.`
      );
    }

    setUser(profile);
    setRole(profile.role);
    return profile;
  };

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

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updatedData };
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        setDoc(userRef, updatedData, { merge: true }).catch((err) =>
          console.error('Failed to update profile in Firestore:', err)
        );
      }
      return updated;
    });
  };

  /*
   * LOGOUT
   */
  const logout = async () => {
    await signOut(auth);
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