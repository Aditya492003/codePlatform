const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch helper with JSON parsing and error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[API] Error on ${url}:`, error.message);
    throw error;
  }
}

export { API_BASE_URL };
