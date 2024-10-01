import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const userAuth = localStorage.getItem("users");
  const adminAuth = localStorage.getItem("admins");
  const navigate = useNavigate(); 

  const user = () => {
    if (userAuth) {
      navigate('/Property');
    } else {
      navigate('/AdminProperty');
    } 
  };

  const getUserName = () => {
    if (userAuth) {
      const userData = JSON.parse(userAuth);
      return userData ? userData.name : 'User';
    } else if (adminAuth) {
      const adminData = JSON.parse(adminAuth);
      return adminData ? adminData.name : 'Admin';
    }
    return 'Guest';
  };

  const handleSignInClick = () => {
    navigate('/signin'); 
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("users");
      localStorage.removeItem("admins");
      navigate('/'); 
    }
  };

  return (
    <Navbar className="dark-navbar"> 
      <Navbar.Brand className="brand">
        Automatic Number Plate Detection
      </Navbar.Brand>
      <Nav className="ms-auto"> 
        <Link to="/" className="nav-link">Home</Link>
        <Link to="#about" className="nav-link">About</Link>
        <Link to="#contact" className="nav-link">Contact</Link>
        <Link to="/camera" className="nav-link">Camera</Link>
        
        {userAuth || adminAuth ? (
          <span className='getUserName' onClick={handleLogout}>
            <FaSignOutAlt className='fa' /> {getUserName()}
          </span>
        ) : (
          <Button variant="primary" className="sign-in-button" onClick={handleSignInClick}>
            Sign In
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
