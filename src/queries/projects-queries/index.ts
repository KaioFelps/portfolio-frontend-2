import { generatePathFactory } from "..";
import { deleteProject } from "./delete-project";
import { fetchProjects } from "./fetch-projects";

export const mountPath = generatePathFactory("project");

export default { fetchProjects, deleteProject };
