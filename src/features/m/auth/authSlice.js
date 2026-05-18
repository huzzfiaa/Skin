import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  loading: false,
  authReady: false, // ✅ added
  error: null,
};
 
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
      state.role = action.payload.role;
    },

    // ✅ added
    setAuthReady: (state) => {
      state.authReady = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
      state.authReady = false; // ✅ reset on logout
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout, setAuthReady } = // ✅ export setAuthReady
  authSlice.actions;

export default authSlice.reducer;