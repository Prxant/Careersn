import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import axios from 'axios'; // 1. Import axios

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // 2. Add state for error messages
  const navigate = useNavigate();

  // 3. This is the new, corrected login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      // Make a REAL API call to your backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      // Check if the logged-in user is an admin
      if (response.data.user.role !== 'admin') {
        setError('Access denied. This is not an admin account.');
        setIsLoading(false);
        return;
      }

      // If login is successful, store the token and navigate
      localStorage.setItem('careersn-admin-token', response.data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      // If the server sends an error, display it
      console.error("Login failed:", err.response);
      const message = err.response?.data?.msg || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="avatar placeholder mb-4">
                <div className="bg-primary text-primary-content rounded-full w-16">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <p className="text-base-content/70">Access the CareerSn admin panel</p>
            </div>
            
            {/* 4. Display the error message here */}
            {error && (
              <div className="alert alert-error mb-4">
                <div>
                  <AlertCircle className="h-6 w-6" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email and Password inputs remain the same */}
              <div className="form-control">
                <label className="label"><span className="label-text">Email</span></label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="admin@careersn.com"
                    className="input input-bordered w-full pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <User className="h-5 w-5 absolute left-3 top-3.5 text-base-content/40" />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Password</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Lock className="h-5 w-5 absolute left-3 top-3.5 text-base-content/40" />
                  <button type="button" className="absolute right-3 top-3.5" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;