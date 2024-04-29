import { FC, useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import { Form } from "../../types/form.type";
import PreviewDialogBtn from "../PreviewDialogBtn";
import SaveFormBtn from "../SaveFormBtn";
import PublishFormBtn from "../PublishFormBtn";
import Designer from "../Designer/Designer";
import DragOverlayWrapper from "../DragOverlayWrapper/DragOverlayWrapper";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface Props {
  form: Form;
}

const FormBuilder: FC<Props> = ({ form }) => {
  const { setElements } = useFormBuilderContext();
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  useEffect(() => {
    setElements(form.content);
  }, [form, setElements]);

  const sensors = useSensors(pointerSensor);
  if (form.isPublished) {
    const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;
    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      });
    };
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
        />
        <div className="flex flex-col items-center justify-center w-full">
          <div className="max-w-lg">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-18">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button onClick={handleCopyLink} className="mt-2 w-full">
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link to="/" className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link to={`/forms/${form._id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.isPublished ? (
              <>
                <SaveFormBtn formId={form._id} />
                <PublishFormBtn formId={form._id} />
              </>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] darl:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
