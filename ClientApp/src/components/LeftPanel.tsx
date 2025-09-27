import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, setFilters } from '../store/slices/booksSlice'
import type { AppDispatch, RootState } from '../store/store'
import type { BookFilters } from '../types'

const LeftPanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, filters } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryChange = (category: string): void => {
    dispatch(setFilters({ category }))
  }

  const handleSortChange = (
    sortBy: BookFilters['sortBy'], 
    sortOrder: BookFilters['sortOrder']
  ): void => {
    dispatch(setFilters({ sortBy, sortOrder }))
  }

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleSortChange(e.target.value as BookFilters['sortBy'], filters.sortOrder)
  }

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSortChange(filters.sortBy, e.target.value as BookFilters['sortOrder'])
  }

  return (
    <aside className="left-panel">
      <div className="panel-section">
        <h3>Categories</h3>
        <div className="category-list">
          <button
            type="button"
            className={`category-item ${filters.category === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-item ${filters.category === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3>Sort By</h3>
        <div className="sort-options">
          <select
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="sort-select"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          <div className="sort-order">
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={filters.sortOrder === 'asc'}
                onChange={handleSortOrderChange}
              />
              Ascending
            </label>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={filters.sortOrder === 'desc'}
                onChange={handleSortOrderChange}
              />
              Descending
            </label>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3>Price Range</h3>
        <div className="price-filter">
          <input type="range" min="0" max="50" className="price-slider" />
          <div className="price-labels">
            <span>$0</span>
            <span>$50+</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default LeftPanel