import React from "react";
import { TextFieldFormElement } from "../fields/TextField/TextField";
import { TitleFieldFormElement } from "../fields/TitleField/TitleField";
import { CheckBoxField } from "../fields/CheckBoxField/CheckBoxField";
import { DateFieldFormElement } from "../fields/DateField/DateField";
import { NumberFieldFormElement } from "../fields/NumberField/NumberField";
import { ParagraphFieldFormElement } from "../fields/ParagraphField/ParagraphField";
import { SelectFieldFormElement } from "../fields/SelectField/SelectField";
import { SeparatorFieldFormElement } from "../fields/SeparatorField/SeparatorField";
import { SpacerFieldFormElement } from "../fields/SpacerField/SpacerField";
import { SubTitleFieldFormElement } from "../fields/SubTitleField/SubTitleField";
import { TextAreaFieldFormElement } from "../fields/TextAreaField/TextAreaField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "CheckBoxField"
  | "DateField"
  | "NumberField"
  | "ParagraphField"
  | "SelectField"
  | "SeparatorField"
  | "SpacerField"
  | "SubTitleField"
  | "TextAreaField";
export type SubmitFunction = (id: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};
type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  CheckBoxField: CheckBoxField,
  DateField: DateFieldFormElement,
  NumberField: NumberFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SelectField: SelectFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
};
