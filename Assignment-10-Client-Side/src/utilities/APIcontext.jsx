import PropTypes from "prop-types";
import { AuthContext } from "./AuthProvider";
import { useEffect, useState } from "react";
import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const APIcontext = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // user information loader
  useEffect(() => {
    setUserInfo(null);
    if (user)
      fetch(`https://assignment-10-backend-nine.vercel.app/users/${user.email}`)
        .then((response) => response.json())
        .then((data) => setUserInfo(data))
        .catch((error) => console.log(`Error: ${error}`));
  }, [user]);

  // Authentication

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleSignInUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPasswordUser = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser) : setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    isDark,
    setIsDark,
    loading,
    user,
    userInfo,
    setUser,
    createUser,
    signInUser,
    handleGoogleSignInUser,
    resetPasswordUser,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {/*  */}
      {children}
    </AuthContext.Provider>
  );
};

APIcontext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default APIcontext;
