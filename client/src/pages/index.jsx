import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";
import { InputIngredients } from "./InputIngredients/InputIngredients.jsx";

export function Root() {
  return (
    <Box sx={{ maxHeight: "100vh" }}>
	<InputIngredients/>
      <Box sx={{ pb: 7, overflow: "auto" }}>
        <Outlet />
      </Box>
      <Navbar />
    </Box>
  );
}
