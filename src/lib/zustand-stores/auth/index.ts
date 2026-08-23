import { create } from "zustand";
import type { LoginUserPreview } from "@/core/types/presented-entities/login-user-preview";
import { UserRole } from "@/core/types/presented-entities/user";

type AuthStore = {
  token: string | null;
  user: LoginUserPreview | null;
  isLoadingAuth: boolean;
  userIsAdmin: () => boolean;
  authEventTick: number;

  setAuth(token: string, user: LoginUserPreview): void;
  removeAuth(): void;
  sinalizeStoppedLoading(): void;
};

export const useAuth = create<AuthStore>(
  (set) =>
    ({
      token: null,
      user: null,
      isLoadingAuth: true,
      authEventTick: Date.now(),

      setAuth(token: string, user: LoginUserPreview) {
        set({ token, user, authEventTick: Date.now() });
      },

      removeAuth() {
        set({ token: null, user: null, authEventTick: Date.now() });
      },

      sinalizeStoppedLoading() {
        set({ isLoadingAuth: false, authEventTick: Date.now() });
      },

      userIsAdmin() {
        return this.user?.role === UserRole.admin;
      },
    }) satisfies AuthStore,
);
