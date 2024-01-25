import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { orderApi } from "./api/orderAPI";

export const server = import.meta.env.VITE_SERVER;

export const store: any = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
