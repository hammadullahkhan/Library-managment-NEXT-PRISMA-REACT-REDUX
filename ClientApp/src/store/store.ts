import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch