import { Schema, model, Document, Types } from "mongoose";

/**
 * Base Lead type (no _id here — Mongoose adds it)
 */
export interface ILead {
  name: string;
  email: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: "website" | "instagram" | "referral";
  createdBy: Types.ObjectId;   // <-- MUST be ObjectId
  notes?: string | null;
}

/**
 * Lead Document type (Mongoose adds _id, createdAt, updatedAt)
 */
export interface ILeadDocument extends ILead, Document {
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, lowercase: true, trim: true },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["website", "instagram", "referral"],
      required: true,
    },

    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: { type: String, maxlength: 500 },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexes
 */
leadSchema.index({ status: 1, source: 1 });
leadSchema.index({ name: "text", email: "text" });

/**
 * Virtual id (string)
 */
leadSchema.virtual("id").get(function () {
  return this._id.toString();
});

/**
 * toJSON transform — convert _id → id (string)
 */
leadSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const LeadModel = model<ILeadDocument>("Lead", leadSchema);
