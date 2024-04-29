import { LuSeparatorHorizontal } from "react-icons/lu";
import { z } from "zod";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
  } from "../../FormElements/FormElements";
  import DesignerComponent from "./DesignerComponent";
  import PropertiesComponent from "./PropertiesComponent";
  import FormComponent from "./FormComponent";
  
  const type: ElementsType = "SpacerField";
  const extraAttributes = {
    height: 20
  };
  export type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };
  export const propertiesSchema = z.object({
    height: z.number().min(5).max(200),
  });
  export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
  export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      extraAttributes,
    }),
    designerBtnElement: {
      icon: LuSeparatorHorizontal,
      label: "Spacer field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
  };
  