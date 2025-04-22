import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={`navbar ${!isVisible ? 'hidden' : ''}`}>
        <div className="logo">Saumya's Kitchen.</div>
        <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
          <li><a href="/" className="active">Home</a></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li className="dropdown">
            <a href="/">Pages ▾</a>
            <ul className="dropdown-content">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </li>
          <li><Link to="/reservation">Reservation</Link></li>
          <li>
            <Link to="/login" className="login-btn">Login</Link>
          </li>
          <li>
            <Link to="/create-account">
              <button className="signup-btn">Create Account</button>
            </Link>
          </li>
        </ul>

        <div className="nav-icons">
          <Link to="/cart" className="cart-link">
            <div className="cart">
              <FaShoppingCart />
              <span className="cart-badge">0</span>
            </div>
          </Link>

          <div className="menu-icon" onClick={() => setIsMobile(!isMobile)}>
            <FaBars />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
