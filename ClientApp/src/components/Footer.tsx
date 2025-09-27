import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>BookStore</h4>
            <p>Your premier destination for books of all genres.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📱</a>
              <a href="#" className="social-link">📧</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Fiction</a></li>
              <li><a href="#">Non-Fiction</a></li>
              <li><a href="#">Science Fiction</a></li>
              <li><a href="#">Mystery</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BookStore Learning Project. Built with React, Next.js, Prisma & SQLite.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
