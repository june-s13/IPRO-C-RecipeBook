import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import * as auth from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies] = useCookies();

  const user = cookies.user;

  const setUser = (id, email) => {
    setCookies("user", { id, email });
  };

  const login = async (email, password) => {
    const res = await auth.login(email, password);
    setUser(res.id, res.email);
  };

  const logout = async () => {
    await auth.logout();
    setCookies("user", null);
  };

  const register = async (email, password) => {
    const res = await auth.register(email, password);
    setUser(res.id, res.email);
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
