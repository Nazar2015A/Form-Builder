import { Schema, model } from "mongoose";
import { MongoSchemaEnum } from "../types/mongo.enums";

const UserModel = new Schema({
  profileId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: Schema.Types.Mixed },
  forms: [{ type: Schema.Types.ObjectId, ref: MongoSchemaEnum.Form }],
});

export default model(MongoSchemaEnum.User, UserModel);
