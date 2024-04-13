import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "../../firebase/auth";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

    const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      console.log('Google sign-in successful');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
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
      googleSignIn,
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