import { create } from "zustand";
import { INITIAL_STATE, StoreState } from "./useStore.constant";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(
    immer<StoreState>((set) => ({
      kanbanData: INITIAL_STATE,
      actions: {
        updateBlockContent: (blockId, newBlock) =>
          set((state) => {
            state.kanbanData.blocks[blockId] = newBlock;
          }),
        addNewBlock: (newBlock) =>
          set((state) => {
            state.kanbanData.blocks[newBlock.id] = newBlock;
            state.kanbanData.columns[Object.keys(state.kanbanData.columns)[0]].blockIds.push(
              newBlock.id
            );
          }),
        deleteBlock: (blockId, columnId) =>
          set((state) => {
            console.log("deleteBlock", blockId, columnId);
            delete state.kanbanData.blocks[blockId];
            state.kanbanData.columns[columnId].blockIds = state.kanbanData.columns[
              columnId
            ].blockIds.filter((id) => id !== blockId);
          }),
      },
    }))
  )
);

export default useStore;
