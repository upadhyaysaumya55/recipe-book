import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRecipe.css';

const EditRecipe = ({ recipes, setRecipes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    category: '',
  });

  useEffect(() => {
    const recipe = recipes.find((r) => r.id === Number(id));
    if (recipe) {
      setFormData(recipe);
    }
  }, [id, recipes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = recipes.map((r) =>
      r.id === Number(id) ? { ...formData } : r
    );
    setRecipes(updated);
    localStorage.setItem('recipes', JSON.stringify(updated));
    navigate('/');
  };

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
