import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { CustomInstance } from "./SpacerField";
import { LuSeparatorHorizontal } from "react-icons/lu";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px] justify-center">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  );
};

export default DesignerComponent;
