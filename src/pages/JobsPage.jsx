import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import CareerCard from '../components/CareerCard';
import { mockCareers } from '../data/mockData';

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const locations = [...new Set(mockCareers.map(career => career.location))];
  const types = [...new Set(mockCareers.map(career => career.type))];
  const levels = [...new Set(mockCareers.map(career => career.level))];
  const categories = [...new Set(mockCareers.map(career => career.category))];

  const filteredCareers = useMemo(() => {
    return mockCareers.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           career.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           career.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !selectedLocation || career.location === selectedLocation;
      const matchesType = !selectedType || career.type === selectedType;
      const matchesLevel = !selectedLevel || career.level === selectedLevel;
      const matchesCategory = !selectedCategory || career.category === selectedCategory;

      return matchesSearch && matchesLocation && matchesType && matchesLevel && matchesCategory;
    });
  }, [searchQuery, selectedLocation, selectedType, selectedLevel, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedLevel('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Job</h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Explore thousands of job opportunities from top companies around the world
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="join w-full">
              <input 
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                className="input input-bordered input-lg join-item flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary btn-lg join-item">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="card bg-base-200 shadow-lg sticky top-24">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="card-title">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h3>
                  <button 
                    onClick={clearFilters}
                    className="btn btn-ghost btn-sm"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Job Type</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">All Types</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Experience Level</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      <option value="">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Category</span>
                    </label>
                    <select 
                      className="select select-bordered w-full"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-lg font-semibold">
                  {filteredCareers.length} job{filteredCareers.length !== 1 ? 's' : ''} found
                </span>
              </div>
              
              <select className="select select-bordered">
                <option>Sort by: Newest</option>
                <option>Sort by: Salary</option>
                <option>Sort by: Company</option>
                <option>Sort by: Location</option>
              </select>
            </div>
            
            {filteredCareers.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="h-16 w-16 mx-auto text-base-content/30" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-base-content/70 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCareers.map((career, index) => (
                  <div key={career.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CareerCard career={career} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;