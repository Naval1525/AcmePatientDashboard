// src/lib/api.ts
import axios from 'axios';
import {
  User,
  WeightEntry,
  Shipment,
  DashboardOverview
} from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header to requests if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Dashboard endpoints
export const dashboardAPI = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await api.get('/dashboard/overview');
    return response.data;
  },
};

// Weight endpoints
export const weightAPI = {
  getAll: async (): Promise<WeightEntry[]> => {
    const response = await api.get('/weight');
    return response.data;
  },

  add: async (weight: number, date: string, notes?: string): Promise<WeightEntry> => {
    const response = await api.post('/weight', { weight, date, notes });
    return response.data;
  },

  update: async (id: string, data: Partial<WeightEntry>): Promise<WeightEntry> => {
    const response = await api.put(`/weight/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/weight/${id}`);
  },
};

// Shipment endpoints
export const shipmentAPI = {
  getAll: async (): Promise<Shipment[]> => {
    const response = await api.get('/shipment');
    return response.data;
  },

  getUpcoming: async (): Promise<Shipment[]> => {
    const response = await api.get('/shipment/upcoming');
    return response.data;
  },

  getPast: async (): Promise<Shipment[]> => {
    const response = await api.get('/shipment/past');
    return response.data;
  },

  getById: async (id: string): Promise<Shipment> => {
    const response = await api.get(`/shipment/${id}`);
    return response.data;
  },
};

export default api;