import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

type ShoppingCartItem = {
  id: number;
  metadata: {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
  };
  price: number;
  quantity: number;
  userId: number;
  productId: number;
};

type ShoppingCartState = {
  items: ShoppingCartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  isShoppingCartOpen: boolean;
};

const initialState: ShoppingCartState = {
  items: [],
  totalPrice: 0,
  isShoppingCartOpen: false,
  isEmpty: true,
  loading: false,
  error: null,
};

const calcTotalPrice = (items: ShoppingCartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const addShoppingCartItem = (
  shoppingCart: ShoppingCartItem[],
  newItem: ShoppingCartItem
): ShoppingCartItem[] => {
  const itemIndex = shoppingCart.findIndex(
    (item) => item.productId === newItem.productId
  );

  if (itemIndex !== -1) {
    shoppingCart[itemIndex].quantity += 1;
  } else {
    shoppingCart.push({ ...newItem, quantity: 1 });
  }

  return shoppingCart;
};

const aggregateShoppingCartItems = (
  shoppingCart: ShoppingCartItem[]
): ShoppingCartItem[] => {
  const aggregatedCart: { [productId: number]: ShoppingCartItem } = {};

  shoppingCart.forEach((item) => {
    if (aggregatedCart[item.productId]) {
      aggregatedCart[item.productId].quantity += 1;
    } else {
      aggregatedCart[item.productId] = { ...item, quantity: 1 };
    }
  });

  console.log(aggregatedCart);
  const result: ShoppingCartItem[] = Object.values(aggregatedCart);

  return result;
};

export const attach = createAsyncThunk<ShoppingCartItem, Product>(
  "shoppingCart/attach",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post<ShoppingCartItem>(
        "http://localhost:8000",
        {
          price: product.price,
          productId: product.id,
          metadata: product,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const detach = createAsyncThunk<ShoppingCartItem[], number>(
  "shoppingCart/detach",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete<ShoppingCartItem[]>(
        `http://localhost:8000/${productId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const all = createAsyncThunk<ShoppingCartItem[], void>(
  "shoppingCart/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<ShoppingCartItem[]>(
        `http://localhost:8000`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    toggleShoppingCart: (state) => {
      state.isShoppingCartOpen = !state.isShoppingCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(all.pending, (state) => {
        state.loading = true;
        state.isEmpty = true;
        state.items = [];
        state.error = null;
        state.totalPrice = 0;
      })
      .addCase(all.fulfilled, (state, action) => {
        state.loading = false;
        state.items = aggregateShoppingCartItems(action.payload);
        state.isEmpty = action.payload.length <= 0;
        state.totalPrice = calcTotalPrice(state.items);
      })
      .addCase(all.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(detach.pending, (state) => {
        state.loading = true;
      })
      .addCase(detach.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.productId != action.meta.arg
        );
        state.isEmpty = state.items.length <= 0;
        state.error = null;
        state.totalPrice = calcTotalPrice(state.items);
      })
      .addCase(detach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(attach.pending, (state) => {
        state.loading = true;
      })
      .addCase(attach.fulfilled, (state, action) => {
        state.loading = false;
        state.items = addShoppingCartItem(state.items, action.payload);
        state.isEmpty = state.items.length <= 0;
        state.error = null;
        state.totalPrice = calcTotalPrice(state.items);
      })
      .addCase(attach.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
