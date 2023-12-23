// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { SellerReducer } from "./reducers/seller";

const Store = configureStore({
  reducer: {
    user: userReducer,
    shop:SellerReducer,
  },
  // Add middleware or other store customization here if needed
});

export default Store;
