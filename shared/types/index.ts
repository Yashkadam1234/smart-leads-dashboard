/**
 * Shared TypeScript types for Smart Leads Dashboard
 * Used across both frontend and backend
 */

/* =========================
   USER TYPES
========================= */

/** User roles in the system */
export type UserRole = "admin" | "sales";

/** JWT payload stored in token */
export interface IUserPayload {
  readonly id: string;
  readonly email: string;
  readonly role: UserRole;
}

/** Full User mongoose document */
export interface IUser {
  readonly _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/** Register API input */
export interface IRegisterInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

/** Login API input */
export interface ILoginInput {
  readonly email: string;
  readonly password: string;
}

/** Auth API response */
export interface IAuthResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    user: IUserPayload;
    token: string;
  };
}

/* =========================
   LEAD TYPES
========================= */

/** Lead status options */
export type LeadStatus = "new" | "contacted" | "qualified" | "lost";

/** Lead source options */
export type LeadSource = "website" | "instagram" | "referral";

/** Full Lead mongoose document */
export interface ILead {
  readonly _id: string;
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Create lead request body */
export interface ICreateLeadInput {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly status?: LeadStatus;
  readonly source: LeadSource;
  readonly assignedTo?: string;
  readonly notes?: string;
}

/** Update lead request body (partial) */
export type IUpdateLeadInput = Partial<ICreateLeadInput>;

/** Lead filters for query params */
export interface ILeadFilters {
  readonly status?: LeadStatus;
  readonly source?: LeadSource;
  readonly search?: string;
  readonly sort?: "asc" | "desc";
  readonly page?: number;
  readonly limit?: number;
}

/* =========================
   API RESPONSE TYPES
========================= */

/** Generic API response wrapper */
export interface IApiResponse<T> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
}

/** Paginated API response */
export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  readonly totalPages: number;
  readonly currentPage: number;
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;
}

/** API error response */
export interface IApiError {
  readonly success: false;
  readonly message: string;
  readonly errors?: readonly string[];
}

/* =========================
   FRONTEND UI TYPES
========================= */

/** Table column definition for reusable tables */
export interface ITableColumn<T> {
  readonly key: keyof T | string;
  readonly label: string;
  render?: (row: T) => unknown;
}

/** Select dropdown option */
export interface ISelectOption {
  readonly value: string;
  readonly label: string;
}

/** Global filter state for UI */
export interface IFilterState {
  readonly status?: LeadStatus | "all";
  readonly source?: LeadSource | "all";
  readonly search: string;
  readonly sortBy: "newest" | "oldest";
  readonly page: number;
}

/** Theme mode */
export type ThemeMode = "light" | "dark";