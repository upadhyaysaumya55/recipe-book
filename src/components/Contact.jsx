import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const floatingEmojis = [
  { emoji: '💌', top: '10%', left: '5%', delay: 0 },
  { emoji: '📧', top: '20%', right: '10%', delay: 0.5 },
  { emoji: '😊', bottom: '10%', left: '8%', delay: 1 },
  { emoji: '📝', bottom: '15%', right: '12%', delay: 1.2 },
];

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_92nmtqk', // your EmailJS service ID
        'template_jjgkr79', // your EmailJS template ID
        e.target,
        'dXcUuj_oHJoLr6CM9' // your EmailJS public key
      )
      .then(
        (result) => {
          toast.success('Message sent successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          e.target.reset(); // clear form
        },
        (error) => {
          toast.error('Failed to send message: ' + error.text, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-16 overflow-hidden">
      {/* Toast Container */}
      <ToastContainer />

      {/* Floating Emojis */}
      {floatingEmojis.map((item, index) => (
        <motion.div
          key={index}
          className="text-3xl sm:text-4xl md:text-5xl absolute z-0 select-none pointer-events-none"
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
            transition: {
              delay: item.delay,
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Form Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2
          className="text-5xl font-extrabold text-center mb-6 text-teal-400"
          data-aos="fade-down"
        >
          Contact Us
        </h2>
        <p
          className="text-center text-gray-400 mb-12 max-w-xl mx-auto"
          data-aos="fade-up"
        >
          We’d love to hear from you. Fill out the form below and we’ll get back to you as soon as possible!
        </p>

        <form
          onSubmit={sendEmail}
          className="bg-gray-800 p-10 rounded-2xl shadow-2xl space-y-6"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-aos="fade-right">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                required
              />
            </div>

            <div data-aos="fade-left">
              <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div data-aos="zoom-in">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
              required
            />
          </div>

          <div data-aos="zoom-in-up">
            <label className="block text-sm font-semibold text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Type your message here..."
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
              required
            ></textarea>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold tracking-wide transition-all duration-300 shadow-md"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
