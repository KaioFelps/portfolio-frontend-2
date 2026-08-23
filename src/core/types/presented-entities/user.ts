export enum UserRole {
  admin = "ADMIN",
  editor = "EDITOR",
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};
