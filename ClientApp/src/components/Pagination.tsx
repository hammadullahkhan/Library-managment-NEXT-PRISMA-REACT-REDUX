import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../store/slices/booksSlice'
import type { RootState, AppDispatch } from '../store/store'

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { pagination, filters } = useSelector((state: RootState) => state.books)
  const { page, pages, total } = pagination

  const handlePageChange = (newPage: number): void => {
    dispatch(fetchBooks({ ...filters, page: newPage }))
  }

  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(pages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  if (pages <= 1) return null

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {((page - 1) * 12) + 1} - {Math.min(page * 12, total)} of {total} books
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          type="button"
        >
          First
        </button>
        
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          type="button"
        >
          Previous
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`pagination-btn ${pageNum === page ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNum)}
            type="button"
          >
            {pageNum}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
          type="button"
        >
          Next
        </button>

        <button
          className="pagination-btn"
          onClick={() => handlePageChange(pages)}
          disabled={page === pages}
          type="button"
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default Pagination