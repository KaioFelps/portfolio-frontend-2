"use server";

import { ServerEnv } from "@/config/env/server";
import { ErrorMessages } from "@/core/error-messages";
import type { ExpandedBlogPost } from "@/core/types/presented-entities/expanded-blog-post";
import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";

type FindExpandedBlogPostArgs = {
  slug: string;
};

export async function getPostBySlug({
  slug,
}: FindExpandedBlogPostArgs): Promise<
  ServerResponse<ExpandedBlogPost | null, string>
> {
  const response = await fetch(`${ServerEnv.backendUrl}/post/${slug}/show`);

  if (!response.ok) {
    return MakeServerResponse.error(ErrorMessages.internalError);
  }

  const data: { post: ExpandedBlogPost | null } = await response.json();
  if (!data.post) return MakeServerResponse.success(null);

  const { publishedAt, createdAt, updatedAt, ..._post } = data.post;

  const post = {
    ..._post,
    createdAt: new Date(createdAt),
    publishedAt: publishedAt ? new Date(publishedAt) : null,
    updatedAt: updatedAt ? new Date(updatedAt) : null,
  };

  return MakeServerResponse.success(post);
}
