import { create } from 'zustand';

interface ThemeState {
  theme: 'dark';
  setTheme: (theme: 'dark') => void;
}

export const useThemeStore = create<ThemeState>(() => ({
  theme: 'dark',
  setTheme: () => {
    document.documentElement.classList.add('dark');
  },
}));
