// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
   const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userToLogin = { email, password };
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify(userToLogin);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, body, config);
      
      // For now, we'll just show an alert and store the token.
      // A full solution uses Context API to manage this globally.
      alert('Login successful!');
      localStorage.setItem('token', res.data.token); // Store token
      
      console.log('Login successful:', res.data);
      setLoading(false);
      navigate('/'); // Redirect to homepage after login
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:pl-10">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">Log in to manage your applications, save jobs, and continue your career journey with CareerSn.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={onSubmit}>
            <h2 className="card-title justify-center text-2xl">Login</h2>
            {error && <div role="alert" className="alert alert-error text-sm">{error}</div>}
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" placeholder="email" name="email" value={email} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" placeholder="password" name="password" value={password} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </div>
            <div className="text-center mt-4">
              <p>Don't have an account? <Link to="/register" className="link link-primary">Register here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
