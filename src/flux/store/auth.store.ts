import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  setIsAuthenticated: (payload: boolean) => void;
};

export const useAuthStore = create<AuthStore>(
  // @ts-ignore
  devtools((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (payload: boolean) =>
      set({
        isAuthenticated: payload,
      }),
  }))
);
