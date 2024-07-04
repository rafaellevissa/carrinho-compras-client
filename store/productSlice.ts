import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
};

type ProductResponse = {
  page: number;
  perPage: number;
  data: Product[];
};

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  isShoppingCartOpen: boolean;
};

type FetchProductStateParams = {
  page: number;
  take: number;
};

const initialState: ProductState = {
  products: [],
  isShoppingCartOpen: false,
  isEmpty: true,
  loading: false,
  error: null,
};

export const fetchProductState = createAsyncThunk<
  Product[],
  FetchProductStateParams
>(
  "product/fetchProductState",
  async ({ page = 1, take = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProductResponse>(
        `http://localhost:8001?page=${page}&take=${take}`
      );

      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductState: (state, action) => {
      state.products = action.payload;
      state.isEmpty = action.payload.length === 0;
    },
    toggleShoppingCart: (state) => {
      state.isShoppingCartOpen = !state.isShoppingCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductState.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.isEmpty = action.payload.length <= 0;
      })
      .addCase(fetchProductState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProductState } = productSlice.actions;
export const productReducer = productSlice.reducer;
