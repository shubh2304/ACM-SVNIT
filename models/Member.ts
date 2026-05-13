import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMember extends Document {
  name: string;
  email: string;
  rollNo: string;
  branch: string;
  year: number;
  domains: string[];
  linkedin: string;
  github: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    rollNo: { type: String, default: "" },
    branch: { type: String, default: "" },
    year: { type: Number, default: 1 },
    domains: [{ type: String }],
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);

export default Member;
