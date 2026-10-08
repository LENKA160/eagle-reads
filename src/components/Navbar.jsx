import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safely extract the logged-in user details from local storage session
  const currentUser = JSON.parse(localStorage.getItem('activeSessionUser')) || { name: 'Guest', role: 'Client' };

  const handleLogout = () => {
    // Destroy session tokens and kick user back to access gateway portal
    localStorage.removeItem('activeSessionUser');
    navigate('/login');
  };

  // Helper function to see which nav link matches our active router URL address path
  const getTabClass = (path) => {
    return location.pathname === path ? 'nav-tab active' : 'nav-tab';
  };

  return (
    <header className="dash-header">
      <div>
        <h2>EagleReads Core Workspace</h2>
        <p id="user-greeting">Logged in as: {currentUser.name} ({currentUser.role})</p>
      </div>
      
      <nav className="dash-nav">
        {/* All roles have access to view the main data inventory list */}
        <Link to="/dashboard" className={getTabClass('/dashboard')}>Book Catalog</Link>
        
        {/* Conditionally reveal administrative paths exclusively to logged-in Librarians */}
        {currentUser.role === 'Librarian' ? (
          <>
            <Link to="/manage-books" className={getTabClass('/manage-books')}>Manage Books</Link>
            <Link to="/manage-clients" className={getTabClass('/manage-clients')}>Manage Clients</Link>
            <Link to="/logs" className={getTabClass('/logs')}>Action Logs</Link>
          </>
        ) : (
     
          <Link to="/logs" className={getTabClass('/logs')}>My Rental Logs</Link>
        )}
      </nav>

      <button onClick={handleLogout} className="btn-logout">Leave Library</button>
    </header>
  );
};

export default Navbar;
