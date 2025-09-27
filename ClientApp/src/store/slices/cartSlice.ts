import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartState, CartItem, Book } from '../../types'

const initialState: CartState = {
  items: [],
  total: 0
}

interface UpdateQuantityPayload {
  id: number
  quantity: number
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // Check if we can add more (don't exceed stock)
        if (existingItem.quantity < action.payload.stock) {
          existingItem.quantity += 1
        }
      } else {
        // Add new item with quantity 1
        const cartItem: CartItem = {
          ...action.payload,
          quantity: 1
        }
        state.items.push(cartItem)
      }
      
      state.total = calculateTotal(state.items)
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = calculateTotal(state.items)
    },
    
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        // Ensure quantity doesn't exceed stock and is positive
        item.quantity = Math.min(Math.max(quantity, 1), item.stock)
      }
      
      state.total = calculateTotal(state.items)
    },
    
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      
      if (item && item.quantity < item.stock) {
        item.quantity += 1
      }
      
      state.total = calculateTotal(state.items)
    },
    
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          // Remove item if quantity would go to 0
          state.items = state.items.filter(cartItem => cartItem.id !== action.payload)
        }
      }
      
      state.total = calculateTotal(state.items)
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
    
    // Useful for checkout process
    updateCartItemStock: (state, action: PayloadAction<{ id: number; newStock: number }>) => {
      const { id, newStock } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        item.stock = newStock
        // If quantity exceeds new stock, reduce it
        if (item.quantity > newStock) {
          item.quantity = Math.max(newStock, 0)
        }
        // Remove item if no stock left
        if (newStock === 0) {
          state.items = state.items.filter(cartItem => cartItem.id !== id)
        }
      }
      
      state.total = calculateTotal(state.items)
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart,
  updateCartItemStock 
} = cartSlice.actions

export default cartSlice.reducer