import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text || !formData.location) {
      setError("⚠️ Please fill the form properly.");
      return;
    }

    const newTestimonial = {
      ...formData,
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ name: "", text: "", location: "" });
    setError("");
  };

  return (
    <section className="py-10 px-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8 text-pink-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What Our Members Are Saying
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-md mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl mb-4 font-semibold text-white">Add a Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 rounded bg-gray-700 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Your Location"
              className="p-2 rounded bg-gray-700 text-white"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Your Feedback"
              className="p-2 rounded bg-gray-700 text-white"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 transition rounded font-semibold"
          >
            Submit
          </button>
          {error && (
            <p className="text-red-400 mt-4 font-semibold" data-aos="fade-in">
              {error}
            </p>
          )}
        </motion.form>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.length === 0 ? (
            <p className="text-gray-400 col-span-full" data-aos="fade-up">
              No testimonials yet. Be the first to add one!
            </p>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
                data-aos="zoom-in"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-200 mb-4">"{testimonial.text}"</p>
                <h4 className="text-lg font-bold text-pink-300">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-400">{testimonial.location}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
