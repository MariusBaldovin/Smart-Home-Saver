import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Create a context for managing authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component to wrap your application
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to register a new user
  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in an existing user
  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user
  const signOut = async () => {
    return signOutFirebase(auth);
  };

  // Function to reset password
  const forgotPassword = (email) => {
    //
    return sendPasswordResetEmail(auth, email);
  };

  //sign in with google function
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  //sign in with facebook function

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Facebook:", error.message);
    }
  };

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch additional data like name
        const displayName = user.displayName;
        setCurrentUser({ ...user, displayName });
        setLoading(false);
      } else {
        // User is signed out
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    signInWithGoogle,
    signInWithFacebook,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
