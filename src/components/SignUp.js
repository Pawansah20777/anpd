import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './SignUp.css'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== Cpassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, Cpassword }),
      headers: { "Content-Type": "application/json" },
      });

    const result = await response.json();
    if (result) {
      navigate("/signin");
    }
  
   
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="Cpassword"
              value={Cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <Link to="/signin" className="text-primary">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
