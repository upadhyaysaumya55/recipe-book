// src/components/SearchBar.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ search, setSearch }) => {
  const [input, setInput] = useState(search || "");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    setInput(search);
  }, [search]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = input.trim();

    // update parent search state
    setSearch(query);

    // ✅ redirect to menu page with search query
    if (query) {
      navigate(`/menu?search=${encodeURIComponent(query)}`);
    } else {
      navigate(`/menu`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      data-aos="fade-up"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="w-full px-4 py-6 flex justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="w-full max-w-2xl flex items-center gap-2">
        <motion.input
          type="text"
          placeholder="Search recipes..."
          value={input}
          onChange={handleChange}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-grow px-5 py-3 rounded-2xl text-white bg-gray-800
            border border-gray-700 shadow-lg placeholder-gray-400 text-lg
            focus:outline-none focus:ring-2 focus:ring-yellow-400
            transition-all duration-300 ease-in-out hover:shadow-yellow-500/20"
        />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          className="bg-yellow-400 text-black px-4 py-3 rounded-2xl hover:bg-yellow-300 transition-all duration-300"
        >
          <FaSearch />
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
