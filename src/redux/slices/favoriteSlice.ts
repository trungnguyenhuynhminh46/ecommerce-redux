import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../share/types";

interface SliceState {
  favoriteItems: Product[];
}

const initialState: SliceState = {
  favoriteItems: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      product && state.favoriteItems.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const product_id = action.payload;
      if (product_id) {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.id !== product_id
        );
      }
    },
  },
});

export const { addProduct, deleteProduct } = favoriteSlice.actions;
export default favoriteSlice.reducer;
