import { AuthState } from "./auth.initial-state";

export const AUTH_ACTIONS = {
  SET_AUTH_DETAILS: "SET_AUTH_DETAILS",
  UNSET_AUTH_DETAILS: "UNSET_AUTH_DETAILS",
};

export const actionSetAuth = (details: AuthState) => {
  return {
    type: AUTH_ACTIONS.SET_AUTH_DETAILS,
    payload: details,
  };
};

export const actionUnsetAuth = () => {
  return {
    type: AUTH_ACTIONS.UNSET_AUTH_DETAILS,
    payload: null,
  };
};
