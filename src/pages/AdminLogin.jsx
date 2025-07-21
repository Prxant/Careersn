import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'admin@careersn.com' && password === 'admin123') {
        localStorage.setItem('careersn-admin-token', 'mock-jwt-token');
        navigate('/admin/dashboard');
      } else {
        alert('Invalid credentials. Use admin@careersn.com / admin123');
      }
      setIsLoading(false);
    }, 1500);
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

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
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
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
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
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-base-content/40 hover:text-base-content"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Demo credentials: admin@careersn.com / admin123
                  </span>
                </label>
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

            <div className="divider">Demo Info</div>
            <div className="alert alert-info">
              <div>
                <h4 className="font-semibold">Demo Credentials:</h4>
                <p className="text-sm">Email: admin@careersn.com</p>
                <p className="text-sm">Password: admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;