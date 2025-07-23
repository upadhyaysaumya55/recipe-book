import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      id="about"
      className="bg-gray-900 text-white min-h-screen flex flex-col justify-between py-16 px-4 sm:px-6 lg:px-20"
    >
      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        data-aos="fade-up"
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-orange-400 transition-transform duration-500 hover:scale-105">
          About <span className="text-white">Saumya’s Kitchen</span>
        </h2>

        <p className="text-lg sm:text-xl leading-relaxed text-gray-300 hover:text-white transition duration-300">
          Welcome to <strong>Saumya’s Kitchen</strong> – a delightful journey into the world of delicious
          flavors, home-style cooking, and gourmet creations...
        </p>

        <p className="text-lg sm:text-xl leading-relaxed text-gray-300 hover:text-white transition duration-300">
          From classic family recipes to innovative modern dishes, <strong>Saumya’s Kitchen</strong> is a vibrant
          space where food lovers can explore, learn, and share...
        </p>

        <p className="text-lg sm:text-xl leading-relaxed text-gray-300 hover:text-white transition duration-300">
          Join us in this flavorful adventure, and let’s make your kitchen the happiest place in your home!
        </p>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-sm pt-8 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Saumya’s Kitchen. All rights reserved.
      </footer>
    </section>
  );
};

export default About;
