import { FormElementInstance } from "../components/FormElements/FormElements";
import { User } from "./user.type";

export type FormBuilderType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  elements: FormElementInstance[];
  setElements: React.Dispatch<React.SetStateAction<FormElementInstance[]>>;
  addElement: (index: number, element: FormElementInstance) => void;
  deleteElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<FormElementInstance | null>
  >;
  updateSelectedElement: (id: string, element: FormElementInstance) => void;
};
