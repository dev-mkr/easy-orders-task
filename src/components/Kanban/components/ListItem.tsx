/** @jsxImportSource @emotion/react */
import { Draggable } from "react-beautiful-dnd";
import { css } from "@emotion/react";
import { memo, useState } from "react";
import { BlockType } from "@/store/useStore/useStore.constant";
import DialogComponent from "@/components/ui/DialogComponent";
import { Button, TextField } from "@mui/material";
import useStore from "@/store/useStore/useStore";

const listItemStyle = css`
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

type itemContentType = {
  id: string;
  title: string;
  description: string;
};

type ListItemProps = {
  item: BlockType;
  index: number;
  columnId: string;
};

//TODO: refactor dialog content to use form to support enter key save

const ListItem = (props: ListItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemContent, setItemContent] = useState<itemContentType>(props.item);
  const { updateBlockContent, deleteBlock } = useStore((state) => state.actions);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleSaveClick = () => {
    updateBlockContent(props.item.id, itemContent);
    handleDialogClose();
  };
  const handelDeleteBlock = () => {
    deleteBlock(props.item.id, props.columnId);
    handleDialogClose();
  };

  return (
    <>
      <Draggable draggableId={props.item.id} index={props.index}>
        {(provided) => (
          <li
            css={listItemStyle}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleDialogOpen}
          >
            <h4>{props.item.title}</h4>
            <span>{props.item.description}</span>
          </li>
        )}
      </Draggable>
      <DialogComponent open={isDialogOpen} onClose={handleDialogClose} dialogTitle="Edit block">
        <TextField
          label="title"
          autoFocus
          variant="outlined"
          defaultValue={props.item.title}
          onBlur={(event) =>
            setItemContent((prevData) => ({
              ...prevData,
              title: event.target.value,
            }))
          }
        />
        <TextField
          label="description"
          variant="outlined"
          defaultValue={props.item.description}
          onBlur={(event) => {
            setItemContent((prevData) => ({
              ...prevData,
              description: event.target.value,
            }));
          }}
        />
        <Button type="button" variant="outlined" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
        <Button type="button" variant="contained" color="error" onClick={handelDeleteBlock}>
          Delete
        </Button>
      </DialogComponent>
    </>
  );
};

const MemoizedListItem = memo(ListItem);
export default MemoizedListItem;
