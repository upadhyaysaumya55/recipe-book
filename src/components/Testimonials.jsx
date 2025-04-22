import React from "react";
import "./Testimonials.css";

const Testimonials = ({ recipes }) => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {recipes.length === 0 ? (
          <div className="no-recipes">
            <h3>No recipe added yet</h3>
            <p>Be the first one to add your favorite recipes!</p>
          </div>
        ) : (
          <>
            <h2>What Our Members Are Saying</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>"This app helped me find some great recipes for my family!"</p>
                <h4>- John Doe</h4>
              </div>
              <div className="testimonial">
                <p>"Love the features, easy to add my favorite recipes."</p>
                <h4>- Jane Smith</h4>
              </div>
              <div className="testimonial">
                <p>"A perfect place to discover new dishes to try!"</p>
                <h4>- Alex Brown</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
