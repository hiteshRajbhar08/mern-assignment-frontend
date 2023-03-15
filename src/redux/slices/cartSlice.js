import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
  },
  reducers: {
    setCartAddItems: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existingItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    setCartRemoveItem: (state, action) => {
      state.cartItems = [...state.cartItems].filter(
        (x) => x.product !== action.payload
      );
    },
  },
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export { cartReducer, cartActions };
