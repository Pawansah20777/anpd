import React from 'react';
import './Home.css';
import feature1 from '../assets/1.jpeg';
import feature2 from '../assets/2.jpeg';
import feature3 from '../assets/6.jpeg';
import howItWorks from '../assets/4.jpeg';
import admin1Image from '../assets/fb.jpg';
import admin2Image from '../assets/pp3.jpg';

const Home = () => {
  return (
    <div className="home">
      <header className="hero-section">
        <h2>Welcome to Automatic Number </h2>
        <h2>Plate Recognition (ANPR)</h2>
        <p>Revolutionizing vehicle identification with advanced technology.</p>
        <a href="/camera" className="cta-button">Get Started</a>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature">
            <img src={feature1} alt="Feature 1" />
            <h3>Fast Recognition</h3>
            <p>Our system recognizes number plates quickly and accurately, ensuring seamless operations.</p>
          </div>
          <div className="feature">
            <img src={feature2} alt="Feature 2" />
            <h3>User-Friendly Interface</h3>
            <p>Intuitive design makes it easy for users to interact with the system.</p>
          </div>
          <div className="feature">
            <img src={feature3} alt="Feature 3" />
            <h3>Real-Time Monitoring</h3>
            <p>Monitor vehicles in real time, enhancing security and efficiency.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-content">
          <img src={howItWorks} alt="How it works" />
          <p>Our ANPR system uses advanced algorithms to analyze images captured by high-resolution cameras. It leverages machine learning and optical character recognition (OCR) techniques to accurately detect and extract number plate information. 
            The system processes data in real-time, allowing for immediate identification and verification of vehicles, making it ideal for traffic management, parking systems, toll booths, and security checkpoints. With its ability to handle multiple
           vehicle entries simultaneously and operate under various lighting and weather conditions, 
            our ANPR solution ensures reliable and consistent performance for enhanced security and operational efficiency.</p>
        </div>
      </section>

      <section className="admins">
  <h2>Meet Our Admins</h2>
  <div className="admin-list">
    <div className="admin-card">
      <img src={admin1Image} alt="Admin 1" />
      <h3>Admin Name 1</h3>
      <p>Brief description about Admin 1, their role, and contributions.</p>
    </div>
    <div className="admin-card">
      <img src={admin2Image} alt="Admin 2" />
      <h3>Admin Name 2</h3>
      <p>Brief description about Admin 2, their role, and contributions.</p>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
