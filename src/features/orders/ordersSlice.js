import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getUserOrders, getAllOrders, changeOrderStatus } from "../../firebase/orders";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ userId, items, total, shippingInfo }, { rejectWithValue }) => {
    try {
      return await createOrder(userId, items, total, shippingInfo);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      return await getUserOrders(userId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllOrders();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      await changeOrderStatus(orderId, status);
      return { orderId, status };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    allOrders: [],
    loading: false,
    error: null,
    lastOrder: null,
  },
  reducers: {
    clearLastOrder: (state) => { state.lastOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.loading = false; state.lastOrder = action.payload; state.items.unshift(action.payload); })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchUserOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchUserOrders.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchUserOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.loading = false; state.allOrders = action.payload; })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const order = state.allOrders.find((o) => o.id === orderId);
        if (order) order.status = status;
      });
  },
});

export const { clearLastOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
