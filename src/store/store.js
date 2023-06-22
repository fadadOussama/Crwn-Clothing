import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cartSlice";
import { shopReducer } from "./shop/shopSlice";
import { userReducer } from "./user/userSlice";
import { counterReducer } from "./counter/counterSlice";
import { productReducer } from "./product/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shop: shopReducer,
    user: userReducer,
    counter: counterReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
