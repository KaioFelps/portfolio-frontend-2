import { generatePathFactory } from "..";
import { fetchPosts } from "./fetch-posts";

export const mountPath = generatePathFactory("post");

export default { fetchPosts };
