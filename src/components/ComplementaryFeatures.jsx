import React, { useEffect } from 'react';
import { FaMobileAlt, FaUserShield, FaRegClock, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: <FaMobileAlt className="text-5xl text-cyan-400 mb-4" />,
    title: 'Mobile Friendly',
    description: 'Access and manage recipes on the go with our responsive design for all devices.',
  },
  {
    icon: <FaUserShield className="text-5xl text-emerald-400 mb-4" />,
    title: 'Secure Accounts',
    description: 'All user data is secured with authentication and email verification.',
  },
  {
    icon: <FaRegClock className="text-5xl text-amber-400 mb-4" />,
    title: 'Save Your Time',
    description: 'Quickly find and organize your favorite recipes in seconds.',
  },
  {
    icon: <FaHeart className="text-5xl text-pink-400 mb-4" />,
    title: 'Favorites & Likes',
    description: 'Save recipes you love and access them anytime from your profile.',
  },
];

// Framer Motion card animation
const cardVariants = {
  offscreen: { opacity: 0, rotateY: -90 },
  onscreen: {
    opacity: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const ComplementaryFeatures = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-br from-black via-zinc-900 to-zinc-950 py-24 px-5 md:px-16">
      {/* Section Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ✨ Complementary Features
      </motion.h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/10 border border-white/10 backdrop-blur-xl text-white rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/40 transition-transform hover:scale-105"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            data-aos="zoom-in-up"
            data-aos-delay={index * 200}
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-xl font-bold mt-4 mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-sm text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {feature.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ComplementaryFeatures;
