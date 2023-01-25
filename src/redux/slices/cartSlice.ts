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
    addOneItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.cart.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.imgURL,
          price: Number(newItem.price),
          quantity: 1,
          totalPrice: Number(newItem.price),
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.totalAmount++;
      state.totalPayment = state.cart.reduce((total, item) => {
        return total + Number(item.totalPrice);
      }, 0);
    },
    deleteOneItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalAmount--;
          state.totalPayment = state.cart.reduce((total, item) => {
            return total + Number(item.totalPrice);
          }, 0);
        }
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter((item) => item.id !== existingItem.id);
          state.totalAmount--;
          state.totalPayment = state.cart.reduce((total, item) => {
            return total + Number(item.totalPrice);
          }, 0);
        }
      }
    },
    deleteItem(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        state.cart = state.cart.filter((item) => item.id !== existingItem.id);
        state.totalAmount -= existingItem.quantity;
        state.totalPayment = state.cart.reduce((total, item) => {
          return total + item.totalPrice;
        }, 0);
      }
    },
    deleteAllItem(state, action) {
      state.cart = [];
      state.totalAmount = 0;
      state.totalPayment = 0;
    },
  },
});

export const { addOneItem, deleteOneItem, deleteItem, deleteAllItem } =
  cartSlice.actions;
export default cartSlice.reducer;
