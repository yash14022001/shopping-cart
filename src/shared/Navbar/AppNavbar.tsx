import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Navbar from "src/shared/Navbar/NavbarOverride";
import { getStateCartItemsCount } from "src/redux/cart/cart.selector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LogoutOutlined } from "@mui/icons-material";

interface DashboardNavProps {
  toggleOpen: React.MouseEventHandler;
  open: boolean;
}
const AppNavbar = (props: DashboardNavProps) => {
  const itemsCount = useSelector(getStateCartItemsCount);
  const navigate = useNavigate();

  return (
    <Navbar position="absolute" open={props.open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleOpen}
          sx={{
            marginRight: "36px",
            ...(props.open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={itemsCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.replace("/login");
          }}
        >
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </Navbar>
  );
};

export default AppNavbar;
