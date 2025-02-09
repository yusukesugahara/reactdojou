// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
  user: { email: string; name: string } | null;
  token: string | null;
  setUser: (user: { email: string; name: string } | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearAuth: () => set({ user: null, token: null }),
}));
