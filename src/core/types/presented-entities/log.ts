import type { User } from "./user";

export enum LogAction {
  created = "CREATED",
  updated = "UPDATED",
  deleted = "DELETED",
}

export enum LogTargetType {
  post = "POST",
  project = "PROJECT",
  user = "USER",
  tag = "TAG",
}

export type Log = {
  id: string;
  action: LogAction;
  author: User | null;
  target: string;
  targetType: LogTargetType;
  createdAt: Date;
};
