import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careersn-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('careersn-token');
      localStorage.removeItem('careersn-user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Careers API
export const careersAPI = {
  getCareers: (params = {}) => api.get('/careers', { params }),
  getCareer: (id) => api.get(`/careers/${id}`),
  createCareer: (careerData) => api.post('/careers', careerData),
  updateCareer: (id, careerData) => api.put(`/careers/${id}`, careerData),
  deleteCareer: (id) => api.delete(`/careers/${id}`),
  applyToJob: (id, applicationData) => api.post(`/careers/${id}/apply`, applicationData),
  getStats: () => api.get('/careers/admin/stats'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  saveJob: (jobId) => api.post(`/users/save-job/${jobId}`),
  getSavedJobs: () => api.get('/users/saved-jobs'),
  getAppliedJobs: () => api.get('/users/applied-jobs'),
  getUsers: (params = {}) => api.get('/users', { params }),
  updateUserRole: (userId, role) => api.put(`/users/${userId}/role`, { role }),
};

export default api;