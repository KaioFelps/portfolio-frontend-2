import { generatePathFactory } from "..";
import { fetchLogs } from "./fetch-logs";

export const mountPath = generatePathFactory("log");

export default { fetchLogs };
