import { z } from "zod";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
  } from "../../FormElements/FormElements";
  import DesignerComponent from "./DesignerComponent";
  import PropertiesComponent from "./PropertiesComponent";
  import FormComponent from "./FormComponent";
import { BsTextParagraph } from "react-icons/bs";
  
  const type: ElementsType = "ParagraphField";
  const extraAttributes = {
    title: "Text here",
  };
  export type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
  };
  export const propertiesSchema = z.object({
    title: z.string().min(2).max(500),
  });
  export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
  export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
      id,
      type,
      extraAttributes,
    }),
    designerBtnElement: {
      icon: BsTextParagraph,
      label: "Paragraph field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
  };
  