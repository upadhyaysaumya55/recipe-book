// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // ✅ also get user from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // go to homepage
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // ✅ use login from context
      navigate("/"); // redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-6">
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        data-aos="zoom-in"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <motion.button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-300 text-sm mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/create-account"
            className="text-purple-400 hover:text-purple-300 underline transition duration-200"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
