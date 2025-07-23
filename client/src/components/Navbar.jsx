import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Briefcase, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { theme, setTheme, themes } = useTheme();

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </div>
          {isOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
              <li><Link to="/jobs" className={isActive('/jobs') ? 'active' : ''}>Jobs</Link></li>
              <li><Link to="/admin/login">Admin</Link></li>
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          <Briefcase className="h-6 w-6 mr-2" />
          CareerSn
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={`${isActive('/') ? 'active' : ''} btn btn-ghost`}>Home</Link></li>
          <li><Link to="/jobs" className={`${isActive('/jobs') ? 'active' : ''} btn btn-ghost`}>Jobs</Link></li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        <div className="form-control">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search careers..." 
              className="input input-bordered input-sm w-full max-w-xs" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square btn-sm">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <Link to="/admin/login" className="btn btn-ghost btn-circle">
          <User className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;