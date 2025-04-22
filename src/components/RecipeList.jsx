import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onEdit, onDelete, currentUser }) => {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(recipes.map((r) => r.category))];

  const filtered = category === 'All' 
    ? recipes 
    : recipes.filter((r) => r.category === category);

  return (
    <div className="recipe-list-container">
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? 'active' : ''}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="recipe-grid">
        {filtered.map((recipe, index) => (
          <RecipeCard 
            key={index} 
            recipe={recipe} 
            onEdit={() => onEdit(recipe)} 
            onDelete={() => onDelete(recipe.id)} 
            isOwner={recipe.user === currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
