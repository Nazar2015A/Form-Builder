import { FC } from "react";
import { HiSaveAs } from "react-icons/hi";
import { useFormBuilderContext } from "../hooks/useFormBuilderContext";
import { Button } from "./ui/button";
import useUpdateFormContent from "../hooks/useUpdateFormContent";
import { Status } from "../types/status.enum";
import { FaSpinner } from "react-icons/fa";

interface Props {
  formId: string;
}

const SaveFormBtn: FC<Props> = ({ formId }) => {
  const { updateFormContent, status } = useUpdateFormContent();
  const { elements } = useFormBuilderContext();

  const handleUpdateFormContent = () => {
    updateFormContent(formId, elements);
  };
  return (
    <Button
      onClick={handleUpdateFormContent}
      variant="outline"
      className="gap-2"
    >
      <HiSaveAs className="h-4 w-4" />
      {status === Status.PENDING ? (
        <FaSpinner className="w-4 h-4 animate-spin" />
      ) : (
        "Save"
      )}
    </Button>
  );
};

export default SaveFormBtn;
