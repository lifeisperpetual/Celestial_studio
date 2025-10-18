const API_BASE = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  signup: `${API_BASE}/api/auth/signup`,
  signin: `${API_BASE}/api/auth/signin`,
  user: (id) => `${API_BASE}/api/auth/user/${id}`,
  health: `${API_BASE}/api/health`,
};

export default API_ENDPOINTS;
