import { RootState } from "./store";
export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectTotalPayment = (state: RootState) => state.cart.totalPayment;
