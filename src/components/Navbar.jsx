import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 👇 Desktop menu items
  const desktopMenu = (
    <>
      <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
      <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
      <li><Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link></li>
      <li><Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link></li>
      <li className="relative group">
        <span className="cursor-pointer hover:text-yellow-400">Pages ▾</span>
        <ul className="absolute left-0 hidden group-hover:block bg-gray-800 mt-2 rounded shadow-lg w-40 text-sm z-50">
          <li><Link to="/blog" className="block px-4 py-2 hover:bg-gray-700">Blog</Link></li>
          <li><Link to="/gallery" className="block px-4 py-2 hover:bg-gray-700">Gallery</Link></li>
          <li><Link to="/careers" className="block px-4 py-2 hover:bg-gray-700">Careers</Link></li>
        </ul>
      </li>
      <li><Link to="/reservation" className="hover:text-yellow-400 transition">Reservation</Link></li>
      <li><Link to="/login" className="hover:text-yellow-400 transition border px-3 py-1 rounded border-yellow-400">Login</Link></li>
      <li>
        <Link to="/create-account">
          <button className="bg-yellow-500 hover:bg-yellow-400 transition px-4 py-2 rounded-md text-black font-semibold">
            Create Account
          </button>
        </Link>
      </li>
    </>
  );

  // 👇 Mobile menu items
  const mobileMenu = (
    <>
      <li><Link to="/" onClick={() => setIsMobile(false)} className="hover:text-yellow-400">Home</Link></li>
      <li><Link to="/about" onClick={() => setIsMobile(false)} className="hover:text-yellow-400">About</Link></li>
      <li><Link to="/menu" onClick={() => setIsMobile(false)} className="hover:text-yellow-400">Menu</Link></li>
      <li><Link to="/shop" onClick={() => setIsMobile(false)} className="hover:text-yellow-400">Shop</Link></li>

      <li>
        <button
          className="flex justify-between items-center w-full text-left hover:text-yellow-400"
          onClick={() => setIsPagesOpen(!isPagesOpen)}
        >
          Pages ▾
        </button>
        {isPagesOpen && (
          <ul className="pl-4 mt-2 space-y-2 text-sm">
            <li><Link to="/blog" className="block hover:text-yellow-300">Blog</Link></li>
            <li><Link to="/gallery" className="block hover:text-yellow-300">Gallery</Link></li>
            <li><Link to="/careers" className="block hover:text-yellow-300">Careers</Link></li>
          </ul>
        )}
      </li>

      <li><Link to="/reservation" onClick={() => setIsMobile(false)} className="hover:text-yellow-400">Reservation</Link></li>
      <li><Link to="/login" className="hover:text-yellow-400 border px-3 py-1 rounded border-yellow-400">Login</Link></li>
      <li>
        <Link to="/create-account">
          <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-md text-black font-semibold">
            Create Account
          </button>
        </Link>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">Saumya's Kitchen.</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6">
          {desktopMenu}
        </ul>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl hover:text-yellow-400" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">0</span>
          </Link>
          <button onClick={() => setIsMobile(!isMobile)} className="text-xl">
            {isMobile ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div className="md:hidden bg-gray-800 px-6 py-4">
          <ul className="flex flex-col gap-4">{mobileMenu}</ul>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
