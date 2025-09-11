// src/components/Testimonials.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // ✅ Load testimonials from localStorage or initialize empty array
  const [testimonials, setTestimonials] = useState(() => {
    const stored = localStorage.getItem("testimonials");
    return stored ? JSON.parse(stored) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    text: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Keep localStorage in sync whenever testimonials change
  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text || !formData.location) {
      setError("⚠️ Please fill the form properly.");
      return;
    }

    if (editingIndex !== null) {
      // Update existing testimonial
      const updatedTestimonials = [...testimonials];
      updatedTestimonials[editingIndex] = { ...formData };
      setTestimonials(updatedTestimonials);
      setEditingIndex(null);
    } else {
      // Add new testimonial with unique ID
      setTestimonials([{ ...formData, id: Date.now() }, ...testimonials]);
    }

    setFormData({ name: "", text: "", location: "" });
    setError("");
  };

  const handleEdit = (index) => {
    setFormData(testimonials[index]);
    setEditingIndex(index);
    // Removed scroll to top to prevent jumping
  };

  const handleDelete = (index) => {
    if (window.confirm("❌ Are you sure you want to delete this testimonial?")) {
      const updatedTestimonials = testimonials.filter((_, i) => i !== index);
      setTestimonials(updatedTestimonials);
    }
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
          <h3 className="text-2xl mb-4 font-semibold text-white">
            {editingIndex !== null ? "Edit Testimonial" : "Add a Testimonial"}
          </h3>
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
            {editingIndex !== null ? "Update" : "Submit"}
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
                key={testimonial.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
                data-aos="zoom-in"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-200 mb-4">"{testimonial.text}"</p>
                <h4 className="text-lg font-bold text-pink-300">{testimonial.name}</h4>
                <p className="text-sm text-gray-400 mb-4">{testimonial.location}</p>

                {/* ✅ Edit & Delete buttons below the testimonial */}
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-yellow-500 hover:bg-yellow-400 text-black rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
