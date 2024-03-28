import React, { useContext, useState, useEffect, createContext } from "react";
import { app, auth } from "../../firebase/firebaseConfig";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const signup = (email, password) => {
      const user = doCreateUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      return user;
    };
  
    const login = async (email, password) => {
      const user = await doSignInWithEmailAndPassword(email, password);
      setCurrentUser(user);
      return user;
    };

  
  
    const logout = () => {
      return doSignOut();
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
  
    const value = {
      currentUser,
      signup,
      login,
      logout
    };
    console.log(currentUser)

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };