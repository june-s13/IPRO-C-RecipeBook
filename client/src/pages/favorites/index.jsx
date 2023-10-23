import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";


export function FavoritesPage() {
  const auth = useAuth();
  const navigate = useNavigate()

  const onLogout = () => {
    auth.logout().then(() => navigate("/login"))
  }

  return <><Button onClick={onLogout}>Logout</Button></>
}