import { generatePathFactory } from "..";
import { login } from "./login";
import { refresh } from "./refresh";

export const mountPath = generatePathFactory("auth");

export default {
  login,
  refresh,
};
