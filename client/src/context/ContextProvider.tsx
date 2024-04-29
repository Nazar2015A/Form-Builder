import { FC, PropsWithChildren, useState } from "react";
import { User } from "../types/user.type";
import { FormBuilderContext } from "../hooks/useFormBuilderContext";
import { FormBuilderType } from "../types/form-builder.type";
import { FormElementInstance } from "../components/FormElements/FormElements";

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElement = [...prev];
      newElement.splice(index, 0, element);
      return newElement;
    });
  };

  const deleteElement = (elementId: string) => {
    setElements((prev) => prev.filter((item) => item.id !== elementId));
  };
  const updateSelectedElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  const kanbanContextValue: FormBuilderType = {
    user,
    setUser,
    elements,
    setElements,
    addElement,
    deleteElement,
    selectedElement,
    setSelectedElement,
    updateSelectedElement,
  };

  return (
    <FormBuilderContext.Provider value={kanbanContextValue}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export default ContextProvider;
