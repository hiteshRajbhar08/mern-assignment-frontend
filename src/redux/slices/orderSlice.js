import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setCreateOrder: (state, action) => {
      state.order = action.payload;
      state.success = true;
      state.loading = false;
    },
    setOrderReset: (state, action) => {
      state.order = {};
      state.success = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const orderReducer = orderSlice.reducer;
const orderActions = orderSlice.actions;

export { orderReducer, orderActions };
