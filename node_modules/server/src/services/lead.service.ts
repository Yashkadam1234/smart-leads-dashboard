type FilterQuery<T> = Record<string, any>;

import { LeadModel } from "../models/Lead.model";
import { ApiError } from "../utils/ApiError";

import {
  buildPaginationMeta,
  buildSortQuery,
} from "../utils/pagination";

import type {
  ILeadFilters,
  ICreateLeadInput,
  IUpdateLeadInput,
  UserRole,
} from "../../../shared/types";

import type { ILeadDocument } from "../models/Lead.model";

export class LeadService {
  /**
   * Get all leads
   */
  static async getAllLeads(
    filters: ILeadFilters,
    userId: string,
    userRole: UserRole
  ) {
    const {
      status,
      source,
      search,
      sort = "latest",
      page = 1,
      limit = 10,
    } = filters;

    const query: FilterQuery<ILeadDocument> = {};

    /**
     * RBAC
     * Sales users only see own leads
     */
    if (userRole !== "admin") {
      query.createdBy = userId;
    }

    /**
     * Status filter
     */
    if (status) {
      query.status = status;
    }

    /**
     * Source filter
     */
    if (source) {
      query.source = source;
    }

    /**
     * Search by name/email
     */
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip =
      (Number(page) - 1) *
      Number(limit);

    /**
     * Parallel queries
     */
    const [leads, totalCount] =
      await Promise.all([
        LeadModel.find(query)
          .sort(
            buildSortQuery(sort)
          )
          .skip(skip)
          .limit(Number(limit)),

        LeadModel.countDocuments(
          query
        ),
      ]);

    const pagination =
      buildPaginationMeta(
        totalCount,
        Number(page),
        Number(limit)
      );

    return {
      leads,
      pagination,
    };
  }

  /**
   * Get lead by ID
   */
  static async getLeadById(
    id: string,
    userId: string,
    role: UserRole
  ) {
    const lead =
      await LeadModel.findById(id);

    if (!lead) {
      throw ApiError.notFound(
        "Lead not found"
      );
    }

    const isOwner =
      lead.createdBy.toString() ===
      userId;

    if (
      role !== "admin" &&
      !isOwner
    ) {
      throw ApiError.forbidden(
        "Access denied"
      );
    }

    return lead;
  }

  /**
   * Create lead
   */
  static async createLead(
    input: ICreateLeadInput,
    userId: string
  ) {
    const lead =
      await LeadModel.create({
        ...input,
        createdBy: userId,
      });

    return lead;
  }

  /**
   * Update lead
   */
  static async updateLead(
    id: string,
    input: IUpdateLeadInput,
    userId: string,
    role: UserRole
  ) {
    const lead =
      await LeadModel.findById(id);

    if (!lead) {
      throw ApiError.notFound(
        "Lead not found"
      );
    }

    const isOwner =
      lead.createdBy.toString() ===
      userId;

    if (
      role !== "admin" &&
      !isOwner
    ) {
      throw ApiError.forbidden(
        "You cannot update this lead"
      );
    }

    Object.assign(
      lead,
      input
    );

    await lead.save();

    return lead;
  }

  /**
   * Delete lead
   * Admin only
   */
  static async deleteLead(
    id: string,
    userId: string,
    role: UserRole
  ) {
    const lead =
      await LeadModel.findById(id);

    if (!lead) {
      throw ApiError.notFound(
        "Lead not found"
      );
    }

    if (role !== "admin") {
      throw ApiError.forbidden(
        "Only admins can delete leads"
      );
    }

    await lead.deleteOne();

    return {
      deleted: true,
    };
  }
}