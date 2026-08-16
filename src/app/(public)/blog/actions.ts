"use server";

import { constants } from "node:http2";
import { ServerEnv } from "@/config/env";
import { ErrorMessages } from "@/core/error-messages";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { BlogPost } from "@/core/types/presented-entities/blog-post";
import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";

type SuccessResponse = PaginatedResponse<{ posts: BlogPost[] }>;

export type FetchBlogPostsQuery = {
  readonly tag?: string;
  readonly title?: string;
  readonly page?: number;
  readonly amount?: number;
};

type FetchBlogPostsArgs = {
  query?: FetchBlogPostsQuery;
  page?: number;
};

export async function fetchBlogPosts({
  query,
  page,
}: FetchBlogPostsArgs): Promise<ServerResponse<SuccessResponse, string>> {
  let endpoint = `${ServerEnv.backendUrl}/post/list`;

  const queryParams = new URLSearchParams();

  if (page) queryParams.set("page", page.toString());

  if (query) {
    for (const key of ["tag", "title", "page", "amount"] as const) {
      if (query[key]) queryParams.set(key, query[key].toString());
    }
  }

  endpoint += `?${queryParams.toString()}`;
  const response = await fetch(endpoint, { method: "GET" });

  if (response.status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    return MakeServerResponse.error(ErrorMessages.internalError);

  const data: SuccessResponse = await response.json();

  return MakeServerResponse.success(data);
}
