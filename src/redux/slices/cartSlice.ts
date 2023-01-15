import { createSlice } from "@reduxjs/toolkit";
// Types
import type { PrepareAction, PayloadAction } from "@reduxjs/toolkit";
import { Product, CartItem } from "../../share/types";

interface SliceState {
  cart: CartItem[];
  totalAmount: number;
  totalPayment: number;
}

const initialState: SliceState = {
  cart: [],
  totalAmount: 0,
  totalPayment: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.totalAmount++;
      state.totalPayment += newItem.price;
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
