import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],        // array of { id, name, price, image, quantity, totalPrice }
  totalQuantity: 0, // total items count
  totalAmount: 0,   // total price
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity++;
      const existing = state.items.find(item => item.id === newItem.id);
      if (!existing) {
        state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
      } else {
        existing.quantity++;
        existing.totalPrice += newItem.price;
      }
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    incrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalAmount += item.price;
      }
    },
    decrementQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalAmount -= item.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.totalAmount -= existing.totalPrice;
        state.items = state.items.filter(i => i.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart, // ✅ export this too
} = cartSlice.actions;

export default cartSlice.reducer;
