import { FC } from "react";
import { CustomInstance } from "./SpacerField";
import { FormElementInstance } from "../../FormElements/FormElements";

interface Props {
  elementInstance: FormElementInstance;
}

const FormComponent: FC<Props> = ({ elementInstance }) => {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return <div className={`w-full h=[${height}px]`}></div>;
};

export default FormComponent;
