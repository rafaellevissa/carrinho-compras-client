import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "@/store/productSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { orderReducer } from "./orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    shoppingCart: shoppingCartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
