import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";

export function Root() {
  return (
    <Box sx={{ maxHeight: "100vh" }}>
      <Box sx={{ pb: 7, overflow: "auto" }}>
        <Outlet />
      </Box>
      <Navbar />
    </Box>
  );
}
