import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import app from "../../firebase/firebase.init";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInByFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const signInByGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const signInByGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const loggedInUser = { email: currentUser?.email };
        axios
          .post(`http://localhost:5000/jwt`, loggedInUser, {
            withCredentials: true,
          })
          .then(() => {
            // console.log(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:5000/logout", {}, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (userName) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: userName,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInUser,
        createUser,
        logout,
        signInByGoogle,
        signInByFacebook,
        signInByGithub,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
