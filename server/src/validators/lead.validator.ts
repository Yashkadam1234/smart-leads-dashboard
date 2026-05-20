import { z } from "zod";

/**
 * Create Lead Schema
 */
export const createLeadSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  status: z
    .enum([
      "new",
      "contacted",
      "qualified",
      "lost",
    ])
    .optional(),

  source: z.enum([
    "website",
    "instagram",
    "referral",
  ]),

  notes: z
    .string()
    .max(
      500,
      "Notes cannot exceed 500 characters"
    )
    .optional(),
});

/**
 * Update Lead Schema (Partial)
 */
export const updateLeadSchema =
  createLeadSchema.partial();

/**
 * Query Params Schema
 */
export const leadQuerySchema =
  z.object({
    status: z
      .enum([
        "new",
        "contacted",
        "qualified",
        "lost",
      ])
      .optional(),

    source: z
      .enum([
        "website",
        "instagram",
        "referral",
      ])
      .optional(),

    search: z
      .string()
      .max(
        100,
        "Search max length is 100"
      )
      .optional(),

    sort: z
      .enum([
        "latest",
        "oldest",
      ])
      .default("latest"),

    page: z.coerce
      .number()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .min(1)
      .max(100)
      .default(10),
  });