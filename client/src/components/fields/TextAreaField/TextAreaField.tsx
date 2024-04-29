import { BsTextareaResize } from "react-icons/bs";
import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";

const type: ElementsType = "TextAreaField";
const extraAttributes = {
  label: "Text area",
  helperText: "Helper text",
  placeholder: "Value here...",
  required: false,
  rows: 3,
};
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.number().min(1).max(10),
});
export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTextareaResize,
    label: "TextArea Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};
