import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase providers
  const providerG = new GoogleAuthProvider();
  const providerGit = new GithubAuthProvider();
  const authG = getAuth();

  // 🔐 Send Firebase ID token to backend for setting JWT cookie
  const getAndSetJwtCookie = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    await axios.post("http://localhost:3000/jwt", { idToken }, { withCredentials: true });
  };

  // Email/password registration
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await getAndSetJwtCookie(userCredential.user);
    return userCredential;
  };

  // Email/password login
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await getAndSetJwtCookie(userCredential.user);
    return userCredential;
  };

  // Google login
  const googleSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, providerG);
    await getAndSetJwtCookie(result.user);
    return result;
  };

  // GitHub login
  const githubSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(authG, providerGit);
    await getAndSetJwtCookie(result.user);
    return result;
  };

  // Logout: Firebase + JWT cookie
  const userSignOut = async () => {
    setLoading(true);
    await signOut(auth);
    await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
    setUser(null);
    setLoading(false);
  };

  // Update profile
  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  // Firebase Auth observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  // Provide all auth info
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    updateUserProfile,
    userSignOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
