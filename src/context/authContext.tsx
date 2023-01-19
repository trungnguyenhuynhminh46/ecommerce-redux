import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../share/firebase";

interface PropsAuth {
  children: React.ReactNode;
}

const AuthContext = createContext<any>(undefined);

const AuthProvider: React.FC<PropsAuth> = ({ children }) => {
  // States
  const [currentUser, setCurrentUser] = useState<User | null | {}>({});
  // Effect
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    // Clean up
    return unsub;
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log(context);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within Auth Provider");
  }
  return context;
};

export { useAuth, AuthProvider };
