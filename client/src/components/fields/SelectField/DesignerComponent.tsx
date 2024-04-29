import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { CustomInstance } from "./SelectField";
import { Select, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px]">
      <Label>
        {label}
        {required ? "*" : null}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
      {helperText ? (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      ) : null}
    </div>
  );
};

export default DesignerComponent;
