import { FC } from "react";
import { CustomInstance } from "./ParagraphField";
import {
  FormElementInstance,
} from "../../FormElements/FormElements";

interface Props {
  elementInstance: FormElementInstance;
}

const FormComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return <p className="text-muted-foreground">{title}</p>;
};

export default FormComponent;
