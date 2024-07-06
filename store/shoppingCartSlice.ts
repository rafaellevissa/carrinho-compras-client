import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export type ShoppingCartItem = {
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
  itemsCount: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  isShoppingCartOpen: boolean;
};

const initialState: ShoppingCartState = {
  items: [],
  itemsCount: 0,
  totalPrice: 0,
  isShoppingCartOpen: false,
  isEmpty: true,
  loading: false,
  error: null,
};

const calcTotalPrice = (items: ShoppingCartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const calcItemsCount = (items: ShoppingCartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const addShoppingCartItem = (
  shoppingCart: ShoppingCartItem[],
  newItem: ShoppingCartItem
): ShoppingCartItem[] => {
  const existingItemIndex = shoppingCart.findIndex(
    (item) => item.productId === newItem.productId
  );

  if (existingItemIndex !== -1) {
    shoppingCart[existingItemIndex] = {
      ...shoppingCart[existingItemIndex],
      quantity: shoppingCart[existingItemIndex].quantity + 1,
    };
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

  return Object.values(aggregatedCart);
};

export const attach = createAsyncThunk<ShoppingCartItem, Product>(
  "shoppingCart/attach",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post<ShoppingCartItem>(
        `${process.env.NEXT_PUBLIC_API_URL}/shopping-cart`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/shopping-cart/${productId}`
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
        `${process.env.NEXT_PUBLIC_API_URL}/shopping-cart`
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
    const handlePending = (state: ShoppingCartState) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state: ShoppingCartState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    const handleFulfilledAll = (state: ShoppingCartState, action: any) => {
      state.loading = false;
      state.items = aggregateShoppingCartItems(action.payload);
      state.itemsCount = calcItemsCount(state.items);
      state.isEmpty = state.items.length === 0;
      state.totalPrice = calcTotalPrice(state.items);
    };

    const handleFulfilledDetach = (state: ShoppingCartState, action: any) => {
      state.loading = false;
      state.items = state.items.filter(
        (item) => item.productId !== action.meta.arg
      );
      state.itemsCount = calcItemsCount(state.items);
      state.isEmpty = state.items.length === 0;
      state.totalPrice = calcTotalPrice(state.items);
    };

    const handleFulfilledAttach = (state: ShoppingCartState, action: any) => {
      state.loading = false;
      state.items = addShoppingCartItem(state.items, action.payload);
      state.itemsCount = calcItemsCount(state.items);
      state.isEmpty = state.items.length === 0;
      state.totalPrice = calcTotalPrice(state.items);
    };

    builder
      .addCase(all.pending, handlePending)
      .addCase(all.fulfilled, handleFulfilledAll)
      .addCase(all.rejected, handleRejected)
      .addCase(detach.pending, handlePending)
      .addCase(detach.fulfilled, handleFulfilledDetach)
      .addCase(detach.rejected, handleRejected)
      .addCase(attach.pending, handlePending)
      .addCase(attach.fulfilled, handleFulfilledAttach)
      .addCase(attach.rejected, handleRejected);
  },
});

export const { toggleShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
