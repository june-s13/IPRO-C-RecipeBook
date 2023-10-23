import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export function UnauthenticatedOnly({ children }) {
  const auth = useAuth();

  return <>{auth.user ? <Navigate to="/" /> : children}</>
}

export function AuthenticatedOnly({ children }) {
  const auth = useAuth();

  return <>{auth.user ? children : <Navigate to="/login" />}</>
}