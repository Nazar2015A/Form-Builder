import { FC, useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { CustomInstance, TextFieldFormElement } from "./TextField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { cn } from "../../../lib/utils";

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
  const [value, setValue] = useState<string>(defaultValue || "");
  const [error, setError] = useState<boolean>(false);

  const element = elementInstance as CustomInstance;
  const { helperText, label, placeholder, required } = element.extraAttributes;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!submitValue) return;
    const valid = TextFieldFormElement.validate(element, event.target.value);
    setError(!valid);
    if (!valid) return;
    submitValue(element.id, event.target.value);
  };
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  return (
    <div className="flex flex-col gap-2 w-full px-2 py-4 rounded-md">
      <Label className={cn(error && "text-red-500")}>
        {label} {required ? "*" : null}
      </Label>
      <Input
        className={cn(error && "text-red-500")}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlurChange}
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
