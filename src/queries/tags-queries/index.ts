import { generatePathFactory } from "..";
import { fetchTags } from "./fetch-tags";

export const mountPath = generatePathFactory("tag");

export default { fetchTags };
