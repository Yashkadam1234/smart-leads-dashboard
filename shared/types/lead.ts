export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "lost";

export type LeadSource =
  | "website"
  | "instagram"
  | "referral";

export interface ILead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLeadInput {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  notes?: string;
}

export interface IUpdateLeadInput {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
  notes?: string;
}

export interface ILeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}