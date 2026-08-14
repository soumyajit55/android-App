import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => !(i.id === id && i.selectedSize === selectedSize)
      );
    },
    updateQuantity: (state, action) => {
      const { id, selectedSize, type } = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (i) => i.id === id && i.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        if (type === 'increase') {
          state.cartItems[existingIndex].quantity += 1;
        } else if (type === 'decrease') {
          if (state.cartItems[existingIndex].quantity > 1) {
            state.cartItems[existingIndex].quantity -= 1;
          } else {
            state.cartItems.splice(existingIndex, 1);
          }
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;