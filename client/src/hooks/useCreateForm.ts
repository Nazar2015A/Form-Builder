import { useFormBuilderContext } from "./useFormBuilderContext";
import axios from "axios";
import { formConsts } from "../consts/server-consts";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import { ZodResolverType } from "../components/CreateFormBtn";
import { UseFormReturn } from "react-hook-form";
import useGetUser from "./useGetUser";
import useStatus from "./useStatus";

const useCreateForm = () => {
  const { status, setPending, setSuccess, setError } = useStatus();
  const { getUser } = useGetUser();
  const { user } = useFormBuilderContext();
  const navigate = useNavigate();
  const createForm = async (
    values: ZodResolverType,
    form: UseFormReturn<ZodResolverType>
  ) => {
    setPending();
    try {
      const response = await axios.post(formConsts.formSubmit, {
        ...values,
        profileId: user?.profileId,
      });
      form.reset();
      setSuccess();
      toast({
        title: "Success",
        description: "Form create successfully",
      });
      navigate(`/builder/${response.data._id}`);

      getUser();
    } catch (e) {
      setError;
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };

  return { createForm, status };
};

export default useCreateForm;
