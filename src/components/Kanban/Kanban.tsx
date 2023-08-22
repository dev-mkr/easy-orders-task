/** @jsxImportSource @emotion/react */
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ListItem from "./components/ListItem";
import useStore from "@/store/useStore/useStore";
import { onDragEnd } from "./Kanban.constant";
import { kanbanColumnStyle, kanbanStyle } from "./Kanban.style";

function Kanban() {
  const kanbanData = useStore((state) => state.kanbanData);

  const renderedColumns = Object.values(kanbanData.columns).map((column) => {
    const blocks = column.blockIds.map((blockId) => kanbanData.blocks[blockId]);
    return (
      <Droppable droppableId={column.id} key={column.id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} css={kanbanColumnStyle}>
            {blocks.map((block, index) => (
              <ListItem key={block.id} item={block} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section css={kanbanStyle}>{renderedColumns}</section>
    </DragDropContext>
  );
}

export default Kanban;
