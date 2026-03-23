const BASE_URL = 'http://localhost:5000/api';

const apiFetch = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = localStorage.getItem('care_india_token');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone?: string; date_of_birth?: string; gender?: string; blood_group?: string; }) =>
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  
  login: (data: { email: string; password: string; }) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  
  loginAsGuest: () =>
    apiFetch('/auth/guest', { method: 'POST' }),
  
  getMe: () => apiFetch('/auth/me'),
};

// Appointments API
export const appointmentsAPI = {
  book: (data: any) => apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  getMyAppointments: () => apiFetch('/appointments/my'),
  getAllAppointments: () => apiFetch('/appointments/all'),
  cancel: (id: string) => apiFetch(`/appointments/${id}/cancel`, { method: 'PUT' }),
};

// Health API
export const healthAPI = {
  saveRecord: (data: any) => apiFetch('/health/save', { method: 'POST', body: JSON.stringify(data) }),
  getHistory: () => apiFetch('/health/history'),
};

