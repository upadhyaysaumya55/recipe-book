import React from 'react';
import './Cart.css';
import emptyCartImg from '../assets/empty-cart.png';

const Cart = () => {
  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <p className="cart-subtitle">You haven't added anything yet!</p>
      <img
        src={emptyCartImg}
        alt="Empty Cart"
        className="cart-image"
      />
      <p className="cart-message">
        Browse our shop and add items to your cart. Once added, they'll appear here.
      </p>
    </div>
  );
};

export default Cart;
