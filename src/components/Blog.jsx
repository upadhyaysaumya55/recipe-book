import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import placeholder from '../assets/empty-blog.png';

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hover:text-orange-400 transition-colors duration-300">
          Our Blog
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          We’ll be sharing tasty tips, stories, and recipes soon!
        </p>

        <motion.img
          src={placeholder}
          alt="Coming Soon"
          className="w-64 mx-auto mb-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          data-aos="zoom-in"
        />

        <p className="text-md md:text-lg text-gray-400 hover:text-white transition-colors duration-300">
          No blog posts added yet. Stay tuned for delicious updates!
        </p>
      </motion.div>
    </section>
  );
};

export default Blog;
