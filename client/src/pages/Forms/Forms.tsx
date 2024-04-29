import { useParams } from "react-router-dom";
import useGetFormById from "../../hooks/useGetFormById";
import { Status } from "../../types/status.enum";
import { ImSpinner2 } from "react-icons/im";
import VisitBtn from "../../components/VisitBtn";
import FormLinkShare from "../../components/FormLinkShare";
import SubmissionsTable from "../../components/SubmissionsTable/SubmissionsTable";

const FormsPage = () => {
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
  return (
    <>
      <div className="py-10 border-b border-muted w-full">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
        <div className="py-4 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center justify-between w-full">
              <FormLinkShare shareUrl={form.shareUrl} />
            </div>
          </div>
        </div>
        <div className="container pt-10">
          <SubmissionsTable form={form} />
        </div>
      </div>
    </>
  );
};

export default FormsPage;
