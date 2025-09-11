import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const RecipeCard = ({ recipe }) => {
  const [showFullSteps, setShowFullSteps] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const ingredientList = recipe.ingredients
    ? recipe.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  return (
    <motion.div
      data-aos="fade-up"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:shadow-yellow-400/20 transition-all duration-300 relative"
    >
      {recipe.category && (
        <span className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold z-10">
          {recipe.category}
        </span>
      )}

      <img
        src={recipe.image || "/assets/placeholder.jpg"}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-2 line-clamp-1">
          {recipe.name}
        </h3>

        <p className="text-xs text-gray-400 italic mb-3">
          👩‍🍳 Added by {recipe.user}
        </p>

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

        {recipe.steps && (
          <div className="mb-4">
            <p className="font-medium text-pink-400 mb-1">Steps:</p>
            <motion.p
              className="text-sm text-gray-300 leading-relaxed overflow-hidden"
              initial={{ height: 60 }}
              animate={{ height: showFullSteps ? "auto" : 60 }}
              transition={{ duration: 0.3 }}
            >
              {showFullSteps
                ? recipe.steps
                : recipe.steps.length > 100
                ? recipe.steps.slice(0, 100) + "..."
                : recipe.steps}
            </motion.p>
            {recipe.steps.length > 100 && (
              <button
                onClick={() => setShowFullSteps(!showFullSteps)}
                className="text-teal-400 text-sm mt-1 hover:underline"
              >
                {showFullSteps ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecipeCard;
