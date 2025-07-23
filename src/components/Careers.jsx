import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Careers = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white py-20 px-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
        data-aos="fade-up"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 hover:text-yellow-400 transition duration-300">
          Join Our Team
        </h1>
        <p className="text-xl mb-6 text-gray-300 hover:text-white transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
          We’re not hiring right now, but check back soon!
        </p>
        <p className="text-lg text-gray-400 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          At <strong className="text-yellow-400">Saumya's Kitchen</strong>, we believe in building a team of passionate foodies. Although
          we don't have openings at the moment, we're always on the lookout for talented individuals!
        </p>
      </motion.div>
    </section>
  );
};

export default Careers;
