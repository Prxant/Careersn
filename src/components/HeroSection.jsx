import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="hero-content text-center max-w-6xl">
        <div className="animate-fade-in">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Briefcase className="h-16 w-16 text-primary animate-bounce-slow" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Discover Your Dream Career
            </h1>
            <p className="text-xl mb-8 text-base-content/80 max-w-3xl mx-auto leading-relaxed">
              Connect with top employers, explore exciting career paths, and take the next step in your professional journey. 
              Your perfect job is just a click away.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="join">
              <input 
                className="input input-bordered input-lg join-item w-full max-w-xs" 
                placeholder="Search jobs, careers..." 
              />
              <button className="btn btn-primary btn-lg join-item">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <Link to="/jobs" className="btn btn-secondary btn-lg">
              Browse All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="card-title">25K+ Active Users</h3>
                <p>Join thousands of professionals finding their ideal careers</p>
              </div>
            </div>
            
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <Briefcase className="h-12 w-12 text-secondary mb-4" />
                <h3 className="card-title">4K+ Job Listings</h3>
                <p>Fresh opportunities added daily from top companies</p>
              </div>
            </div>
            
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <TrendingUp className="h-12 w-12 text-accent mb-4" />
                <h3 className="card-title">86% Success Rate</h3>
                <p>High placement success with our career matching system</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;