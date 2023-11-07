import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {useLocation} from 'react-router-dom';

export function ViewRecipiePage() {

  const location = useLocation();

  return (
  <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="body">
          Ingredients needed: {location.state.ingNeeded},
		  Prep Time: {location.state.prepTime},
		  Calories: {location.state.calories}
        </Typography>
	  </Box>
    </Container>
  );
}
