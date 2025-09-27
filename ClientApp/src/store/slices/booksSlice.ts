import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '../../services/api'
import type { BooksState, Book, BookFilters, BooksResponse } from '../../types'

interface FetchBooksParams extends BookFilters {
  page?: number
}

export const fetchBooks = createAsyncThunk<
  BooksResponse,
  FetchBooksParams,
  { rejectValue: string }
>(
  'books/fetchBooks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get<BooksResponse>('/books', { params })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch books')
    }
  }
)

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>(
  'books/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<string[]>('/categories')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch categories')
    }
  }
)

export const createBook = createAsyncThunk<
  Book,
  Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  'books/createBook',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await api.post<Book>('/books', bookData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create book')
    }
  }
)

export const updateBook = createAsyncThunk<
  Book,
  { id: number; data: Partial<Book> },
  { rejectValue: string }
>(
  'books/updateBook',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put<Book>(`/books/${id}`, data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update book')
    }
  }
)

export const deleteBook = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  'books/deleteBook',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/books/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete book')
    }
  }
)

const initialState: BooksState = {
  items: [],
  categories: [],
  pagination: { 
    page: 1, 
    limit: 12, 
    total: 0, 
    pages: 0 
  },
  filters: { 
    category: 'all', 
    search: '', 
    sortBy: 'title', 
    sortOrder: 'asc' 
  },
  loading: false,
  error: null
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<BookFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
      // Reset to first page when filters change
      state.pagination.page = 1
    },
    clearFilters: (state) => {
      state.filters = { 
        category: 'all', 
        search: '', 
        sortBy: 'title', 
        sortOrder: 'asc' 
      }
      state.pagination.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.books
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch books'
      })
      
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch categories'
      })
      
      // Create Book
      .addCase(createBook.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload) // Add to beginning of array
        state.pagination.total += 1
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create book'
      })
      
      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.error = null
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex(book => book.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update book'
      })
      
      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.error = null
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter(book => book.id !== action.payload)
        state.pagination.total -= 1
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete book'
      })
  }
})

export const { setFilters, clearFilters, setPage, clearError } = booksSlice.actions
export default booksSlice.reducer