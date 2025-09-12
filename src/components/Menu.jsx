// src/components/Menu.jsx
import React, { useEffect, useState, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";

const Menu = ({ recipes = [], currentUser, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Filter recipes
  const filterRecipes = useCallback(
    (query) => {
      if (!query.trim()) {
        setFilteredRecipes(recipes);
      } else {
        const q = query.toLowerCase();
        const filtered = recipes.filter(
          (recipe) =>
            recipe.name?.toLowerCase().includes(q) ||
            recipe.category?.toLowerCase().includes(q) ||
            recipe.ingredients?.toLowerCase().includes(q)
        );
        setFilteredRecipes(filtered);
      }
    },
    [recipes]
  );

  useEffect(() => {
    filterRecipes(search);
  }, [recipes, search, filterRecipes]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ Highlight newly added recipe with smooth effect
  useEffect(() => {
    const highlightId = location.state?.highlightId;
    if (highlightId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`recipe-${highlightId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-4", "ring-yellow-500", "transition-all", "duration-1000");
          // Remove highlight after delay
          setTimeout(() => {
            el.classList.remove("ring-4", "ring-yellow-500");
          }, 3000);
        }
      }, 100); // small delay to ensure DOM is rendered
      return () => clearTimeout(timer);
    }
  }, [location.state, filteredRecipes]);

  const handleSearch = (query) => {
    setSearch(query);
    filterRecipes(query);
  };

  const handleEdit = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <h1
        className="text-4xl md:text-5xl font-bold text-center text-white mb-6"
        data-aos="fade-down"
      >
        Explore Our Delicious Menu
      </h1>

      <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />

      {filteredRecipes.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredRecipes.map((recipe) => {
            const isOwner = currentUser && recipe.user === currentUser.email;
            const isHighlight = location.state?.highlightId === recipe.id;

            return (
              <div
                key={recipe.id}
                id={`recipe-${recipe.id}`}
                className={`relative ${isHighlight ? "ring-yellow-500" : ""}`}
              >
                {/* Card */}
                <RecipeCard recipe={recipe} isOwner={false} />

                {/* Edit/Delete only if user owns recipe */}
                {isOwner && (
                  <div className="flex justify-end gap-2 mt-4 mb-6">
                    <button
                      onClick={() => handleEdit(recipe.id)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(recipe.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-red-400 text-lg mt-10"
          data-aos="zoom-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          ❌ No recipes found. Try searching with a different name, category, or ingredient!
        </motion.p>
      )}
    </div>
  );
};

export default Menu;
