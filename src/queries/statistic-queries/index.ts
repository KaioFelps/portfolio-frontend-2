import { generatePathFactory } from "..";
import { fetchStatistics } from "./fetch-statistics";

export const mountPath = generatePathFactory("statistics");

export default { fetchStatistics };
