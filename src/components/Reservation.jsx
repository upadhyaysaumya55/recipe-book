import React from 'react';
import './Reservation.css';

const Reservation = () => {
  return (
    <div className="reservation-container">
      <h1>Reserve Your Table</h1>
      <p>Book a table and enjoy our delicious recipes!</p>

      <form className="reservation-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" required />
        <input type="date" required />
        <input type="time" required />
        <textarea placeholder="Special Requests (Optional)"></textarea>
        <button type="submit">Reserve Now</button>
      </form>
    </div>
  );
};

export default Reservation;
