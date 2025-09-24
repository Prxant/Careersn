import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Briefcase,
  TrendingUp,
  LogOut,
  Search,
  AlertCircle,
} from 'lucide-react';

const AdminDashboard = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  
  // State for the form inside the modal
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    level: 'Mid',
    category: 'Technology',
    salary: '',
    description: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('careersn-admin-token');

  // --- 1. FETCH ALL JOBS FROM THE API ---
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/careers`);
        setCareers(response.data);
      } catch (err) {
        setError('Failed to fetch job postings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [navigate, token]);
  
  // --- 2. API-DRIVEN HANDLERS (CREATE, UPDATE, DELETE) ---

  const handleDeleteCareer = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/careers/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCareers(careers.filter(career => career._id !== id));
    } catch (err) {
        setError('Failed to delete job.');
        console.error(err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCareer) {
        // Update existing job
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/careers/${editingCareer._id}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCareers(careers.map(c => c._id === editingCareer._id ? response.data : c));
      } else {
        // Create new job
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/careers`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCareers([...careers, response.data]);
      }
      closeModal();
    } catch (err) {
      setError(`Failed to ${editingCareer ? 'update' : 'create'} job.`);
      console.error(err);
    }
  };
  
  // --- 3. MODAL AND LOGOUT LOGIC ---

  const openModalForEdit = (career) => {
    setEditingCareer(career);
    setFormData({
        title: career.title,
        company: career.company,
        location: career.location,
        type: career.type,
        level: career.level,
        category: career.category,
        salary: career.salary,
        description: career.description,
    });
    setShowModal(true);
  };
  
  const openModalForAdd = () => {
    setEditingCareer(null);
    setFormData({
        title: '', company: '', location: '', type: 'Full-time',
        level: 'Mid', category: 'Technology', salary: '', description: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCareer(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('careersn-admin-token');
    navigate('/admin/login');
  };

  // --- 4. FILTERING AND STATS ---
  const filteredCareers = careers.filter(career =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const stats = {
    totalJobs: careers.length,
    // These would eventually come from other API calls
    totalUsers: 25600, 
    totalApplications: 8940,
  };

  // --- 5. JSX RENDER ---
  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start"><h1 className="text-xl font-bold">CareerSn Admin</h1></div>
        <div className="navbar-end"><button onClick={handleLogout} className="btn btn-ghost"><LogOut className="h-5 w-5 mr-2" />Logout</button></div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat bg-base-100 shadow rounded-lg"><div className="stat-figure text-primary"><Briefcase className="h-8 w-8" /></div><div className="stat-title">Total Jobs</div><div className="stat-value text-primary">{stats.totalJobs}</div></div>
            <div className="stat bg-base-100 shadow rounded-lg"><div className="stat-figure text-secondary"><Users className="h-8 w-8" /></div><div className="stat-title">Total Users</div><div className="stat-value text-secondary">{stats.totalUsers.toLocaleString()}</div></div>
            <div className="stat bg-base-100 shadow rounded-lg"><div className="stat-figure text-accent"><TrendingUp className="h-8 w-8" /></div><div className="stat-title">Applications</div><div className="stat-value text-accent">{stats.totalApplications.toLocaleString()}</div></div>
        </div>

        {/* Jobs Management Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
              <h2 className="card-title text-2xl">Manage Job Postings</h2>
              <button onClick={openModalForAdd} className="btn btn-primary"><Plus className="h-5 w-5 mr-2" />Add New Job</button>
            </div>
            
            {error && <div className="alert alert-error"><AlertCircle/><span>{error}</span></div>}

            <div className="input-group mb-6"><input type="text" placeholder="Search jobs..." className="input input-bordered w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /><button className="btn btn-square"><Search className="h-5 w-5" /></button></div>
            
            {loading ? <div className="text-center p-8"><span className="loading loading-spinner"></span></div> : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead><tr><th>Job Title</th><th>Company</th><th>Location</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredCareers.map((career) => (
                      <tr key={career._id}>
                        <td><div className="font-bold">{career.title}</div><div className="text-sm opacity-50">{career.category}</div></td>
                        <td>{career.company}</td>
                        <td>{career.location}</td>
                        <td><div className="flex gap-2"><button onClick={() => openModalForEdit(career)} className="btn btn-ghost btn-sm"><Edit className="h-4 w-4" /></button><button onClick={() => handleDeleteCareer(career._id)} className="btn btn-ghost btn-sm text-error"><Trash2 className="h-4 w-4" /></button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal modal-open">
          <form onSubmit={handleFormSubmit} className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">{editingCareer ? 'Edit Job Posting' : 'Add New Job Posting'}</h3>
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Job Title" className="input input-bordered w-full mb-4" required/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" name="company" value={formData.company} onChange={handleFormChange} placeholder="Company" className="input input-bordered w-full" required/>
                <input type="text" name="location" value={formData.location} onChange={handleFormChange} placeholder="Location" className="input input-bordered w-full" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select name="type" value={formData.type} onChange={handleFormChange} className="select select-bordered w-full"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select>
                <input type="text" name="salary" value={formData.salary} onChange={handleFormChange} placeholder="e.g., ₹15,00,000 - ₹20,00,000" className="input input-bordered w-full" required/>
            </div>
            <textarea name="description" value={formData.description} onChange={handleFormChange} className="textarea textarea-bordered h-24 w-full mb-4" placeholder="Job description..." required></textarea>
            <div className="modal-action">
              <button type="button" onClick={closeModal} className="btn">Cancel</button>
              <button type="submit" className="btn btn-primary">{editingCareer ? 'Update Job' : 'Create Job'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
