import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { BlogPost } from "@/core/types/presented-entities/blog-post";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FetchPostsResponse = PaginatedResponse<{
  posts: BlogPost[];
}>;

type ErrorBody = {
  validationMessages?: string[];
  message?: string;
};

export type FetchPostsErrorResponse = ErrorResponse<ErrorBody>;

export type FetchPostsParams = {
  tagId?: string;
  containingTitle?: string;
  page?: number;
};

export async function fetchPosts({
  containingTitle,
  tagId,
  page,
}: FetchPostsParams = {}): Promise<FetchPostsResponse> {
  try {
    const params: Record<string, unknown> = {};
    if (tagId) params.tag = tagId;
    if (containingTitle) params.title = containingTitle;
    if (page) params.page = page;

    const response = await axios.get<FetchPostsResponse>(
      mountPath("list/admin"),
      {
        params,
      },
    );

    const data = response.data;

    data.posts = data.posts.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt)
        : post.publishedAt,
    }));

    return data;
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as { message: string[] };
        throw MakeServerResponse.error<ErrorBody>({
          validationMessages: message,
        });
      }
      case 401:
        throw MakeServerResponse.error<ErrorBody>({
          message: "Não autorizado.",
        });
      default:
        console.error(
          `Falha ao buscar listagem de posts no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
