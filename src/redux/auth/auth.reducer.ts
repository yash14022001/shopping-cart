import { AnyAction } from "@reduxjs/toolkit";
import { AUTH_ACTIONS } from "./auth.action";
import { AuthState, initialState } from "./auth.initial-state";

const setAuthDetails = (payload: AuthState): AuthState => {
  return {
    ...payload,
  };
};

const unsetAuthDetails = (): AuthState => {
  return {
    email: "",
    token: null,
  };
};

export const AuthReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_DETAILS:
      return setAuthDetails(action.payload);
    case AUTH_ACTIONS.UNSET_AUTH_DETAILS:
      return unsetAuthDetails();
    default:
      return state;
  }
};
