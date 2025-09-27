export interface Book {
  id: number
  title: string
  author: string
  category: string
  price: number
  description: string
  stock: number
  rating: number
  imageUrl?: string | null
  createdAt: string
  updatedAt: string
}

export interface CartItem extends Book {
  quantity: number
}

export interface BookFilters {
  category: string
  search: string
  sortBy: 'title' | 'author' | 'price' | 'rating'
  sortOrder: 'asc' | 'desc'
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface BooksResponse {
  books: Book[]
  pagination: Pagination
}

export interface BooksState {
  items: Book[]
  categories: string[]
  pagination: Pagination
  filters: BookFilters
  loading: boolean
  error: string | null
}

export interface CartState {
  items: CartItem[]
  total: number
}

export interface RootState {
  books: BooksState
  cart: CartState
}