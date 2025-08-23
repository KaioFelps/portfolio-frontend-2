export type PaginatedResponse<EntityListObj> = EntityListObj & {
  totalCount: number;
  page: number;
  perPage: number;
};
