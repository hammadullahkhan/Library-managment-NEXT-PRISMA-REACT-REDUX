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
  createdAt: Date
  updatedAt: Date
}

export interface BookCreateInput {
  title: string
  author: string
  category: string
  price: number
  description: string
  stock: number
  rating?: number
  imageUrl?: string
}

export interface BookUpdateInput {
  title?: string
  author?: string
  category?: string
  price?: number
  description?: string
  stock?: number
  rating?: number
  imageUrl?: string
}

export interface BooksResponse {
  books: Book[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface BookFilters {
  page?: number
  limit?: number
  category?: string
  sortBy?: 'title' | 'author' | 'price' | 'rating' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
  search?: string
}