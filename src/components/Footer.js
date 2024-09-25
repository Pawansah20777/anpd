import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5>About ANPR</h5>
            <p>
              Automatic Number Plate Recognition (ANPR) is a technology that uses
              optical character recognition on images to read vehicle registration
              plates. This technology is used for various applications, including
              law enforcement and traffic management.
            </p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <ul className="social-links">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Number Plate Detection Application. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
