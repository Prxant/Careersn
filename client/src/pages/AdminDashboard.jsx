import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  LogOut,
  Search,
  Filter
} from 'lucide-react';
import { mockCareers } from '../data/mockData';

const AdminDashboard = () => {
  const [careers, setCareers] = useState(mockCareers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('careersn-admin-token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('careersn-admin-token');
    navigate('/admin/login');
  };

  const handleDeleteCareer = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setCareers(careers.filter(career => career.id !== id));
    }
  };

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(careers.map(career => career.category))];

  const stats = {
    totalJobs: careers.length,
    totalUsers: 25600,
    totalApplications: 8940,
    recentJobs: careers.slice(0, 3)
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <h1 className="text-xl font-bold">CareerSn Admin</h1>
        </div>
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-ghost">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-figure text-primary">
              <Briefcase className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Jobs</div>
            <div className="stat-value text-primary">{stats.totalJobs}</div>
            <div className="stat-desc">Active job postings</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-figure text-secondary">
              <Users className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-secondary">{stats.totalUsers.toLocaleString()}</div>
            <div className="stat-desc">Registered job seekers</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-figure text-accent">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="stat-title">Applications</div>
            <div className="stat-value text-accent">{stats.totalApplications.toLocaleString()}</div>
            <div className="stat-desc">Total applications received</div>
          </div>
        </div>

        {/* Jobs Management */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
              <h2 className="card-title text-2xl">Manage Job Postings</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Job
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="form-control flex-1">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="input input-bordered flex-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-square">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="form-control">
                <select
                  className="select select-bordered"
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

            {/* Jobs Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCareers.map((career) => (
                    <tr key={career.id}>
                      <td>
                        <div className="font-bold">{career.title}</div>
                        <div className="text-sm opacity-50">{career.salary}</div>
                      </td>
                      <td>{career.company}</td>
                      <td>{career.location}</td>
                      <td>
                        <div className={`badge ${career.type === 'Full-time' ? 'badge-primary' : 'badge-secondary'}`}>
                          {career.type}
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline">{career.category}</div>
                      </td>
                      <td>{career.postedDate}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setEditingCareer(career)}
                            className="btn btn-ghost btn-sm"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCareer(career.id)}
                            className="btn btn-ghost btn-sm text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCareers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-base-content/60">No jobs found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingCareer) && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">
              {editingCareer ? 'Edit Job Posting' : 'Add New Job Posting'}
            </h3>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input type="text" className="input input-bordered" placeholder="e.g. Senior Frontend Developer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="Company name" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input type="text" className="input input-bordered" placeholder="e.g. San Francisco, CA" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Type</span>
                </label>
                <select className="select select-bordered">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Level</span>
                </label>
                <select className="select select-bordered">
                  <option>Entry</option>
                  <option>Mid</option>
                  <option>Senior</option>
                  <option>Lead</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select className="select select-bordered">
                  <option>Technology</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Data Science</option>
                  <option>Product</option>
                </select>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Salary Range</span>
              </label>
              <input type="text" className="input input-bordered" placeholder="e.g. $120,000 - $150,000" />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea className="textarea textarea-bordered h-24" placeholder="Job description..."></textarea>
            </div>

            <div className="modal-action">
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCareer(null);
                }}
                className="btn"
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                {editingCareer ? 'Update Job' : 'Create Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;