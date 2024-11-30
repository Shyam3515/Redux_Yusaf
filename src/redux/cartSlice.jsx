import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //if the item is already present in the items array, the index will be >= 0 [or] index will be -1
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.items[index].quantity += 1;
      } else {
        const newitem = { ...action.payload, quantity: 1 };
        state.items.push(newitem);
        state.totalQuantity += 1;
      }

      state.totalAmount += action.payload.price;
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity -= 1;
      state.totalAmount -=
        state.items[index].price * state.items[index].quantity;

      state.items.splice(index, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
