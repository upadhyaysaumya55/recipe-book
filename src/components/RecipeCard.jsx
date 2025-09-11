// src/components/RecipeCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const RecipeCard = ({ recipe, onDelete, isOwner }) => {
  const navigate = useNavigate();
  const [showFullSteps, setShowFullSteps] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const ingredientList = recipe?.ingredients
    ? recipe.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
    : [];

  const stepsText = recipe?.steps || "";

  return (
    <motion.div
      data-aos="fade-up"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-yellow-400/20 transition-all duration-300 relative"
    >
      {/* Category Badge */}
      {recipe?.category && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold z-10">
          {recipe.category}
        </span>
      )}

      {/* Recipe Image */}
      <img
        src={recipe.image || "/assets/placeholder.jpg"}
        alt={recipe.name || "Recipe Image"}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        {/* Recipe Name */}
        <h3 className="text-2xl font-semibold text-yellow-300 mb-2 line-clamp-1">
          {recipe.name || "Untitled Recipe"}
        </h3>

        {/* Added by */}
        {recipe.user && (
          <p className="text-xs text-gray-400 italic mb-3">
            👩‍🍳 Added by <span className="text-gray-300">{recipe.user}</span>
          </p>
        )}

        {/* Ingredients */}
        {ingredientList.length > 0 && (
          <div className="mb-3">
            <p className="font-medium text-yellow-400 mb-1">Ingredients:</p>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              {ingredientList.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps */}
        {stepsText && (
          <div className="mb-4">
            <p className="font-medium text-pink-400 mb-1">Steps:</p>
            <motion.p
              className="text-sm text-gray-300 leading-relaxed overflow-hidden"
              initial={{ height: 60 }}
              animate={{ height: showFullSteps ? "auto" : 60 }}
              transition={{ duration: 0.3 }}
            >
              {showFullSteps
                ? stepsText
                : stepsText.length > 100
                ? stepsText.slice(0, 100) + "..."
                : stepsText}
            </motion.p>
            {stepsText.length > 100 && (
              <button
                onClick={() => setShowFullSteps(!showFullSteps)}
                className="text-teal-400 text-sm mt-1 hover:underline"
              >
                {showFullSteps ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        )}

        {/* Edit & Delete Buttons */}
        {isOwner && (
          <div className="flex flex-wrap gap-3 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300"
            >
              ✏️ Edit
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(recipe.id, recipe.user)}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition duration-300"
            >
              🗑️ Delete
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;
