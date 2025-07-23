import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RecipeCard = ({ recipe, onDelete, isOwner }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  return (
    <motion.div
      data-aos="fade-up"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 m-4 border border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
      <p className="mb-1">
        <span className="font-medium text-teal-400">Category:</span> {recipe.category}
      </p>
      <p className="mb-1">
        <span className="font-medium text-yellow-400">Ingredients:</span> {recipe.ingredients}
      </p>
      <p className="mb-4">
        <span className="font-medium text-pink-400">Steps:</span> {recipe.steps}
      </p>

      {isOwner && (
        <div className="flex gap-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300"
            onClick={handleEdit}
          >
            Edit
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition duration-300"
            onClick={() => onDelete(recipe.id)}
          >
            Delete
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default RecipeCard;
