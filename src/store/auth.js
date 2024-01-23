import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     try {
  //       // Send a request to validate the token
  //       const response = await axios.post(`${BASE_URL}/auth/validate`, {
  //         token: authorizationToken,
  //       });
  //       console.log("reposense of token validation" , response)
  //       if (response.status === 200) {
  //         setIsLoggedIn(true);
  //       } else {
  //         // Token is not valid, clear it from local storage
  //         localStorage.removeItem("token");
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error("Error validating token:", error);
  //       // Handle errors if necessary
  //     }
  //   };

  //   if (token) {
  //     checkTokenValidity();
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        authorizationToken,
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
