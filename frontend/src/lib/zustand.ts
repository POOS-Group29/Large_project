import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
  user: {
    _id: string | number;
    email: string;
    name: string;
    isAdmin: boolean;
  } | null;
  setUser: (user: AuthStore["user"]) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }),
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
