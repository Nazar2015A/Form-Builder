import { Schema, model } from "mongoose";
import { MongoSchemaEnum } from "../types/mongo.enums";

const FormSubmittionsModel = new Schema({
  createdAt: { type: Date, default: Date.now },
  content: [
    {
      id: { type: String, required: true },
      title: { type: String },
    },
  ],
});

export default model(MongoSchemaEnum.FormSubmittions, FormSubmittionsModel);
