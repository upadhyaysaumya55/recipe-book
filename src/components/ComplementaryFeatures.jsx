import React from 'react';
import './ComplementaryFeatures.css';
import { FaMobileAlt, FaUserShield, FaRegClock, FaHeart } from 'react-icons/fa';

const ComplementaryFeatures = () => {
  return (
    <section className="complementary-section">
      <h2 className="features-title">✨ Complementary Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <FaMobileAlt className="feature-icon" />
          <h3>Mobile Friendly</h3>
          <p>Access and manage recipes on the go with our fully responsive design for all devices.</p>
        </div>
        <div className="feature-card">
          <FaUserShield className="feature-icon" />
          <h3>Secure Accounts</h3>
          <p>Your data is protected with secure login and email verification for peace of mind.</p>
        </div>
        <div className="feature-card">
          <FaRegClock className="feature-icon" />
          <h3>Save Your Time</h3>
          <p>Quickly search, filter, and organize recipes to save time in the kitchen and online.</p>
        </div>
        <div className="feature-card">
          <FaHeart className="feature-icon" />
          <h3>Favorites & Likes</h3>
          <p>Mark recipes as favorites and build your personalized list of beloved dishes.</p>
        </div>
      </div>
    </section>
  );
};

export default ComplementaryFeatures;
