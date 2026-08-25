import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import type { ExpandedBlogPost } from "@/core/types/presented-entities/expanded-blog-post";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FindExpandedPostResponse = {
  post: ExpandedBlogPost | null;
};

export type FindExpandedPostErrorResponse = ErrorResponse<string>;

export type FindExpandedPostParams = {
  postSlug: string;
};

export async function findExpandedPost({
  postSlug,
}: FindExpandedPostParams): Promise<FindExpandedPostResponse> {
  try {
    const response = await axios.get<FindExpandedPostResponse>(
      mountPath(`${postSlug}/show`),
    );

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 401:
        throw MakeServerResponse.error("Não autorizado.");
      default:
        console.error(
          `Falha ao buscar o post "${postSlug}" no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
