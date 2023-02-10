import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SideImage from "./SideImage/SideImage";
import LoginForm from "./LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { getStateToken } from "src/redux/auth/auth.selector";
import { Navigate } from "react-router";

export default function LoginPage() {
  const token = useSelector(getStateToken);

  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Grid container component="main" sx={{ height: "100vh" }} item>
      <Grid
        item
        sm={12}
        md={4}
        component={Paper}
        elevation={6}
        square
        justifyContent="center"
        display="flex"
        sx={{
          flex: 1,
        }}
      >
        <LoginForm />
      </Grid>
      <SideImage />
    </Grid>
  );
}
