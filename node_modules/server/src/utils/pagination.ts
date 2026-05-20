export type SortType ="asc" | "desc" | "latest";
  

export interface IPaginationMeta {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Build pagination metadata
 */
export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number
): IPaginationMeta => {
  const totalPages = Math.ceil(
    total / limit
  );

  return {
    totalCount: total,
    totalPages,
    currentPage: page,
    limit,
    hasNextPage:
      page < totalPages,
    hasPrevPage:
      page > 1,
  };
};

/**
 * Build sort query
 */
export const buildSortQuery = (
  sort: SortType
): { createdAt: 1 | -1 } => {
  return {
    createdAt:
      sort === "latest"
        ? -1
        : 1,
  };
};