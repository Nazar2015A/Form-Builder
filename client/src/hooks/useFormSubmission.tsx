import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { toast } from "../components/ui/use-toast";
import useStatus from "./useStatus";
import { Submission } from "../types/submission.type";

const useFormSubmission = () => {
  const { status, setPending, setSuccess, setError } = useStatus();
  const submissionForm = async (
    formUrl: string,
    content: Submission[]
  ) => {
    setPending();
    try {
      await axios.post(formConsts.formSubmission, {
        formUrl,
        content,
      });
      setSuccess();
      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
    } catch (e) {
      setError();
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { submissionForm, status };
};

export default useFormSubmission;
