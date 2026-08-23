import { generatePathFactory } from "..";
import { createTag } from "./create-tag";
import { fetchTags } from "./fetch-tags";

export const mountPath = generatePathFactory("tag");

export default { fetchTags, createTag };
