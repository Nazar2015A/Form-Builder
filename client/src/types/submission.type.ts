export type Submission = {
  id: string;
  title: string;
  createdAt?: Date;
};
export type SubmissionContent =  Submission & {
  content: Submission[]
}
