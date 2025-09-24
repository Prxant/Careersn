import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the login function from your context

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const newUser = { username, email, password };

      // 3. This is the corrected, simplified API call.
      // Pass the 'newUser' object directly. Axios handles the rest.
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        newUser 
      );
      
      // 4. After successful registration, automatically log the user in.
      login(res.data);
      
      // 5. Navigate to the main jobs page (or a dashboard).
      navigate('/jobs');

    } catch (err) {
      // The error from the server will now be correctly displayed.
      setError(err.response?.data?.msg || 'An error occurred. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:pl-10">
          <h1 className="text-5xl font-bold">Join CareerSn!</h1>
          <p className="py-6">Discover thousands of job opportunities and take the next step in your career. Sign up now to get started.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={onSubmit}>
            <h2 className="card-title justify-center text-2xl">Create Account</h2>
            {error && <div role="alert" className="alert alert-error text-sm">{error}</div>}
            <div className="form-control">
              <label className="label"><span className="label-text">Username</span></label>
              <input type="text" placeholder="username" name="username" value={username} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" placeholder="email" name="email" value={email} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" placeholder="password" name="password" value={password} onChange={onChange} className="input input-bordered" required minLength="6" />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Register'}
              </button>
            </div>
            <div className="text-center mt-4">
              <p>Already have an account? <Link to="/login" className="link link-primary">Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
