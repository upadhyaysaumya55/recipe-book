import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import spiceKitImg from '../assets/spices.png';
import ebookImg from '../assets/ebook.png';
import apronImg from '../assets/apron.png';

const Shop = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleNotify = (e) => {
    e.preventDefault();
    alert(`Thank you! We will notify you at ${email}`);
    setEmail('');
  };

  const products = [
    {
      title: 'Spice Starter Kit',
      image: spiceKitImg,
    },
    {
      title: 'Recipe eBook',
      image: ebookImg,
    },
    {
      title: 'Chef Apron',
      image: apronImg,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 md:px-20" id="shop">
      <motion.h2
        className="text-4xl font-bold mb-4 text-center text-yellow-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Shop – Coming Soon!
      </motion.h2>

      <p className="text-center text-lg mb-10 max-w-3xl mx-auto text-gray-300" data-aos="fade-up">
        We’re cooking up something special! Soon you'll be able to buy exclusive spice kits,
        kitchen tools, digital cookbooks, and more from Saumya’s Kitchen.
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        data-aos="fade-up"
      >
        {products.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-500/30 transition duration-300 text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
            />
            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
            <p className="text-yellow-400">Coming Soon</p>
          </motion.div>
        ))}
      </div>

      <motion.form
        onSubmit={handleNotify}
        className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h4 className="text-2xl font-semibold mb-4 text-center">Want early access?</h4>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-2 rounded-lg font-medium shadow-lg"
          >
            Notify Me
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Shop;
