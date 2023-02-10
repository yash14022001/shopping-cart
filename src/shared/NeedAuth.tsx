import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStateToken } from "../redux/auth/auth.selector";
import axiosMockInstance from "src/axios/axios.mock-adapter";
import { Navigate } from "react-router";
import { CircularProgress, Grid } from "@mui/material";
import { actionSetAuth, actionUnsetAuth } from "src/redux/auth/auth.action";

const NeedAuth = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector(getStateToken);

  const sendVerifyTokenRequest = useCallback(() => {
    if (token === null) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    axiosMockInstance
      .post("/verify-token", { token })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
          dispatch(actionSetAuth(res.data));
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);
        dispatch(actionUnsetAuth());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, token]);

  useEffect(() => {
    setIsLoading(true);
    sendVerifyTokenRequest();
  }, [sendVerifyTokenRequest]);

  if (isLoading)
    return (
      <Grid
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    );

  if (isAuthenticated) return children;

  return <Navigate to={"/login"} />;
};

export default NeedAuth;
