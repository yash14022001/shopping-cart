export const initialState = {
  email: "",
  token: localStorage.getItem("token"),
};

export type AuthState = typeof initialState;
