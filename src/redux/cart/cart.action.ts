export const CART_ACTIONS = {
  INCREASE_ITEM: "INCREASE_ITEM",
  DECREASE_ITEM: "DECREASE_ITEM",
};

export interface ItemConfiguration {
  id: string;
  count: number;
}
export const actionIncreaseItem = (data: ItemConfiguration) => {
  return {
    type: CART_ACTIONS.INCREASE_ITEM,
    payload: data,
  };
};

export const actionDecreaseItem = (data: ItemConfiguration) => {
  return {
    type: CART_ACTIONS.DECREASE_ITEM,
    payload: data,
  };
};

export const actionResetCart = (data: ItemConfiguration) => {
  return {
    type: CART_ACTIONS.INCREASE_ITEM,
    payload: data,
  };
};
