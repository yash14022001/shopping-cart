import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AppNavbar from "src/shared/Navbar/AppNavbar";
import AppSidebar from "src/shared/Sidebar/AppSidebar";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "src/pages/dashboard/Dashboard";
import CartList from "src/pages/cart/CartList";

const Layout = () => {
  const [open, setOpen] = React.useState(true);

  const toggleOpen = React.useCallback(() => {
    setOpen((p) => !p);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavbar toggleOpen={toggleOpen} open={open} />
      <AppSidebar toggleOpen={toggleOpen} open={open} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
