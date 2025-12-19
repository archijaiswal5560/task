import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      hydrated: false,

      login: (token) => set({ token, isAuthenticated: true }),
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);
