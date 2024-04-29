import { FC } from "react";
import { FormElementInstance } from "../../FormElements/FormElements";

interface Props {
  elementInstance: FormElementInstance;
}

const PropertiesComponent: FC<Props> = () => {
  return <p>No properties for this element</p>;
};

export default PropertiesComponent;
