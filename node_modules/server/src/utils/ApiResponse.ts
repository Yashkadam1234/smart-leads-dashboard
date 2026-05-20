import { Response } from "express";

interface PaginationMeta {
  totalPages: number;
  currentPage: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export class ApiResponse {
  /**
   * Success response
   */
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Paginated response
   */
  static paginated<T>(
    res: Response,
    data: T,
    pagination: PaginationMeta,
    message = "Success"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
    });
  }

  /**
   * Error response
   */
  static error(
    res: Response,
    message = "Something went wrong",
    statusCode = 400,
    errors?: string[]
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}