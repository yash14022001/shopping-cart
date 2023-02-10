import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Sidebar from "src/shared/Sidebar/SidebarOverride";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getStateCartItemsCount } from "src/redux/cart/cart.selector";
import { useNavigate } from "react-router";
import { actionUnsetAuth } from "src/redux/auth/auth.action";
import { Badge } from "@mui/material";

interface DashboardSidebarProps {
  toggleOpen: React.MouseEventHandler;
  open: boolean;
}
const AppSidebar = (props: DashboardSidebarProps) => {
  const { open, toggleOpen } = props;
  const navigate = useNavigate();
  const itemsCount = useSelector(getStateCartItemsCount);

  return (
    <Sidebar variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleOpen}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/cart")}>
          <ListItemIcon>
            <Badge badgeContent={itemsCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton
          onClick={() => {
            localStorage.removeItem("token");
            window.location.replace("/login");
          }}
        >
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Sidebar>
  );
};

export default AppSidebar;
