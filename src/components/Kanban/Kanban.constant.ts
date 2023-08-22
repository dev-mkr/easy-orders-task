import useStore from "@/store/useStore/useStore";
import { produce } from "immer";
import { DropResult } from "react-beautiful-dnd";

export const onDragEnd = (result: DropResult) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  useStore.setState((prevState) => {
    return produce(prevState, (draft) => {
      const start = draft.kanbanData.columns[source.droppableId];
      const end = draft.kanbanData.columns[destination.droppableId];

      if (start === end) {
        const blockIds = start.blockIds;
        blockIds.splice(source.index, 1);
        blockIds.splice(destination.index, 0, draggableId);
        draft.kanbanData.columns[start.id].blockIds = blockIds;
      } else {
        const startBlockIds = start.blockIds;
        startBlockIds.splice(source.index, 1);
        draft.kanbanData.columns[start.id].blockIds = startBlockIds;

        const endBlockIds = end.blockIds;
        endBlockIds.splice(destination.index, 0, draggableId);
        draft.kanbanData.columns[end.id].blockIds = endBlockIds;
      }
    });
  });
};

// const onDragEnd = (result: DropResult) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;
//     if (destination.droppableId === source.droppableId && destination.index === source.index)
//       return;

//     const start = kanbanData.columns[source.droppableId];
//     const end = kanbanData.columns[destination.droppableId];
//     if (start === end) {
//       const newBlockIds = Array.from(start.blockIds);
//       newBlockIds.splice(source.index, 1);
//       newBlockIds.splice(destination.index, 0, draggableId);
//       const newColumn = {
//         ...start,
//         blockIds: newBlockIds,
//       };
//       const newState = {
//         ...kanbanData,
//         columns: {
//           ...kanbanData.columns,
//           [newColumn.id]: newColumn,
//         },
//       };
//       setKanbanData(newState);
//       return;
//     }

//     const startBlockIds = Array.from(start.blockIds);
//     startBlockIds.splice(source.index, 1);
//     const newStart = {
//       ...start,
//       blockIds: startBlockIds,
//     };
//     const endBlockIds = Array.from(end.blockIds);
//     endBlockIds.splice(destination.index, 0, draggableId);
//     const newEnd = {
//       ...end,
//       blockIds: endBlockIds,
//     };
//     const newState = {
//       ...kanbanData,
//       columns: {
//         ...kanbanData.columns,
//         [newStart.id]: newStart,
//         [newEnd.id]: newEnd,
//       },
//     };
//     setKanbanData(newState);
//   };
