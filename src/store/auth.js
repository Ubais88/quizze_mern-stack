import { createContext, useContext, useState } from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(true);
  const [updateQuizId, setUpdateQuizId] = useState();
  const [quizData , setQuizData] = useState(null)
  const [quizInfo, setQuizInfo] = useState({
    quizName: "",
    quizType: "",
  });

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // logout - remove token from local storage
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;
  //console.log("isloggedin", isLoggedIn);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        modalOpen,
        setModalOpen,
        LogoutUser,
        authorizationToken,
        createQuiz,
        setCreateQuiz,
        updateQuizId,
        setUpdateQuizId,
        quizInfo,
        setQuizInfo,
        quizData , setQuizData,
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
