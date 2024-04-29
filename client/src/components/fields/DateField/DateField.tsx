import { z } from "zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements/FormElements";
import DesignerComponent from "./DesignerComponent";
import PropertiesComponent from "./PropertiesComponent";
import FormComponent from "./FormComponent";
import { BsFillCalendarDateFill } from "react-icons/bs";

const type: ElementsType = "DateField";
export const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
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
export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: "Date Field",
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
