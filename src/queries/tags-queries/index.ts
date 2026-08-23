import { generatePathFactory } from "..";
import { createTag } from "./create-tag";
import { deleteTag } from "./delete-tag";
import { editTag } from "./edit-tag";
import { fetchTags } from "./fetch-tags";

export const mountPath = generatePathFactory("tag");

export default { fetchTags, createTag, editTag, deleteTag };
