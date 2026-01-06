import { Schema, model, Document } from 'mongoose';

export interface ICardTemplate extends Document {
  templateId: string;
  templateName: 'Basic' | 'Freelancer' | 'Executive' | 'Enterprise';
  previewUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
const cardTemplateSchema = new Schema<ICardTemplate>(
  {
    templateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    templateName: {
      type: String,
      required: true,
      enum: ['Basic', 'Freelancer', 'Executive', 'Enterprise'],
    },
    previewUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const CardTemplateModel = model<ICardTemplate>('CardTemplate',cardTemplateSchema);
