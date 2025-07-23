import React, { useEffect } from 'react';
import RecipeCard from './RecipeCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Menu = ({ recipes }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12" data-aos="fade-down">
        Explore Our Delicious Menu
      </h1>

      {recipes.length ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {recipes.map((recipe, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              data-aos="fade-up"
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-white text-lg mt-10" data-aos="zoom-in">
          No recipes available. Add some tasty dishes!
        </p>
      )}
    </div>
  );
};

export default Menu;
