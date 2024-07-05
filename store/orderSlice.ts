import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ShoppingCartItem } from "./shoppingCartSlice";

type OrderState = {
  loading: boolean;
  error: any;
};

const initialState: OrderState = {
  loading: false,
  error: null,
};

export const checkout = createAsyncThunk<void, ShoppingCartItem[]>(
  "order/checkout",
  async (shoppingCart, { rejectWithValue }) => {
    try {
      const order = shoppingCart.map(({ productId, quantity, metadata }) => ({
        productId,
        quantity,
        productName: metadata.name,
      }));

      await axios.post<any>(`${process.env.NEXT_PUBLIC_API_URL}/order`, order);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const orderReducer = orderSlice.reducer;
