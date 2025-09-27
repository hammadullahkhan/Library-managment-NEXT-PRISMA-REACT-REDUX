import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import type { RootState, AppDispatch } from '../store/store'

const RightPanel: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  const handleQuantityChange = (id: number, quantity: number): void => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id: number): void => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = (): void => {
    dispatch(clearCart())
  }

  const handleCheckout = (): void => {
    // Implement checkout logic
    alert('Checkout functionality would be implemented here!')
  }

  return (
    <aside className="right-panel">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        {items.length > 0 && (
          <button className="clear-cart-btn" onClick={handleClearCart} type="button">
            Clear All
          </button>
        )}
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>🛒 Your cart is empty</p>
            <p>Add some books to get started!</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h4 className="item-title">{item.title}</h4>
                <p className="item-author">{item.author}</p>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  type="button"
                >
                  🗑️
                </button>
              </div>
              <div className="item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={handleCheckout} type="button">
            Proceed to Checkout
          </button>
        </div>
      )}

      <div className="panel-section">
        <h4>Quick Stats</h4>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Items in Cart:</span>
            <span className="stat-value">{items.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Books:</span>
            <span className="stat-value">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default RightPanel