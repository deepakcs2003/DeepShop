import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  deleteItem: "",
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Add item to the cart
      state.cartItems=action.payload // Assuming payload is the item object
    },
    removeFromCart: (state, action) => {
      // Remove item from the cart based on productId
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      state.deleteItem = action.payload;
    },
    updateCart: (state, action) => {
      const { id, quantityChange } = action.payload; // Expect payload to contain id and the change in quantity

      const existingItem = state.cartItems.find(item => item.productId === id);
      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += quantityChange;

        // If the quantity reaches zero, remove the item from the cart
        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter(item => item.productId !== id);
        }
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
