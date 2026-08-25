import { generatePathFactory } from "..";
import { fetchPosts } from "./fetch-posts";
import { publishPost } from "./publish-post";
import { togglePostVisibility } from "./toggle-post-visibility";

export const mountPath = generatePathFactory("post");

export default { fetchPosts, togglePostVisibility, publishPost };
