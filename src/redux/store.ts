import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/auth.reducer";
import { CartReducer } from "./cart/cart.reducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
