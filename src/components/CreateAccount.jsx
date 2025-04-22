import React, { useState } from 'react';
import './CreateAccount.css';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(() => localStorage.getItem('newAccountEmail') || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 1 && !email) {
      setError('Email is required');
    } else if (step === 2 && !password) {
      setError('Password is required');
    } else if (step === 3 && !name) {
      setError('Full name is required');
    } else {
      setError('');
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Full name is required');
      return;
    }
    setError('');
    console.log('Account created:', { email, password, name });
    alert('Account created successfully!');
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h2>Create account</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="someone@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <div className="email-link">
                <Link to="/new-email">Get a new email address</Link>
              </div>
              <button type="button" onClick={handleNext}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button type="button" onClick={handleNext}>Next</button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Create Account</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
