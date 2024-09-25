import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); 

  const handleSignInClick = () => {
    navigate('/signin'); 
  };

  return (
    <Navbar className="dark-navbar"> 
      <Navbar.Brand className="brand">
        Automatic Number Plate Detection
      </Navbar.Brand>
      <Nav className="ms-auto"> {/* Use ms-auto to align items to the right */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="#about" className="nav-link">About</Link>
        <Link to="#contact" className="nav-link">Contact</Link>
        <Link to="/camera" className="nav-link">Camera</Link>
        <Button variant="primary" className="sign-in-button" onClick={handleSignInClick}>
          Sign In
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Header;
