import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import { cn } from "../../lib/utils";
import DesignerSidebar from "../DesignerSidebar/DesignerSidebar";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "../FormElements/FormElements";
import { generateId } from "../../lib/idGenerator";
import DesignerElementWrapper from "../DesignerElementWrapper/DesignerElementWrapper";

const Designer = () => {
  const {
    elements,
    addElement,
    setElements,
    deleteElement,
    selectedElement,
    setSelectedElement,
  } = useFormBuilderContext();
  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });
  const handleToggleSelectedElement = () => {
    if (selectedElement) setSelectedElement(null);
  };
  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      const activeId = active.data.current?.elementId;
      const overId = over.data.current?.elementId;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          generateId()
        );
        const overIndex = elements.findIndex((el) => el.id === overId);
        if (overIndex === -1) {
          addElement(elements.length, newElement);
          return;
        }
        if (isDroppingOverDesignerElementBottomHalf) {
          addElement(overIndex + 1, newElement);
        } else {
          addElement(overIndex, newElement);
        }
        return;
      }
      const isDesignerDropArea = over.data?.current?.isDesignerDropArea;
      if (isDesignerDropArea) {
        const activeIndex = elements.findIndex((el) => el.id === activeId);

        setElements((prev) => {
          const filteredArray = prev.filter((el) => el !== prev[activeIndex]);
          return [...filteredArray, prev[activeIndex]];
        });
        return;
      }
      const isDesignerElement = active.data?.current?.isDesignerElement;
      if (isDesignerElement) {
        const overIndex = elements.findIndex((el) => el.id === overId);
        const replacedElement = elements.find(
          (el) => el.id === activeId
        ) as FormElementInstance;
        deleteElement(activeId);
        if (isDroppingOverDesignerElementBottomHalf) {
          addElement(overIndex + 1, replacedElement);
        } else {
          addElement(overIndex, replacedElement);
        }

        return;
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div onClick={handleToggleSelectedElement} className="p-4 w-full">
        <div
          ref={setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl p-4 flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            isOver && "ring-2 ring-primary"
          )}
        >
          {isOver ? null : elements.length === 0 ? (
            <p className="select-none text-3xl text-muted-foreground flex flex-grow items-center font-bold animate-pulse">
              Drop here
            </p>
          ) : null}
          {elements.length > 0 ? (
            <div className="flex flex-col gap-2 w-full">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
