import React, { useState } from 'react';
import './Shop.css';

const Shop = () => {
  const [email, setEmail] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    alert(`Thank you! We will notify you at ${email}`);
    setEmail('');
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop – Coming Soon!</h2>
      <p className="shop-desc">
        We’re cooking up something special! Soon you'll be able to buy exclusive spice kits,
        kitchen tools, digital cookbooks, and more from Saumya’s Kitchen.
      </p>

      <div className="coming-soon-grid">
        <div className="coming-card">
          <div className="coming-image placeholder1" />
          <h3>Spice Starter Kit</h3>
          <p>Coming Soon</p>
        </div>
        <div className="coming-card">
          <div className="coming-image placeholder2" />
          <h3>Recipe eBook</h3>
          <p>Coming Soon</p>
        </div>
        <div className="coming-card">
          <div className="coming-image placeholder3" />
          <h3>Chef Apron</h3>
          <p>Coming Soon</p>
        </div>
      </div>

      <form className="waitlist-form" onSubmit={handleNotify}>
        <h4>Want early access?</h4>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Notify Me</button>
      </form>
    </div>
  );
};

export default Shop;
