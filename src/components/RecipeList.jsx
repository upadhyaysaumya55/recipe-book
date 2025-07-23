import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

const RecipeList = ({ recipes, onEdit, onDelete, currentUser }) => {
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(recipes.map((r) => r.category))];

  const filtered = category === 'All'
    ? recipes
    : recipes.filter((r) => r.category === category);

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4 text-white">
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 
              ${cat === category 
                ? 'bg-teal-500 text-white shadow-lg scale-105' 
                : 'bg-gray-700 hover:bg-teal-600 hover:text-white'}
            `}
            data-aos="fade-up"
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {filtered.map((recipe, index) => (
          <motion.div 
            key={index}
            data-aos="zoom-in"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <RecipeCard 
              recipe={recipe}
              onEdit={() => onEdit(recipe)}
              onDelete={() => onDelete(recipe.id)}
              isOwner={recipe.user === currentUser}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
