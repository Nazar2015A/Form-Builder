import { useParams } from "react-router-dom";
import useGetFormById from "../../hooks/useGetFormById";
import FormBuilder from "../../components/FormBuilder/FormBuilder";
import { Status } from "../../types/status.enum";
import { ImSpinner2 } from "react-icons/im";

const Builder = () => {
  const { id } = useParams();
  const { form, status } = useGetFormById(id);
  if (status === Status.IDOL && !form) return null;
  if (status === Status.PENDING && !form) {
    return (
      <div className="w-full flex items-center justify-center">
        <ImSpinner2 className="animate-spin w-8 h-8" />
      </div>
    );
  }
  if (status === Status.ERROR || !form) {
    return (
      <div className="w-full flex items-center justify-center text-red-500">
        Form not found
      </div>
    );
  }

  return <FormBuilder form={form} />;
};

export default Builder;
