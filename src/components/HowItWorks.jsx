// src/components/HowItWorks.jsx

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Add Recipes',
    description: 'Create your own recipe collection by adding meals you love or want to try.',
    icon: BookOpenIcon,
  },
  {
    title: 'Search & Discover',
    description: 'Find recipes easily using keywords, categories, or ingredients.',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Save & Organize',
    description: 'Organize recipes into categories like breakfast, dinner, or favorites.',
    icon: FolderIcon,
  },
  {
    title: 'Share & Enjoy',
    description: 'Share your favorite recipes with friends or get inspired by others.',
    icon: ShareIcon,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white py-24 px-6 md:px-20">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-20"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-center group transform transition-transform duration-500 hover:scale-105 hover:shadow-teal-500/40"
              variants={itemVariants}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-700 shadow-lg group-hover:shadow-yellow-400/30 transition-shadow duration-300">
                <Icon className="w-8 h-8 text-white group-hover:text-yellow-100 transition duration-300" />
                <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-yellow-300/30 animate-pulse" />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-300 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
