import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import './SignIn.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    let result = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
     });

    result = await result.json();

   if(result.user && result.userType === "user") {
      localStorage.setItem("users", JSON.stringify(result.user));
      Swal.fire({
        position: "top",
        icon: "success",
        title: "You are Successfully Logged",
        showConfirmButton: false,
        timer: 2500
    });
      navigate('/');
    } 
   else if (result.user && result.userType === "admin") {
      localStorage.setItem("admins", JSON.stringify(result.user));
      navigate('/Admin');
   } 
  else {
      alert("Please fill correct details!");
     }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
        </div>
        <div className="text-center mt-2">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="text-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
