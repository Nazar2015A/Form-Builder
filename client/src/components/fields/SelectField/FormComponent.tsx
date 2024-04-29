import { FC, useEffect, useState } from "react";
import { CustomInstance, SelectFieldFormElement } from "./SelectField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

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

  const handleValueChange = (value: string) => {
    setValue(value);
    if (!submitValue) return;
    const valid = SelectFieldFormElement.validate(element, value);
    setError(!valid);
    submitValue(element.id, value);
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeholder, helperText, options } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required ? "*" : null}
      </Label>
      <Select defaultValue={value} onValueChange={handleValueChange}>
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
