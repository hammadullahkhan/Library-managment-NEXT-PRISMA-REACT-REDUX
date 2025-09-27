import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../store/slices/booksSlice'
import BookCard from './BookCard'
import Pagination from './Pagination'
import type { AppDispatch, RootState } from '../store/store'

const CenterContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: books, loading, error, filters, pagination } = useSelector(
    (state: RootState) => state.books
  )

  useEffect(() => {
    dispatch(fetchBooks({ ...filters, page: pagination.page }))
  }, [dispatch, filters, pagination.page])

  if (loading) {
    return (
      <main className="center-content">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading books...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="center-content">
        <div className="error">
          <p>Error: {error}</p>
          <button 
            onClick={() => dispatch(fetchBooks(filters))} 
            className="btn btn-primary"
            type="button"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="center-content">
      <div className="content-header">
        <h2>
          {filters.category === 'all' ? 'All Books' : filters.category}
          <span className="book-count">({pagination.total} books)</span>
        </h2>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="no-results">
          <p>No books found matching your criteria.</p>
        </div>
      )}

      <Pagination />
    </main>
  )
}

export default CenterContent