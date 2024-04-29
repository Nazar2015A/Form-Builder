import { FormElementInstance } from "../components/FormElements/FormElements";
import { SubmissionContent } from "./submission.type";

export type Form = {
  _id: string;
  createdAt: Date;
  isPublished: boolean;
  name: string;
  description: string;
  content: FormElementInstance[];
  shareUrl: string;
  submissions: SubmissionContent[]
};
