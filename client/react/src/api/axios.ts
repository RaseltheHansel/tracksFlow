import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// WHY: Automatically add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// WHY: Handle 401 globally — redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Auth ──────────────────────────────────────────
export const login = (data: {
  email: string;
  password: string;
}) => api.post('/auth/login', data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post('/auth/register', data);

// ── Sites ─────────────────────────────────────────
export const getSites   = ()                                          => api.get('/sites');
export const createSite = (data: { name: string; domain: string })   => api.post('/sites', data);
export const getSite    = (siteId: string)                            => api.get(`/sites/${siteId}`);
export const updateSite = (id: number, data: object)                  => api.put(`/sites/${id}`, data);
export const deleteSite = (id: number)                                => api.delete(`/sites/${id}`);
export const getSnippet = (id: number)                                => api.get(`/sites/${id}/snippet`);

// ── Analytics ─────────────────────────────────────
export const getStats    = (siteId: string, period = '7d') =>
  api.get(`/analytics/${siteId}?period=${period}`);
export const getLiveEvents = (siteId: string) =>
  api.get(`/analytics/${siteId}/events`);

// ── AI ────────────────────────────────────────────
export const getInsights = (siteId: string) =>
  api.get(`/ai/${siteId}/insights`);
