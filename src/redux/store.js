import { configureStore } from '@reduxjs/toolkit'

import cart from './slice/cartSlice'

export const store = configureStore({
  reducer: {
    
    cartData:cart,

  },
})