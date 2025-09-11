import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeForm = ({ recipes = [], setRecipes }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !ingredients || !steps || !category) {
      toast.error("⚠️ Please fill out all required fields!", { autoClose: 2000 });
      return;
    }

    // Fallback: ensure recipes is always an array
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const newRecipe = {
      id: Date.now(),
      name,
      ingredients,
      steps,
      image: image || "",
      category,
      user: currentUser?.email || currentUser?.name || "guest",
      createdAt: new Date().toISOString(),
    };

    const updatedRecipes = [...storedRecipes, newRecipe];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipes && setRecipes(updatedRecipes);

    toast.success("✅ Recipe added to menu!", { autoClose: 2000 });

    // Reset form
    setName("");
    setIngredients("");
    setSteps("");
    setImage("");
    setCategory("");

    // Navigate to Menu after short delay with highlight
    setTimeout(() => navigate("/menu", { state: { highlightId: newRecipe.id } }), 800);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center px-4 py-16">
        <motion.form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full max-w-2xl bg-[#1e1e2f]/90 backdrop-blur-lg shadow-2xl text-white rounded-2xl p-10 space-y-6"
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center text-teal-300">
            Add New Recipe
          </motion.h2>

          {!currentUser && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-center font-medium">
              🔒 You need to log in before submitting a recipe.
            </div>
          )}

          <input
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-[#2e2e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            required
          />

          <textarea
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-4 py-3 h-24 bg-[#2e2e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
            required
          />

          <textarea
            placeholder="Preparation Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-4 py-3 h-24 bg-[#2e2e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none"
            required
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-3 bg-[#2e2e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-[#2e2e3f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            required
          >
            <option value="">Select Category</option>
            <option value="Breakfast">🍳 Breakfast</option>
            <option value="Lunch">🥗 Lunch</option>
            <option value="Dinner">🍲 Dinner</option>
            <option value="Snacks">🍩 Snacks</option>
          </select>

          <motion.button
            type="submit"
            disabled={!currentUser}
            className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
              currentUser
                ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
            whileTap={currentUser ? { scale: 0.95 } : {}}
          >
            ➕ Add Recipe
          </motion.button>
        </motion.form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RecipeForm;
