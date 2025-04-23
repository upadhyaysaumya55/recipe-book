import React from 'react';
import RecipeCard from './RecipeCard';
import './Menu.css';

const Menu = ({ recipes }) => {
  return (
    <div className="menu-page">
      <h1 className="menu-title">Explore Our Delicious Menu</h1>
      <div className="menu-grid">
        {recipes.length ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p className="no-recipes">No recipes available. Add some tasty dishes!</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
