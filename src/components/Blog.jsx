import React from 'react';
import './Blog.css';
import placeholder from '../assets/empty-blog.png';

const Blog = () => {
  return (
    <div className="blog-placeholder-container">
      <h1 className="blog-title">Our Blog</h1>
      <p className="blog-subtitle">We’ll be sharing tasty tips, stories, and recipes soon!</p>
      <img src={placeholder} alt="Coming Soon" className="blog-placeholder-img" />
      <p className="blog-message">No blog posts added yet. Stay tuned for delicious updates!</p>
    </div>
  );
};

export default Blog;
