import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.logout().then(() => navigate("/login"));
  };

  return (
    <>
      <p>
        Logged in as {auth.user.email} (ID: {auth.user.id})
      </p>
      <Button variant="contained" onClick={onLogout}>
        Logout
      </Button>
    </>
  );
}
