import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
};

type ProductResponse = {
  page: number;
  perPage: number;
  data: Product[];
};

type ProductState = {
  products: Product[];
  product: Product | null;
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
  product: null,
  isShoppingCartOpen: false,
  isEmpty: true,
  loading: false,
  error: null,
};

export const fetchProductState = createAsyncThunk<
  Product[],
  FetchProductStateParams,
  { rejectValue: string }
>(
  "product/fetchProductState",
  async ({ page = 1, take = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get<ProductResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/product?page=${page}&take=${take}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("product/fetchProductById", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product>(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
    );
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

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
    const handlePending = (state: ProductState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: ProductState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    builder
      .addCase(fetchProductState.pending, handlePending)
      .addCase(fetchProductState.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.isEmpty = action.payload.length === 0;
      })
      .addCase(fetchProductState.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.isEmpty = false;
      })
      .addCase(fetchProductById.rejected, handleRejected);
  },
});

export const { setProductState } = productSlice.actions;
export const productReducer = productSlice.reducer;
