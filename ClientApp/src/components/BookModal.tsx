import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import type { Book } from '../types'
import type { AppDispatch } from '../store/store'

interface BookModalProps {
  book: Book
  onClose: () => void
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCart = (): void => {
    dispatch(addToCart(book))
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ⭐
        </span>
      )
    }
    return stars
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image">
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} />
            ) : (
              <div className="placeholder-image">📚</div>
            )}
          </div>
          <div className="modal-info">
            <h2>{book.title}</h2>
            <p className="author">by {book.author}</p>
            <div className="rating">
              {renderStars(Math.floor(book.rating))}
              <span>({book.rating})</span>
            </div>
            <p className="category">Category: {book.category}</p>
            <p className="price">${book.price}</p>
            <p className="stock">
              {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
            </p>
            <div className="description">
              <h4>Description:</h4>
              <p>{book.description}</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                type="button"
              >
                Add to Cart
              </button>
              <button className="btn btn-outline" onClick={onClose} type="button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookModal