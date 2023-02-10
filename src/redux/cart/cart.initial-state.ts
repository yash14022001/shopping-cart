export interface CartItem {
  id: string;
  count: number;
}

const initialState = {
  items: [] as CartItem[],
};

export type CartState = typeof initialState;

export default initialState;
