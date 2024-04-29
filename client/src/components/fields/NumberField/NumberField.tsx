import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";
import { Bs123 } from "react-icons/bs";

const type: ElementsType = "NumberField";
const extraAttributes = {
  label: "Number field",
  helperText: "Helper text",
  placeholder: "0",
  required: false,
};
export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  placeholder: z.string().max(50),
  required: z.boolean().default(false),
});
export type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Bs123,
    label: "Number Field",
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
