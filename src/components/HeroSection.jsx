import React from "react";
import "./HeroSection.css";

const HeroSection = () => {

  return (
    <div className="hero">

      <div className="navbar">
        <div className="logo">Saumya's Kitchen</div>
        <div className="nav-links">
          <a href="./Home">Home</a>
          <a href="./About">About</a>
          <a href="./Menu">Menu</a>
          <a href="./Shop">Shop</a>
          <a href="./Pages">Pages</a>
          <a href="./Reservation">Reservation</a>
        </div>
        <div className="menu-button">&#9776;</div>
      </div>

      <div className="hero-content">
        <h1>
          Discover Tasty Recipes for Every{" "}
        Mood
        </h1>
        <p>
          From quick bites to gourmet meals, <span className="highlight-blue">Saumya's Kitchen</span> brings you handpicked recipes
          loved by home chefs and foodies alike. Explore, cook, and share your
          delicious creations with the community.
        </p>

        <div className="hero-buttons">
          <button className="blue-btn">Online Ordering</button>
          <button className="blue-btn">Reserve Table</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;