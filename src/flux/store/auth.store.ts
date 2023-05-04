import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (by: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (payload) => set(() => ({ isAuthenticated: payload })),
  }))
);
