import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CareerDetail from './pages/CareerDetail';
import JobsPage from './pages/JobsPage';
import JobDetail from './pages/JobDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-base-100">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/career/:id" element={<CareerDetail />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
