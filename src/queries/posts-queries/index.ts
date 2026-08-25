import { generatePathFactory } from "..";
import { editPost } from "./edit-post";
import { fetchPosts } from "./fetch-posts";
import { findExpandedPost } from "./find-expanded-post";
import { publishPost } from "./publish-post";
import { togglePostVisibility } from "./toggle-post-visibility";

export const mountPath = generatePathFactory("post");

export default {
  fetchPosts,
  togglePostVisibility,
  publishPost,
  findExpandedPost,
  editPost,
};
