// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
  // Add middleware or other store customization here if needed
});

export default Store;
