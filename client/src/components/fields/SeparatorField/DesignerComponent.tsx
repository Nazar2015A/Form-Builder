import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

interface Props {
  elementInstance: FormElementInstance;
}

const DesignerComponent: FC<Props> = () => {
  return (
    <div className="flex flex-col gap-2 w-full bg-accent/40 px-2 py-4 rounded-md h-[120px] max-h-[120px] justify-center">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
};

export default DesignerComponent;
