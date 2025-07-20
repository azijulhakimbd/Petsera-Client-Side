import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
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

  const providerG = new GoogleAuthProvider();
  const providerGit = new GithubAuthProvider();

  // 🔐 Send Firebase ID token to backend and set HTTP-only cookie
  const getAndSetJwtCookie = async (firebaseUser) => {
    const idToken = await firebaseUser.getIdToken();
    await axios.post(
      "https://petsera-server-side.vercel.app/jwt",
      { idToken },
      { withCredentials: true }
    );
  };

  // 🟢 Register with email & password
  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await getAndSetJwtCookie(userCredential.user);
    setUser(userCredential.user);
    setLoading(false);
    return userCredential;
  };

  // 🟢 Sign in with email & password
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await getAndSetJwtCookie(userCredential.user);
    setUser(userCredential.user);
    setLoading(false);
    return userCredential;
  };

  // 🟢 Google Sign-In
  const googleSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, providerG);
    await getAndSetJwtCookie(result.user);
    setUser(result.user);
    setLoading(false);
    return result;
  };

  // 🟢 GitHub Sign-In
  const githubSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, providerGit);
    await getAndSetJwtCookie(result.user);
    setUser(result.user);
    setLoading(false);
    return result;
  };

  // 🔴 Logout from Firebase + clear cookie from server
  const userSignOut = async () => {
    setLoading(true);
    await signOut(auth);
    await axios.post(
      "https://petsera-server-side.vercel.app/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setLoading(false);
  };

  // 🟡 Update Firebase user profile
  const updateUserProfile = async (profileInfo) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, profileInfo);
    }
  };

  // 🟣 Listen for Firebase user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Provide all auth functions + states
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

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
