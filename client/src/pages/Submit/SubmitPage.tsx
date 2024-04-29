import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import useGetFormByUrl from "../../hooks/useGetFormByUrl";
import { Status } from "../../types/status.enum";
import FormSubmit from "../../components/FormSubmit/FormSubmit";

const SubmitPage = () => {
  const { url } = useParams();
  const { form, status } = useGetFormByUrl(url);
  if (status === Status.IDOL && !form) return null;
  if (status === Status.PENDING && !form) {
    return (
      <div className="w-full flex items-center justify-center">
        <ImSpinner2 className="animate-spin w-8 h-8" />
      </div>
    );
  }
  if (status === Status.ERROR || !form || !url) {
    return (
      <div className="w-full flex items-center justify-center text-red-500">
        Form not found
      </div>
    );
  }
  return <FormSubmit formUrl={url} content={form.content} />;
};

export default SubmitPage;
