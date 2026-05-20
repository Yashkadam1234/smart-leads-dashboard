import mongoose, { Model, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "sales";

  comparePassword(candidate: string): Promise<boolean>;
}

/**
 * Mongoose User document type
 */
export type IUserDocument = HydratedDocument<IUser>;

/**
 * User schema
 */
const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["admin", "sales"],
      default: "sales",
    },
  },
  { timestamps: true }
);

/**
 * Hash password before save
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Find by email
 */
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

/**
 * Export model with correct typing
 */
export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema
);
