import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { CustomInstance } from "./TextField";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { helperText, label, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px]">
      <Label>
        {label} {required ? "*" : null}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </div>
  );
};

export default DesignerComponent;
