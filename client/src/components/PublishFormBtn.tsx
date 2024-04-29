import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Status } from "../types/status.enum";
import { FaSpinner } from "react-icons/fa";
import usePublishForm from "../hooks/usePublishForm";
import { FC } from "react";

interface Props {
  formId: string;
}

const PublishFormBtn: FC<Props> = ({ formId }) => {
  const { publishForm, status } = usePublishForm();

  const handlePublishForm = () => {
    publishForm(formId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <MdOutlinePublish className="h-4 w-4" />
          Save
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form <br /> <br />
            <span className="font-medium">
              By publishing this form you will make it availiable to the public
              and you will be able to collect submissions
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublishForm}>
            Proceed{" "}
            {status === Status.PENDING ? (
              <FaSpinner className="w-4 h-4 animate-spin" />
            ) : null}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
