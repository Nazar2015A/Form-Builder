import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { toast } from "../components/ui/use-toast";
import useStatus from "./useStatus";
import { FormElementInstance } from "../components/FormElements/FormElements";

const useUpdateFormContent = () => {
  const { status, setPending, setSuccess, setError } = useStatus();
  const updateFormContent = async (
    id: string,
    content: FormElementInstance[]
  ) => {
    setPending();
    try {
      await axios.post(formConsts.updateContent, {
        id,
        content: content,
      });
      setSuccess();
      toast({
        title: "Success",
        description: "Your form has been saved",
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

  return { updateFormContent, status };
};

export default useUpdateFormContent;
