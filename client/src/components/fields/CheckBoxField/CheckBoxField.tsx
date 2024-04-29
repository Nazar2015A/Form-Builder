import { IoMdCheckbox } from "react-icons/io";
import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";

const type: ElementsType = "CheckBoxField";
const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
};
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});
export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
export const CheckBoxField: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: "Checkbox Field",
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
      return currentValue === "true";
    }

    return true;
  },
};
