import useStore from "@/store/useStore/useStore";
import { Button, TextField } from "@mui/material";
import DialogComponent from "@/components/ui/DialogComponent";
import { useState } from "react";
type itemContentType = {
  id: string;
  title: string;
  description: string;
};

//TODO: add validation for empty input and refactor it to form if needed

const AddNewBlock = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemContent, setItemContent] = useState<itemContentType>({
    id: "",
    title: "",
    description: "",
  });
  const { addNewBlock } = useStore((state) => state.actions);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleSaveClick = () => {
    if (itemContent.title === "" || itemContent.description === "") return;
    addNewBlock({ ...itemContent, id: Date.now().toString() });
    handleDialogClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        sx={{ margin: "1rem 1rem 0" }}
      >
        Add new block
      </Button>

      <DialogComponent
        open={isDialogOpen}
        onClose={handleDialogClose}
        dialogTitle="Add a new block"
      >
        <TextField
          label="title"
          autoFocus
          variant="outlined"
          required
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
          required
          onBlur={(event) =>
            setItemContent((prevData) => ({
              ...prevData,
              description: event.target.value,
            }))
          }
        />
        <Button type="button" variant="outlined" color="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </DialogComponent>
    </>
  );
};

export default AddNewBlock;
