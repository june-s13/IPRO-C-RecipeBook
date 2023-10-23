import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import auth from "../api/auth"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies()

  const user = cookies.user;

  const login = async (email, password) => {
    const res = await auth.login(email, password)
    
  }

  const logout = () => {

  }

  const register = () => {

  }

  const value = { user, login, logout, register }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
