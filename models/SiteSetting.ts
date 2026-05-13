import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSetting extends Document {
  key: string;
  value: unknown;
}

const SiteSettingSchema = new Schema<ISiteSetting>({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed },
});

const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);

export default SiteSetting;
