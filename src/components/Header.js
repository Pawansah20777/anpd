import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar className={darkMode ? 'dark-navbar' : 'light-navbar'}>
      <Navbar.Brand className={darkMode ? 'text-white' : 'text-black'}>
       Automatic Number Plate Detection 
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#home" className={darkMode ? 'text-white' : 'text-black'}>
          Home
        </Nav.Link>
        <Nav.Link href="#about" className={darkMode ? 'text-white' : 'text-black'}>
          About
        </Nav.Link>
        <Nav.Link href="#contact" className={darkMode ? 'text-white' : 'text-black'}>
          Contact
        </Nav.Link>
        <Button 
          variant="primary" 
          style={{ backgroundColor: '#5E4B8D', border: 'none' }} 
          className={darkMode ? 'text-white' : 'text-black'}
        >
          Login
        </Button>
        <Nav.Link onClick={toggleDarkMode} className={darkMode ? 'text-white' : 'text-black'}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
