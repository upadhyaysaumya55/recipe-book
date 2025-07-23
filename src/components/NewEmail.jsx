import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [domain, setDomain] = useState('@outlook.com');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleNext = () => {
    if (!newEmail.trim()) {
      setError('Email is required');
      return;
    }

    const fullEmail = newEmail + domain;
    localStorage.setItem('newAccountEmail', fullEmail);
    setError('');
    navigate('/create-account');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Create Account</h2>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-2 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="@outlook.com">@outlook.com</option>
            <option value="@hotmail.com">@hotmail.com</option>
            <option value="@email.com">@email.com</option>
            <option value="@yahoo.com">@yahoo.com</option>
          </select>
        </div>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <div className="mb-4 text-right">
          <button
            onClick={() => navigate('/create-account')}
            className="text-blue-400 hover:underline hover:text-blue-300 text-sm transition-all duration-300"
          >
            Use your email instead
          </button>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-transform duration-300 transform hover:scale-105"
        >
          Next
        </button>
      </motion.div>
    </div>
  );
};

export default NewEmail;
