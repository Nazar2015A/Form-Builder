import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { MongoSchemaEnum } from "../types/mongo.enums";

export const ContentItemSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  extraAttributes: {
    placeholder: { type: String },
    helperText: { type: String },
    label: { type: String },
    required: { type: Boolean, default: false },
    title: { type: String },
    height: { type: Number },
    rows: { type: Number },
    options: {
      type: [String],
    },
  },
});

const FormModel = new Schema({
  profileId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  content: [ContentItemSchema],
  shareUrl: { type: String, unique: true, default: uuidv4 },
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: MongoSchemaEnum.FormSubmittions,
    },
  ],
});

export default model(MongoSchemaEnum.Form, FormModel);
