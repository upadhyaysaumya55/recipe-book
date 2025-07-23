import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

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
    AOS.init({ duration: 1000 });
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
    <motion.div 
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-400">Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Recipe Title"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            placeholder="Ingredients"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 h-32 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
            placeholder="Steps"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 h-32 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md font-semibold shadow-md transition-all duration-300"
          >
            Update Recipe
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditRecipe;
