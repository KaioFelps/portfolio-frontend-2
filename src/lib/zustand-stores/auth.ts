import { create } from "zustand";
import type { LoginUserPreview } from "@/core/types/presented-entities/login-user-preview";
import { UserRole } from "@/core/types/presented-entities/user";

type AuthStore = {
  token: string | null;
  user: LoginUserPreview | null;
  isLoadingAuth: boolean;
  userIsAdmin: () => boolean;

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

      setAuth(token: string, user: LoginUserPreview) {
        set({ token, user });
      },

      removeAuth() {
        set({ token: null, user: null });
      },

      sinalizeStoppedLoading() {
        set({ isLoadingAuth: false });
      },

      userIsAdmin() {
        return this.user?.role === UserRole.admin;
      },
    }) satisfies AuthStore,
);
