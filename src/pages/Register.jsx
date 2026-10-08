import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Controlled form states
  const [fullName, setFullName] = useState('');
  const [desiredId, setDesiredId] = useState('');
  const [assignedTier, setAssignedTier] = useState('Client');
  const navigate = useNavigate();

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    
    // Read the current users array from localStorage database
    const users = JSON.parse(localStorage.getItem('eagleReadsUsers')) || [];
    
    // Validation check: ensure the requested ID isn't already taken
    const idExists = users.some((user) => user.cardId === desiredId.trim());
    
    if (idExists) {
      alert("This Membership ID is already claimed, try a different alpha-numeric string.");
      return;
    }

    // Structure our new user asset record row
    const newUser = {
      name: fullName.trim(),
      cardId: desiredId.trim(),
      role: assignedTier,
      avatar: "red.png" // Baseline default fallback image icon
    };

    // Save back to browser client storage
    users.push(newUser);
    localStorage.setItem('eagleReadsUsers', JSON.stringify(users));
    
    // Success feedback using a clean dynamic string literal
    alert(`Success! Membership card issued for ${fullName.trim()}. You can now sign in.`);
    
    // Smooth navigation switch back to sign-in screen
    navigate('/login');
  };

  return (
    <div className="login-card">
      <h1>Welcome to EagleReads Library</h1>
      <p className="subtitle">Secure a new archive membership card key below</p>
      
      <form onSubmit={handleRegistrationSubmit}>
        {/* Full Legal Name Box */}
        <div className="form-group">
          <label htmlFor="reg-name">Full Legal Name</label>
          <input 
            type="text" 
            id="reg-name" 
            placeholder="E.g., Jane Doe" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>

        {/* Desired Membership ID Access String */}
        <div className="form-group">
          <label htmlFor="reg-id">Desired Membership ID</label>
          <input 
            type="text" 
            id="reg-id" 
            placeholder="Create a unique alpha-numeric card string..." 
            value={desiredId}
            onChange={(e) => setDesiredId(e.target.value)}
            required 
          />
        </div>

        {/* Assigned Profile Tier Selector Dropdown */}
        <div className="form-group">
          <label htmlFor="reg-role">Assigned Profile Tier</label>
          <select 
            id="reg-role" 
            value={assignedTier}
            onChange={(e) => setAssignedTier(e.target.value)}
          >
            <option value="Client">Standard Library Client</option>
            <option value="Librarian">Librarian (Administrative Rights)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Issue Membership Card</button>

        <div className="card-footer">
          <p>Already have a membership key? <a onClick={() => navigate('/login')}>Return to Sign In</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
