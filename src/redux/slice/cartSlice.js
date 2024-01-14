import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'CartData',
  initialState,
  reducers: {
    addItem: (state, action) => {

      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      console.log(existingItem);
      if (existingItem) {
        // If the item is already present, increment the quantity
        console.log(state.cart[0]);
        existingItem.qnty += 1;
      } else {
        // If the item is not present, add it to the cart
        state.cart = [...state.cart, { ...item, qnty: 1 }]

      }
    },
    removeSingleItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        if (existingItem.qnty > 1) {
          existingItem.qnty -= 1;
        } else {
          state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id);
        }
      }
    },
    deleteItem: (state, action) => { 
      const item= action.payload

      state.cart = state.cart.filter((cartItem) => cartItem.id !== item)


    },
    clearCart: (state, action) => {
      state.cart = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeSingleItem, clearCart, deleteItem } = cartSlice.actions

export default cartSlice.reducer