import { generatePathFactory } from "..";
import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";

export const mountPath = generatePathFactory("auth");

export default {
  login,
  refresh,
  logout,
};
