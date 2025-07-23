import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const Reservation = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-12 px-4">
      <motion.h1
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Reserve Your Table
      </motion.h1>

      <motion.p
        className="text-lg mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Book a table and enjoy our delicious recipes!
      </motion.p>

      <motion.form
        className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6 space-y-4"
        data-aos="zoom-in-up"
        whileHover={{ scale: 1.01 }}
      >
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="time"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>
        <textarea
          placeholder="Special Requests (Optional)"
          className="w-full px-4 py-2 h-28 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none"
        ></textarea>
        <motion.button
          type="submit"
          className="w-full py-3 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition transform hover:scale-105"
          whileTap={{ scale: 0.95 }}
        >
          Reserve Now
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Reservation;
