import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@farms/shared-types';
import { setAccessToken } from '../lib/api';

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        setAccessToken(token);
        set({ user, accessToken: token, isAuthenticated: true });
      },
      logout: () => {
        setAccessToken(null);
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'farms_admin_auth',
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setAccessToken(state.accessToken);
        }
      },
    }
  )
);
