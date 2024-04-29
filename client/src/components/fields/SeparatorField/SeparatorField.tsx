import { RiSeparator } from "react-icons/ri";
import { ElementsType, FormElement } from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};
