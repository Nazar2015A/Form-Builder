import { FC, useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { CustomInstance, CheckBoxField } from "./CheckBoxField";
import {
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements/FormElements";
import { cn } from "../../../lib/utils";
import { Checkbox } from "../../ui/checkbox";

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
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  const [error, setError] = useState(false);

  const element = elementInstance as CustomInstance;
  const { helperText, label, required } = element.extraAttributes;

  const handleCheckedChange = (checked: boolean) => {
    setValue(checked);
    if (!submitValue) return;
    const stringValue = checked ? "true" : "false";
    const valid = CheckBoxField.validate(element, stringValue);
    setError(!valid);
    submitValue(element.id, stringValue);
  };

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={handleCheckedChange}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required ? "*" : null}
        </Label>
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
    </div>
  );
};

export default FormComponent;
