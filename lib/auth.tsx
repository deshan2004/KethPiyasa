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

    setUser(profile);
    setRole(profile.role);
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