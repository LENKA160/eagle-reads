import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Client');
  const [cardId, setCardId] = useState('');
  const navigate = useNavigate();

  const getPromptText = () => {
    return role === 'Librarian'
      ? "Welcome back, Keeper of Knowledge. Please verify your credentials."
      : "May I know who is entering today?";
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('eagleReadsUsers')) || [];
    const matchedUser = users.find(
      (u) => u.cardId === cardId.trim() && u.role === role
    );

    if (matchedUser) {
      localStorage.setItem('activeSessionUser', JSON.stringify(matchedUser));
      navigate('/dashboard');
    } else {
      alert("Access Denied! Invalid Card ID or incorrect profile type selected.");
    }
  };

  return (
    <div className="login-card">
      <h1>Welcome to EagleReads Library</h1>
      {/* Wrapped in the original subtitle class to fix typography overlaps */}
      <p className="subtitle" id="dynamic-prompt">{getPromptText()}</p>
      
      <form id="login-form" onSubmit={handleLoginSubmit}>
        <div className="role-toggle-group">
          <div className="role-option">
            <input 
              type="radio" 
              id="role-librarian" 
              name="userRole" 
              value="Librarian" 
              checked={role === 'Librarian'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-librarian" className="role-label">
              <img src="/librarian.webp" className="role-label-img" alt="Librarian Icon" />
              <span> Librarian</span>
            </label>
          </div>
          
          <div className="role-option">
            <input 
              type="radio" 
              id="role-client" 
              name="userRole" 
              value="Client" 
              checked={role === 'Client'}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role-client" className="role-label">
              <img src="/guest.webp" className="role-label-img" alt="Client Icon" />
              <span> Client</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="access-id">Membership Card ID</label>
          <input 
            type="text" 
            id="access-id" 
            placeholder="Enter card identifier number...." 
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn">Cross The Threshold</button>

        <div className="card-footer">
          <p>Don't have an account? <a onClick={() => navigate('/register')}>Create a membership card</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
