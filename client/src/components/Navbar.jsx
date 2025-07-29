import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Briefcase, User, Moon, Sun, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
// Assume you have an AuthContext to get user info and logout function
// import { useAuth } from '../context/AuthContext';

// --- Mock AuthContext for demonstration ---
// In your actual app, you would import this from your context file.
const useAuth = () => {
  // To test different states, change this mock user object.
  // Set to null to see the "guest" view.
  const [user, setUser] = useState({ name: 'Prashant', role: 'admin' }); 
  const logout = () => {
    console.log("Logging out...");
    setUser(null);
  };
  return { isAuthenticated: !!user, user, logout };
};
// --- End of Mock AuthContext ---


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useTheme();
  
  // This is where you would get real authentication data
  const { isAuthenticated, user, logout } = useAuth();
  
  const mobileMenuRef = useRef(null);
  const themeDropdownRef = useRef(null);

  // Close mobile menu when a navigation link is clicked
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page
      navigate(`/jobs?search=${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => location.pathname === path;

  // Define navigation links in an array to avoid repetition
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
  ];
  
  // Add admin link only if user is an admin
  if (isAuthenticated && user?.role === 'admin') {
    navLinks.push({ href: '/admin/dashboard', label: 'Admin Dashboard' });
  }

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar-start">
        {/* --- Mobile Menu (Hamburger) --- */}
        <div className="dropdown" ref={mobileMenuRef}>
          <button 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {isMobileMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              {navLinks.map(link => (
                <li key={link.href}><Link to={link.href} className={isActive(link.href) ? 'active' : ''}>{link.label}</Link></li>
              ))}
            </ul>
          )}
        </div>

        {/* --- Logo and Brand Name --- */}
        <Link to="/" className="btn btn-ghost text-xl font-bold flex items-center">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">CareerSn</span>
        </Link>
      </div>
      
      {/* --- Desktop Menu (Center) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link to={link.href} className={`btn btn-ghost ${isActive(link.href) ? 'btn-active' : ''}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end gap-2 items-center">
        {/* --- Search Bar --- */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
          <div className="form-control">
            <input 
              type="text" 
              placeholder="Search..." 
              className="input input-bordered input-sm w-24 md:w-auto transition-all focus:w-full" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* --- Theme Dropdown --- 
            Polished from a simple toggle to a full dropdown for better usability
        --- */}
        <div className="dropdown dropdown-end" ref={themeDropdownRef}>
          <button tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Change theme">
            {theme.toLowerCase().includes('dark') ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-60 overflow-y-auto">
            {themes.map(t => (
              <li key={t}>
                <a onClick={() => setTheme(t)} className={theme === t ? 'active' : ''}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* --- Authentication Section --- 
            This is the biggest improvement. It conditionally renders based on auth state.
        --- */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="User profile">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* Placeholder for user avatar */}
                <span className="text-xl font-bold flex items-center justify-center h-full">{user.name.charAt(0)}</span>
              </div>
            </button>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
              <li className="menu-title"><span>Welcome, {user.name}!</span></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              <LogIn className="h-4 w-4 mr-1"/> Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              <UserPlus className="h-4 w-4 mr-1"/> Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
