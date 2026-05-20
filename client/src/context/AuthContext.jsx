import { createContext, useContext, useMemo, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("devfolioUser") || "null");
  });

  const register = async (formData) => {
    const response = await registerUser(formData);
    setUser(response.data);
    localStorage.setItem("devfolioUser", JSON.stringify(response.data));
    return response;
  };

  const login = async (formData) => {
    const response = await loginUser(formData);
    setUser(response.data);
    localStorage.setItem("devfolioUser", JSON.stringify(response.data));
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("devfolioUser");
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
