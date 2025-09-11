// src/components/Menu.jsx
import React, { useEffect, useState, useCallback } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Menu = ({ recipes, setRecipes, currentUser }) => {
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Filter recipes based on search
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

  // Update filtered recipes whenever recipes or search changes
  useEffect(() => {
    filterRecipes(search);
  }, [recipes, search, filterRecipes]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleDelete = (id, recipeUser) => {
    if (!currentUser || recipeUser !== currentUser) return;
    const updatedRecipes = recipes.filter((r) => r.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const handleSearch = (query) => {
    setSearch(query);
    filterRecipes(query);
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

      {currentUser && (
        <div className="text-center mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold shadow-md transition"
          >
            ➕ Add New Recipe
          </button>
        </div>
      )}

      {filteredRecipes.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              isOwner={currentUser && recipe.user === currentUser}
            />
          ))}
        </motion.div>
      ) : (
        search.trim() && (
          <motion.p
            className="text-center text-red-400 text-lg mt-10"
            data-aos="zoom-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            ❌ No recipes found. Try searching with a different name, category, or ingredient!
          </motion.p>
        )
      )}
    </div>
  );
};

export default Menu;
