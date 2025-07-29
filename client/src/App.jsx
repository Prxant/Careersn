import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component & Page Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetail from './pages/JobDetail';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
// Assuming you have this page, if not, you can remove it
import CareerDetail from './pages/CareerDetail'; 

// Context Imports
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // 1. ThemeProvider wraps everything for theme access
    <ThemeProvider>
      {/* 2. AuthProvider wraps everything that needs auth info */}
      <AuthProvider>
        {/* 3. Router handles all navigation */}
        <Router>
          <div className="flex min-h-screen flex-col bg-base-100">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/career/:id" element={<CareerDetail />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
