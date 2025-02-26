const API_URL = '/api';

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  }
  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/post-list/`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_URL}/post-create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

export const logoutUser = async (token) => {
  const response = await fetch(`${API_URL}/logout/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}` }
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return response.json();
};
