import { FC } from "react";
import { CustomInstance } from "./TitleField";
import {
  FormElementInstance,
} from "../../FormElements/FormElements";

interface Props {
  elementInstance: FormElementInstance;
}

const FormComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return <p className="text-xl">{title}</p>;
};

export default FormComponent;
