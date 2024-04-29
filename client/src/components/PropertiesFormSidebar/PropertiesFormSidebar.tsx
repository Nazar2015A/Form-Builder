import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import { FormElements } from "../FormElements/FormElements";
import { Button } from "../ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "../ui/separator";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useFormBuilderContext();
  const handleRemoveSelectedElement = () => {
    setSelectedElement(null);
  };

  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-md text-foreground/50 font-semibold">Element properties</p>
        <Button
          onClick={handleRemoveSelectedElement}
          size="icon"
          variant="ghost"
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
