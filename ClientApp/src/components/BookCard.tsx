import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import BookModal from './BookModal'
import type { Book } from '../types'
import type { AppDispatch } from '../store/store'

interface BookCardProps {
  book: Book
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    dispatch(addToCart(book))
  }

  const handleCardClick = (): void => {
    setShowModal(true)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
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
    <>
      <div className="book-card" onClick={handleCardClick}>
        <div className="book-image">
          {book.imageUrl ? (
            <img src={book.imageUrl} alt={book.title} />
          ) : (
            <div className="placeholder-image">📚</div>
          )}
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            {renderStars(Math.floor(book.rating))}
            <span className="rating-text">({book.rating})</span>
          </div>
          <div className="book-category">{book.category}</div>
          <div className="book-price">${book.price}</div>
          <div className="book-stock">
            {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
          </div>
        </div>
        <div className="book-actions">
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={book.stock === 0}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {showModal && (
        <BookModal book={book} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default BookCard