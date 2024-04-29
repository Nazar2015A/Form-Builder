import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import FormElementsSidebar from "../FormElementsSidebar/FormElementsSidebar";
import PropertiesFromSidebar from "../PropertiesFormSidebar/PropertiesFormSidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useFormBuilderContext();
  return (
    <aside className="p-4 bg-background w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted overflow-y-auto h-full">
      {selectedElement ? <PropertiesFromSidebar /> : <FormElementsSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
