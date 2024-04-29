import { RxDropdownMenu } from "react-icons/rx";
import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";

const type: ElementsType = "SelectField";
const extraAttributes = {
  label: "Select field",
  helperText: "Helper text",
  placeholder: "Value here...",
  required: false,
  options: [],
};
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  placeholder: z.string().max(50),
  required: z.boolean().default(false),
  options: z.array(z.string()).default([]),
});
export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Select field",
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
