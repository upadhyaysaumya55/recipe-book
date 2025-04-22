import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    title: 'Add Recipes',
    description: 'Create your own recipe collection by adding meals you love or want to try.',
    icon: '📖'
  },
  {
    title: 'Search & Discover',
    description: 'Find recipes easily using keywords, categories, or ingredients.',
    icon: '🔍'
  },
  {
    title: 'Save & Organize',
    description: 'Organize recipes into categories like breakfast, dinner, or favorites.',
    icon: '🗂️'
  },
  {
    title: 'Share & Enjoy',
    description: 'Share your favorite recipes with friends or get inspired by others.',
    icon: '👨‍🍳'
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className="how-title">How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
