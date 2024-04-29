import { Form } from "./form.type";

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  profileId: string;
  photo: string | undefined;
  forms: Form[];
};
