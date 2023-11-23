import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import LocalDining from "@mui/icons-material/LocalDining";
import StarBorder from "@mui/icons-material/StarBorder";
import Person from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const auth = useAuth();

  const navigate = useNavigate();

  const onNavValueChange = (e, val) => {
    navigate(val);
  };

  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels onChange={onNavValueChange}>
          <BottomNavigationAction
            value="/"
            label="Recipes"
            icon={<LocalDining />}
          />
          {auth.user ? (
            [
              <BottomNavigationAction
                key="favs"
                value="/favorites"
                label="Favorites"
                icon={<StarBorder />}
              />,
              <BottomNavigationAction
                key="user"
                value="/user"
                label="User"
                icon={<Person />}
              />,
            ]
          ) : (
            <BottomNavigationAction
              value="/login"
              label="Sign in"
              icon={<Person />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </>
  );
}
