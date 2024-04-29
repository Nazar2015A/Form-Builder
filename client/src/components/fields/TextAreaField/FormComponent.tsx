import { FC, useEffect, useState } from "react";
import { CustomInstance, TextAreaFieldFormElement } from "./TextAreaField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import { Textarea } from "../../ui/textarea";

interface Props {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}

const FormComponent: FC<Props> = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}) => {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  const handleChangeBlur = (
    e: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    if (!submitValue) return;
    const valid = TextAreaFieldFormElement.validate(element, e.target.value);
    setError(!valid);
    if (!valid) return;
    submitValue(element.id, e.target.value);
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeholder, helperText, rows } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        className={cn(error && "border-red-500")}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleChangeBlur}
        value={value}
      />
      {helperText ? (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default FormComponent;
