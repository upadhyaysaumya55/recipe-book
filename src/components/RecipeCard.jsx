import React from 'react';
import './RecipeCard.css';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onDelete, isOwner }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>

      {isOwner && (
        <div className="card-actions">
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
