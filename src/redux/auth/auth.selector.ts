import { RootState } from "../store";

export const getStateAuth = (state: RootState) => state.auth;
export const getStateEmail = (state: RootState) => state.auth.email;
export const getStateToken = (state: RootState) => state.auth.token;
