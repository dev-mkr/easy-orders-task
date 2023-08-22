export type BlockType = {
  id: string;
  title: string;
  description: string;
};

type ColumnType = {
  id: string;
  blockIds: string[];
};

export type KanbanDataType = {
  blocks: Record<string, BlockType>;
  columns: Record<string, ColumnType>;
};

export type StoreState = {
  kanbanData: KanbanDataType;
  actions: {
    updateBlockContent: (blockId: string, newBlock: BlockType) => void;
    addNewBlock: (newBlock: BlockType) => void;
    deleteBlock: (blockId: string, columnId: string) => void;
  };
};

export const INITIAL_STATE = {
  blocks: {
    "block-1": { id: "block-1", title: "garbage", description: "Take out the garbage" },
    "block-2": { id: "block-2", title: "show", description: "Watch my favorite show" },
    "block-3": { id: "block-3", title: "charge", description: "Charge my phone" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      blockIds: ["block-3"],
    },
    "column-2": {
      id: "column-2",
      blockIds: ["block-1", "block-2"],
    },
  },
};
