import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // email ,password authentication
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   sign in email password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Google sign up
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  };

  // Sign Out
  const userSignOut = () => {
    setLoading(true)
    return signOut(auth);
  };
  // Update User
  const updateUserProfile =(profileInfo)=>{
    return updateProfile(auth.currentUser, profileInfo)
  }
  //   Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // Auth Info
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    userSignOut,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;