import { createContext, useContext } from "react";
import { FormBuilderType } from "../types/form-builder.type";

export const FormBuilderContext = createContext<FormBuilderType | undefined>(
  undefined
);

export const useFormBuilderContext = () => {
  const context = useContext(FormBuilderContext);

  if (context === undefined) {
    throw new Error(
      "useFormBuilderContext must be used with a FormBuilderContext"
    );
  }

  return context;
};
