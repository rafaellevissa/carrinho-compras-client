import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ShoppingCartItem } from "./shoppingCartSlice";

interface OrderState {
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  loading: false,
  error: null,
};

export const checkout = createAsyncThunk<
  void,
  ShoppingCartItem[],
  { rejectValue: string }
>("order/checkout", async (shoppingCart, { rejectWithValue }) => {
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
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: OrderState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: OrderState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    builder
      .addCase(checkout.pending, handlePending)
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkout.rejected, handleRejected);
  },
});

export const orderReducer = orderSlice.reducer;
