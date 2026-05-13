import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  type: "Hackathon" | "Workshop" | "Talk" | "Competition" | "Social";
  domains: string[];
  coverImage: string;
  galleryImages: string[];
  speakers: Array<{
    name: string;
    bio: string;
    photo: string;
    designation: string;
  }>;
  registrations: Array<{
    name: string;
    email: string;
    rollNo: string;
    branch: string;
    year: number;
    registeredAt: Date;
  }>;
  isPast: boolean;
  isRegistrationOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, default: "" },
    type: {
      type: String,
      enum: ["Hackathon", "Workshop", "Talk", "Competition", "Social"],
      default: "Workshop",
    },
    domains: [{ type: String }],
    coverImage: { type: String, default: "" },
    galleryImages: [{ type: String }],
    speakers: [
      {
        name: String,
        bio: String,
        photo: String,
        designation: String,
      },
    ],
    registrations: [
      {
        name: String,
        email: String,
        rollNo: String,
        branch: String,
        year: Number,
        registeredAt: { type: Date, default: Date.now },
      },
    ],
    isPast: { type: Boolean, default: false },
    isRegistrationOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
