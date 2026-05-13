import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  year: number;
  category: string;
  image: string;
  createdAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    year: { type: Number, required: true },
    category: { type: String, default: "Award" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Achievement: Model<IAchievement> =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);

export default Achievement;
