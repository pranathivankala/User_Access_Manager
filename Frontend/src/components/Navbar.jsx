import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function getUserFromToken() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMenuOpen(false); // Close menu
    navigate('/login');
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close menu when a link is clicked
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">User Access Manager</div>

        {/* Hamburger menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {!user ? (
            <>
              <Link className="navbar-btn" to="/login" onClick={handleLinkClick}>Login</Link>
              <Link className="navbar-btn" to="/signup" onClick={handleLinkClick}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="/request-access" onClick={handleLinkClick}>Request Access</Link>
              <Link to="/my-requests" onClick={handleLinkClick}>My Requests</Link>
              {['Manager', 'Admin'].includes(user.role) && (
                <>
                  <Link to="/pending-requests" onClick={handleLinkClick}>Pending Requests</Link>
                  <Link to="/create-software" onClick={handleLinkClick}>Create Software</Link>
                </>
              )}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
