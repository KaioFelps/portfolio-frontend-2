import { generatePathFactory } from "..";
import { fetchProjects } from "./fetch-projects";

export const mountPath = generatePathFactory("project");

export default { fetchProjects };
