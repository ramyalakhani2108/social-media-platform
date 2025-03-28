import axios from 'axios';

const API_URL = 'http://localhost:3004';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const homeApi = {
  getFeed: async () => {
    try {
      const response = await api.get('/home/feed');
      return response.data;
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw error;
    }
  },

  createPost: async (post: any) => {
    try {
      const response = await api.post('/home/post', post);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  createStory: async (story: any) => {
    try {
      const response = await api.post('/home/story', story);
      return response.data;
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  },

  likePost: async (postId: string) => {
    try {
      const response = await api.post(`/home/like/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  addComment: async (postId: string, comment: string) => {
    try {
      const response = await api.post(`/home/comment/${postId}`, { comment });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  signIn: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signin', credentials);
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  signUp: async (userData: { email: string; password: string; username: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get<AuthResponse>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },
};
