import { generatePathFactory } from "..";
import { fetchPosts } from "./fetch-posts";
import { togglePostVisibility } from "./toggle-post-visibility";

export const mountPath = generatePathFactory("post");

export default { fetchPosts, togglePostVisibility };
