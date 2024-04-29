import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { toast } from "../components/ui/use-toast";
import useStatus from "./useStatus";

const usePublishForm = () => {
  const { status, setPending, setSuccess, setError } = useStatus();
  const publishForm = async (id: string) => {
    setPending();
    try {
      await axios.post(formConsts.formPublish, {
        id,
      });
      setSuccess();
      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
      window.location.reload();
    } catch (e) {
      setError();
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { publishForm, status };
};

export default usePublishForm;
