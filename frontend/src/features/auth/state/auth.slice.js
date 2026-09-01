import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    successMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const { setUser, setLoading, setError, setSuccessMessage, clearError } = authSlice.actions;

export default authSlice.reducer;
