import React, { useState, useEffect, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipes, currentUser }) => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  // Categories for filtering
  const categories = ["All", ...new Set(recipes.map((r) => r.category))];

  // Filter by category and search
  const filterRecipes = useCallback(() => {
    let temp = recipes;

    if (category !== "All") temp = temp.filter((r) => r.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      temp = temp.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q) ||
          r.ingredients?.toLowerCase().includes(q)
      );
    }

    setFilteredRecipes(temp);
  }, [recipes, category, search]);

  useEffect(() => {
    filterRecipes();
  }, [recipes, category, search, filterRecipes]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Limit to 3 recipes for preview
  const limitedRecipes = filteredRecipes.slice(0, 3);
  const showViewAll = filteredRecipes.length > 3;

  // Navigate to Menu page with highlight for newly added recipe
  const handleViewAll = () => {
    const latestRecipe = recipes[recipes.length - 1];
    navigate("/menu", { state: { highlightId: latestRecipe?.id } });
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4 text-white">
      {/* Category Buttons */}
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
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              cat === category
                ? "bg-teal-500 text-white shadow-lg scale-105"
                : "bg-gray-700 hover:bg-teal-600 hover:text-white"
            }`}
            data-aos="fade-up"
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Search Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md w-80 max-w-full text-black focus:outline-none"
        />
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {limitedRecipes.length > 0 ? (
          limitedRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              data-aos="zoom-in"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-red-400 text-lg mt-10 col-span-full"
            data-aos="zoom-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            ❌ No recipes found.
          </motion.p>
        )}
      </div>

      {/* View All Button */}
      {showViewAll && (
        <div className="text-center mt-8">
          <button
            onClick={handleViewAll}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition"
          >
            View All Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
