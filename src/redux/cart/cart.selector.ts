import { RootState } from "../store";

export const getStateCartItems = (state: RootState) => state.cart.items;
export const getStateCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((currCnt, item) => (currCnt += item.count), 0);
