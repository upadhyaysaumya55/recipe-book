import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeForm from './components/RecipeForm';
import RecipeCard from './components/RecipeCard';
import SearchBar from './components/SearchBar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import ComplementaryFeatures from './components/ComplementaryFeatures';
import About from './components/About';
import Menu from './components/Menu';
import Shop from './components/Shop';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Careers from './components/Careers';
import Cart from './components/Cart'
import Reservation from './components/Reservation';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import NewEmail from './components/NewEmail';
import EditRecipe from './components/EditRecipe';
import Testimonials from "./components/Testimonials";

function Home({ recipes, setRecipes, search, setSearch, addRecipe }) {
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <ComplementaryFeatures />
      <Navbar />

      <h1>Recipe Book</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <RecipeForm addRecipe={addRecipe} />
      <Testimonials recipes={recipes} />
      <div className="recipes">
        {filteredRecipes.length ? (
          filteredRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </>
  );
}

function App() {
  const [recipes, setRecipes] = useState(() => {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : [];
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
  };

  return (
    <Router>
      <div className="container">
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
