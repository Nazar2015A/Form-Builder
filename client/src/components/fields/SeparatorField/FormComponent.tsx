import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";
import { Separator } from "../../ui/separator";

interface Props {
  elementInstance: FormElementInstance;
}

const FormComponent: FC<Props> = () => {
  return <Separator />;
};

export default FormComponent;
