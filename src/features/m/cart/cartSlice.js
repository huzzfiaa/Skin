import { createSlice } from "@reduxjs/toolkit";

// ── Load cart from localStorage on app start ──
const loadCart = () => {
  try {
    const saved = localStorage.getItem("lumiere_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// ── Save cart to localStorage on every change ──
const saveCart = (items) => {
  try {
    localStorage.setItem("lumiere_cart", JSON.stringify(items));
  } catch {
    console.error("Failed to save cart");
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.product.id === id);
      if (item) item.quantity = quantity;
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("lumiere_cart");
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;