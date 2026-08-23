import { generatePathFactory } from "..";
import { createProject } from "./create-project";
import { deleteProject } from "./delete-project";
import { editProject } from "./edit-project";
import { fetchProjects } from "./fetch-projects";
import { findProject } from "./find-project";

export const mountPath = generatePathFactory("project");

export default {
  fetchProjects,
  deleteProject,
  createProject,
  editProject,
  findProject,
};
