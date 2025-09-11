import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaShoppingCart, FaConciergeBell } from "react-icons/fa"; // ✅ updated icon
import { MdOutlineFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const foodEmojis = ["🍕", "🍔", "🍜", "🍩", "🍣", "🥗", "🍰", "🍛", "🍟", "🍿"];

const HeroSection = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const scrollToRecipeForm = () => {
    const formSection = document.getElementById("recipe-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToReservation = () => {
    navigate("/reservation"); // ✅ navigate to reservation page
  };

  const goToShop = () => {
    navigate("/shop"); // ✅ navigate to shop page
  };

  return (
    <div
      className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Blurred Glow Circles */}
      <div className="absolute w-72 h-72 bg-yellow-500 opacity-20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-600 opacity-20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* Floating Food Emojis */}
      {foodEmojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute text-3xl md:text-4xl lg:text-5xl animate-float-slow select-none pointer-events-none"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            animationDelay: `${index * 2}s`,
            opacity: 0.1 + Math.random() * 0.2,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Main Container */}
      <motion.div
        className="relative z-10 max-w-5xl px-6 py-32 text-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          data-aos="fade-up"
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Discover Tasty Recipes for Every{" "}
          <span className="text-yellow-400">Mood</span>
        </motion.h1>

        <motion.p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          From quick bites to gourmet meals,{" "}
          <span className="text-yellow-400 font-semibold">Saumya's Kitchen</span>{" "}
          brings you handpicked recipes loved by home chefs and foodies alike.
          Explore, cook, and share your delicious creations with the community.
        </motion.p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          data-aos="zoom-in-up"
          data-aos-delay="400"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToShop} // ✅ navigate to shop page
            className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-yellow-300 shadow-xl"
          >
            <FaShoppingCart className="text-xl" /> {/* ✅ updated icon */}
            Online Ordering
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToReservation} // ✅ navigate to reservation page
            className="flex items-center gap-2 border border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-yellow-400 hover:text-black shadow-xl"
          >
            <FaConciergeBell className="text-xl" />
            Reserve Table
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRecipeForm}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-green-400 shadow-xl"
          >
            <MdOutlineFastfood className="text-xl" />
            Add New Recipe
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
