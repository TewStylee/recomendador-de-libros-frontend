import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Users endpoints
export const usersAPI = {
  updatePreferences: async (favorite_genres, favorite_authors, favorite_books) => {
    const response = await api.patch('/users/preferences', {
      favorite_genres,
      favorite_authors,
      favorite_books,
    });
    return response.data;
  },
};

// Recommendations endpoints
export const recommendationsAPI = {
  get: async (limit = 12) => {
    const response = await api.get(`/recommendations?limit=${limit}`);
    return response.data;
  },
};

// Library endpoints
export const libraryAPI = {
  add: async (googleBookId, status) => {
    const response = await api.post('/library', { googleBookId, status });
    return response.data;
  },
  
  getAll: async (status = null) => {
    const url = status ? `/library?status=${status}` : '/library';
    const response = await api.get(url);
    return response.data;
  },
  
  update: async (id, status) => {
    const response = await api.patch(`/library/${id}`, { status });
    return response.data;
  },
  
  remove: async (id) => {
    const response = await api.delete(`/library/${id}`);
    return response.data;
  },
};

// Books endpoints
export const booksAPI = {
  getDetails: async (googleId) => {
    const response = await api.get(`/books/${googleId}`);
    return response.data;
  },
};

export default api;
