import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Logged in successfully!');
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/create-account" style={{ color: 'blue', textDecoration: 'underline' }}>Create one</Link></p>
      </div>
    </div>
  );
};

export default Login;
