import type { UserRole } from "./user";

export type LoginUserPreview = {
  id: string;
  name: string;
  role: UserRole;
};
