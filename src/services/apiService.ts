const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const isLocalEnvironment =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);
const BASE_URL = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/$/, '')
  : isLocalEnvironment
    ? 'http://localhost:5000/api'
    : '';

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  if (!BASE_URL) {
    throw new Error('Backend is not configured. Set VITE_API_BASE_URL to your deployed API URL.');
  }

  const token = localStorage.getItem('care_india_token');

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Unable to reach the server. Check VITE_API_BASE_URL and backend deployment.');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    apiFetch('/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiFetch('/login', { method: 'POST', body: JSON.stringify(data) }),

  loginAsGuest: () =>
    apiFetch('/guest', { method: 'GET' }),

  getMe: () => apiFetch('/auth/me'),
};

export const appointmentsAPI = {
  book: (data: any) => apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  getMyAppointments: () => apiFetch('/appointments/my'),
  getAllAppointments: () => apiFetch('/appointments/all'),
  cancel: (id: string) => apiFetch(`/appointments/${id}/cancel`, { method: 'PUT' }),
};

export const healthAPI = {
  saveRecord: (data: any) => apiFetch('/health/save', { method: 'POST', body: JSON.stringify(data) }),
  getHistory: () => apiFetch('/health/history'),
};
