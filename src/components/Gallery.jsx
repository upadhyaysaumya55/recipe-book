import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Gallery = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        data-aos="fade-down"
      >
        Gallery
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-6 text-center text-gray-300 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        data-aos="fade-up"
      >
        Explore delicious visuals from our kitchen — coming soon!
      </motion.p>

      <motion.p
        className="text-md md:text-lg text-gray-400 text-center hover:text-white transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        data-aos="zoom-in"
      >
        No gallery items added yet. Check back soon!
      </motion.p>
    </div>
  );
};

export default Gallery;
