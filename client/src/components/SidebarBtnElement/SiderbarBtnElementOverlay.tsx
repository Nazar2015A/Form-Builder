import { FC } from "react";
import { FormElement } from "../FormElements/FormElements";
import { Button } from "../ui/button";

interface Props {
  formElement: FormElement;
}

const SidebarBtnElementOverlay: FC<Props> = ({ formElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      variant="outline"
      className={"flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElementOverlay;
