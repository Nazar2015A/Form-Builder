import { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import SidebarBtnElementOverlay from "../SidebarBtnElement/SiderbarBtnElementOverlay";
import { ElementsType, FormElements } from "../FormElements/FormElements";
import { useFormBuilderContext } from "../../hooks/useFormBuilderContext";

const DragOverlayWrapper = () => {
  const { elements } = useFormBuilderContext();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement;
  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    return (
      <DragOverlay>
        <SidebarBtnElementOverlay formElement={FormElements[type]} />
      </DragOverlay>
    );
  }
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      return <DragOverlay>Element not found</DragOverlay>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      return (
        <DragOverlay>
          <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 placeholder-opacity-80">
            <DesignerElementComponent elementInstance={element} />
          </div>
        </DragOverlay>
      );
    }
  }
  return <DragOverlay>No drag item</DragOverlay>;
};

export default DragOverlayWrapper;
