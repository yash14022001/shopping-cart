import { AnyAction } from "@reduxjs/toolkit";
import { CART_ACTIONS, ItemConfiguration } from "./cart.action";
import initialState, { CartState } from "./cart.initial-state";
import { cloneDeep } from "lodash";

const increaseItem = (
  state: CartState,
  payload: ItemConfiguration
): CartState => {
  const updatedItems = cloneDeep(state.items);
  let itemInd = updatedItems.findIndex((p) => p.id === payload.id);

  if (itemInd === -1) {
    updatedItems.push({
      id: payload.id,
      count: 0,
    });
    itemInd = updatedItems.length - 1;
  }

  updatedItems[itemInd].count += payload.count;
  // console.log(updatedItems);
  return {
    ...state,
    items: updatedItems,
  };
};

const decreaseItem = (
  state: CartState,
  payload: ItemConfiguration
): CartState => {
  const updatedItems = cloneDeep(state.items);
  const itemInd = updatedItems.findIndex((p) => p.id === payload.id);

  if (itemInd === -1) return state;

  updatedItems[itemInd].count -= payload.count;
  return {
    ...state,
    items: updatedItems.filter((p) => p.count > 0),
  };
};

export const CartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ACTIONS.INCREASE_ITEM:
      return increaseItem(state, action.payload);
    case CART_ACTIONS.DECREASE_ITEM:
      return decreaseItem(state, action.payload);
    default:
      return state;
  }
};
