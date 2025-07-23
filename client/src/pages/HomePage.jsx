import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, TrendingUp, Star } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CareerCard from '../components/CareerCard';
import { mockCareers } from '../data/mockData';

const HomePage = () => {
  const featuredCareers = mockCareers.slice(0, 6);

  return (
    <div className="animate-fade-in">
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Users className="h-8 w-8" />
              </div>
              <div className="stat-title">Active Job Seekers</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Briefcase className="h-8 w-8" />
              </div>
              <div className="stat-title">Job Openings</div>
              <div className="stat-value text-secondary">4,200</div>
              <div className="stat-desc">↗︎ 90 (14%)</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-accent">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="stat-title">Success Rate</div>
              <div className="stat-value text-accent">86%</div>
              <div className="stat-desc">↗︎ 12% increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Careers Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 animate-slide-up">Featured Career Paths</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Discover exciting career opportunities across various industries and find your perfect match.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCareers.map((career, index) => (
              <div key={career.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CareerCard career={career} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              View All Careers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-base-content/70">Real stories from people who found their dream careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                content: "CareerSn helped me transition from marketing to tech. The career guidance was invaluable!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Data Scientist",
                content: "Found my dream job within weeks. The platform is intuitive and has great job matches.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "UX Designer",
                content: "The admin panel made it easy for our company to post jobs and find talented candidates.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4">"{testimonial.content}"</p>
                  <div className="card-actions justify-end">
                    <div className="text-right">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-base-content/70">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;