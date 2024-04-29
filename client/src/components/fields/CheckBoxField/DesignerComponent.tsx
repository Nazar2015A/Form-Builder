import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { CustomInstance } from "./CheckBoxField";
import { Checkbox } from "../../ui/checkbox";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required } = element.extraAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="flex items-center gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px]">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required ? "*" : null}
        </Label>
        {helperText ? (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

export default DesignerComponent;
