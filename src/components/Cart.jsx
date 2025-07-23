import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import emptyCartImg from '../assets/empty-cart.png';

const Cart = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white px-4 py-16">
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          data-aos="fade-up"
        >
          Your Shopping Cart
        </h1>
        <p
          className="text-lg md:text-xl text-gray-300 mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          You haven't added anything yet!
        </p>

        <motion.img
          src={emptyCartImg}
          alt="Empty Cart"
          className="mx-auto w-56 md:w-72 mb-6 hover:scale-105 transition-transform duration-300"
          data-aos="zoom-in"
          whileHover={{ scale: 1.05 }}
        />

        <p
          className="text-gray-400"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Browse our shop and add items to your cart. Once added, they'll appear here.
        </p>
      </motion.div>
    </section>
  );
};

export default Cart;
