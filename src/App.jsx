// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RecipeForm from "./components/RecipeForm";
import RecipeCard from "./components/RecipeCard";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ComplementaryFeatures from "./components/ComplementaryFeatures";
import About from "./components/About";
import Menu from "./components/Menu";
import Shop from "./components/Shop";
import Blog from "./components/Blog";
import Gallery from "./components/Gallery";
import Careers from "./components/Careers";
import Cart from "./components/Cart";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import NewEmail from "./components/NewEmail";
import EditRecipe from "./components/EditRecipe";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home component with "View All Recipes" feature
function Home({ recipes, setRecipes, search, setSearch, addRecipe }) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [showViewAll, setShowViewAll] = useState(false); // ✅ New state
  const navigate = useNavigate();

  useEffect(() => {
    const q = search.toLowerCase();
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(q) ||
        recipe.category.toLowerCase().includes(q) ||
        recipe.ingredients.toLowerCase().includes(q)
    );
    setFilteredRecipes(filtered);

    // Show "View All" button if more than 3 recipes exist
    setShowViewAll(recipes.length > 3);
  }, [recipes, search]);

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleDelete = (id) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleViewAll = () => {
    navigate("/menu");
  };

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ComplementaryFeatures />

      <section className="bg-gradient-to-b from-[#101018] to-[#0d0d12] py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />

          {/* Form */}
          <div className="mt-10" id="recipe-form">
            <RecipeForm addRecipe={addRecipe} />
          </div>

          {/* Recipes */}
          <div className="mt-16">
            <h2
              className="text-3xl font-bold mb-6 text-center text-teal-400"
              data-aos="fade-up"
            >
              Browse Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.length ? (
                filteredRecipes.slice(0, 3).map((recipe) => (
                  <div key={recipe.id} className="relative">
                    <RecipeCard
                      recipe={recipe}
                      onDelete={() => handleDelete(recipe.id)}
                      isOwner={true}
                    />

                    <div className="flex justify-center gap-3 mt-3">
                      <button
                        onClick={() => handleEdit(recipe.id)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(recipe.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-300">
                  No recipes found
                </p>
              )}
            </div>

            {/* View All Recipes Button */}
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
        </div>
      </section>

      <Testimonials recipes={recipes} />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem("recipes");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("⚠️ Error parsing recipes:", err);
      return [];
    }
  });

  const [search, setSearch] = useState("");

  // Keep localStorage always in sync
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addRecipe = (newRecipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <div className="font-sans bg-black min-h-screen text-white pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                setRecipes={setRecipes}
                search={search}
                setSearch={setSearch}
                addRecipe={addRecipe}
              />
            }
          />
          <Route path="/menu" element={<Menu recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/new-email" element={<NewEmail />} />
          <Route path="/edit-recipe" element={<EditRecipe />} />
          <Route
            path="/edit-recipe/:id"
            element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
