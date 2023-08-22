import { Dialog, DialogTitle, Stack } from "@mui/material";

export interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
}

function DialogComponent({ onClose, open, children, dialogTitle }: DialogComponentProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <Stack spacing={3} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {children}
      </Stack>
    </Dialog>
  );
}

export default DialogComponent;
