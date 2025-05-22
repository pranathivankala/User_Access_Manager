import React from 'react';
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">User Access Manager</div>
        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/login" className="navbar-btn">Login</Link>
              <Link to="/signup" className="navbar-btn">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/request-access" className="navbar-btn">Request Access</Link>
              <Link to="/my-requests" className="navbar-btn">My Requests</Link>
              {['Manager', 'Admin'].includes(user.role) && (
                <>
                  <Link to="/pending-requests" className="navbar-btn">Pending Requests</Link>
                  <Link to="/create-software" className="navbar-btn">Create Software</Link>
                </>
              )}
              <button onClick={handleLogout} className="navbar-btn logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
