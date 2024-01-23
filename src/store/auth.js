import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };


  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        BASE_URL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};