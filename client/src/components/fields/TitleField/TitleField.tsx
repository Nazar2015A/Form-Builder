import { LuHeading1 } from "react-icons/lu";
import { z } from "zod";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
  } from "../../FormElements/FormElements";
  import DesignerComponent from "./DesignerComponent";
  import PropertiesComponent from "./PropertiesComponent";
  import FormComponent from "./FormComponent";
  
  const type: ElementsType = "TitleField";
  const extraAttributes = {
    title: "Title field",
  };
  export type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };
  export const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
  });
  export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
  export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      extraAttributes,
    }),
    designerBtnElement: {
      icon: LuHeading1,
      label: "Title Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
  };
  