import React, { useState } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ addRecipe }) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !ingredients || !steps || !image || !category) {
            alert('Please fill out all fields');
            return;
        }

        const newRecipe = {
            name,
            ingredients,
            steps,
            image,
            category,
        };

        addRecipe(newRecipe);

        setName('');
        setIngredients('');
        setSteps('');
        setImage('');
        setCategory('');
    };

    return (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <h2>Add New Recipe</h2>
            <input
                type="text"
                placeholder="Recipe Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Ingredients (comma separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <textarea
                placeholder="Preparation Steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
            </select>
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;