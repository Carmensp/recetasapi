import React from 'react'
import './FilterComponent.css'

export const FilterComponent = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div>
      <h1 className="title">Lista de Recetas</h1>
      <select
        className="filter"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
        >
        {categories.map((c) => (
          <option key={c.strCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>
    </div>
  )
}
