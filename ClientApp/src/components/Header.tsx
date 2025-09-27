import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/slices/booksSlice'
import type { AppDispatch } from '../store/store'

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(setFilters({ search: searchTerm }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>📚 BookStore</h1>
          </div>
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                🔍
              </button>
            </form>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" type="button">Login</button>
            <button className="btn btn-primary" type="button">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header