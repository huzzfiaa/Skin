import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/m/auth/authSlice";
import productsReducer from "../features/m/products/productsSlice";
import cartReducer from "../features/m/cart/cartSlice";
import ordersReducer from "../features/m/order/orderSlice";
import uiReducer from "../features/m/ui/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    ui: uiReducer,
  },
});

export default store;