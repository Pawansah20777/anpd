import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch('http://localhost:5000/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });

    result = await result.json();

    if (result.success) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Password reset link sent to your email',
        showConfirmButton: false,
        timer: 2500
      });
      navigate('/signin'); // Redirect to sign in page
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: result.message || 'Something went wrong!',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Forgot Password</h2>
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
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/signin" className="text-muted">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
