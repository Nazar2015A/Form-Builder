import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { CustomInstance } from "./TitleField";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px]">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
};

export default DesignerComponent;
