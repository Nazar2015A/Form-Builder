import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import FormCard from "./FormCard/FormCard";

const FormCards = () => {
  const { user } = useFormBuilderContext();
  return user?.forms.map((form) => <FormCard key={form._id} form={form} />);
};

export default FormCards;
