export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: IPaginationMeta;
}

export interface ISelectOption {
  value: string;
  label: string;
}