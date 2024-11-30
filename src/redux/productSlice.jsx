import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

/**reducers right now to this reducer it, means that it has the pure function okay it is just changing our state whenever,
we are using these reducers we are defining few function inside these.

When to Use Each?
Use Reducers When: You want to define local state transitions for actions originating within the slice.
Use Extra Reducers When: You need the slice to handle actions that are defined outside of the slice, such as shared actions or async thunks.


Key Differences Between Reducers and Extra Reducers
Feature	             Reducers	                                             Extra Reducers
Purpose	    Handle actions within the slice	Handle                   actions outside the slice
Defined     In	reducers property of createSlice	                   extraReducers property of createSlice
Usage	      For state transitions specific to the slice	             To respond to external or async actions
Typical     Actions	Local actions created via createSlice	           External actions or createAsyncThunk lifecycle actions

*/

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    // action is the data that we have returned
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload; //we just assign the data that we returned to our products
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message; //we just assign the data that we returned to our products
    });
  },
});

export default productSlice.reducer;
