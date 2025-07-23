import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import ComplementaryFeatures from './components/ComplementaryFeatures';
import About from './components/About';
import Menu from './components/Menu';
import Shop from './components/Shop';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Careers from './components/Careers';
import Cart from './components/Cart';
import Reservation from './components/Reservation';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import NewEmail from './components/NewEmail';
import EditRecipe from './components/EditRecipe';
import Testimonials from "./components/Testimonials";
import Contact from './components/Contact';
import Footer from './components/Footer';

// ✅ Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ✅ Home component with Add Recipe scroll support and working SearchBar
function Home({ recipes, setRecipes, search, setSearch, addRecipe }) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  // Sync filteredRecipes whenever recipes change
  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [recipes, search]);

  const handleSearch = (query) => {
    setSearch(query);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ComplementaryFeatures />

      <section className="bg-gradient-to-b from-[#101018] to-[#0d0d12] py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch} // ✅ Pass working onSearch
          />

          {/* ✅ Form section with ID for scroll target */}
          <div className="mt-10" id="recipe-form">
            <RecipeForm addRecipe={addRecipe} />
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-400" data-aos="fade-up">
              Browse Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.length ? (
                filteredRecipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-300">No recipes found</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Testimonials recipes={recipes} />
      <Contact />
      <Footer />
    </>
  );
}

// ✅ Main App component
function App() {
  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : [];
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
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
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu recipes={recipes} />} />
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
          <Route path="/edit-recipe/:id" element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
