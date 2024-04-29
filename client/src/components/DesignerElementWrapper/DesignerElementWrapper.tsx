import { FC, useState } from "react";
import {
  FormElementInstance,
  FormElements,
} from "../FormElements/FormElements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";
import { BiSolidTrash } from "react-icons/bi";
import { cn } from "../../lib/utils";

interface Props {
  element: FormElementInstance;
}

const DesignerElementWrapper: FC<Props> = ({ element }) => {
  const { deleteElement, setSelectedElement, selectedElement } =
    useFormBuilderContext();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  const handleDeleteElement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteElement(element.id);
  };
  const handleMouseEnter = () => {
    setMouseIsOver(true);
  };
  const handleMouseLeave = () => {
    setMouseIsOver(false);
  };
  const handleSetSelectedElement = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedElement(element);
  };
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(
        "relative rounded-md border border-dashed border-transparent",
        element.id === selectedElement?.id && "border-white"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSetSelectedElement}
    >
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      <DesignerElement elementInstance={element} />
      <div
        ref={topHalf.setNodeRef}
        className="absolute top-0 left-0 right-0 h-1/2"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 left-0 right-0 h-1/2"
      ></div>
      {mouseIsOver ? (
        <div className="absolute top-0 bottom-0 w-full h-full bg-background/50 flex items-center cursor-pointer rounded-md">
          <h2 className="flex-grow select-none h-full text-muted-foreground flex justify-center items-center animate-pulse">
            Click for properties or drag to move
          </h2>
          <Button
            onClick={handleDeleteElement}
            className="p-6 bg-muted rounded-none h-full flex justify-center items-center rounded-tr-md rounded-br-md hover:bg-red-500 transition-all"
          >
            <BiSolidTrash className="w-6 h-6 text-white" />
          </Button>
        </div>
      ) : (
        ""
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  );
};

export default DesignerElementWrapper;
