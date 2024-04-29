import { FC, useRef, useState } from "react";
import { HiCursorClick } from "react-icons/hi";
import {
  FormElementInstance,
  FormElements,
} from "../FormElements/FormElements";
import { Button } from "../ui/button";
import useFormSubmission from "../../hooks/useFormSubmission";
import { toast } from "../ui/use-toast";

interface Props {
  formUrl: string;
  content: FormElementInstance[];
}

const FormSubmit: FC<Props> = ({ formUrl, content }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormElementInstance[]>(content);
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const { submissionForm } = useFormSubmission();

  const handleValidateForm = () => {
    formValues.forEach((field, index) => {
      const actualValue =
        formValues[index].extraAttributes?.title ||
        formValues[index].extraAttributes?.placeholder ||
        "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[index] = true;
      }
    });

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  };

  const submitValue = (id: string, value: string) => {
    setFormValues((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            extraAttributes: {
              ...item.extraAttributes,
              placeholder: value,
            },
          };
        }
        return item;
      });
    });
  };
  const handleSubmit = () => {
    formErrors.current = {};
    const validForm = handleValidateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }
    const valueToSubmit = formValues
      .filter(
        (item) => item.type !== "SeparatorField" && item.type !== "SpacerField"
      )
      .map((item) => ({
        id: item.id,
        title: item.extraAttributes?.placeholder || item.extraAttributes?.title,
        type: item.type,
      }));
    submissionForm(formUrl, valueToSubmit);
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <div className="flex justify-center w-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element, index) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues[index].extraAttributes?.title}
            />
          );
        })}
        <Button onClick={handleSubmit} className="w-full mt-8">
          <HiCursorClick className="mr-2 w-4 h-4" /> Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
