import { create } from 'zustand';
import { User } from '../types';
import { homeApi } from '../services/api.service';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await homeApi.signIn({ email, password });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        set({
          user: response.user,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
      throw error;
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    set({ loading: true, error: null });
    try {
      const response = await homeApi.signUp({ email, password, username });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        set({
          user: response.user,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await homeApi.getMe();
        set({
          user: response.user,
          isAuthenticated: true,
          loading: false,
        });
      } catch (error) {
        localStorage.removeItem('token');
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } else {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));