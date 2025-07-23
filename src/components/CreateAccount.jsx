import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(() => localStorage.getItem('newAccountEmail') || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleNext = () => {
    if (step === 1 && !email) {
      setError('Email is required');
    } else if (step === 2 && !password) {
      setError('Password is required');
    } else if (step === 3 && !name) {
      setError('Full name is required');
    } else {
      setError('');
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Full name is required');
      return;
    }
    setError('');
    console.log('Account created:', { email, password, name });
    alert('Account created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="email"
                placeholder="someone@example.com"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-red-400 mt-2">{error}</p>}
              <div className="text-sm text-right mt-2">
                <Link to="/new-email" className="text-purple-400 hover:underline">
                  Get a new email address
                </Link>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300"
              >
                Next
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-400 mt-2">{error}</p>}
              <button
                type="button"
                onClick={handleNext}
                className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-300"
              >
                Next
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <p className="text-red-400 mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition duration-300"
              >
                Create Account
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
