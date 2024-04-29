import { FC, useEffect, useState } from "react";
import { CustomInstance, NumberFieldFormElement } from "./NumberField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { cn } from "../../../lib/utils";
import { Input } from "../../ui/input";

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

  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!submitValue) return;
    const valid = NumberFieldFormElement.validate(element, e.target.value);
    setError(!valid);
    if (!valid) return;
    submitValue(element.id, e.target.value);
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required ? "*" : null}
      </Label>
      <Input
        type="number"
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
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
