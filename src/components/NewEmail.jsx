import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewEmail.css';

const NewEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [domain, setDomain] = useState('@outlook.com');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!newEmail.trim()) {
      setError('Email is required');
      return;
    }

    const fullEmail = newEmail + domain;
    localStorage.setItem('newAccountEmail', fullEmail);
    setError('');
    navigate('/create-account');
  };

  return (
    <div className="new-email-container">
      <div className="new-email-box">
        <h2>Create account</h2>

        <div className="email-field">
          <input
            type="text"
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="@outlook.com">@outlook.com</option>
            <option value="@hotmail.com">@hotmail.com</option>
            <option value="@email.com">@email.com</option>
            <option value="@yahoo.com">@yahoo.com</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="email-link">
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/create-account')}
          >
            Use your email instead
          </button>
        </div>

        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default NewEmail;
