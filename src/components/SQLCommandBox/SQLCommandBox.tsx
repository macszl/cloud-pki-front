/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { sendSQLCommand } from '../../common/cellService';

export interface SQLCommandBoxProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenStatusModal: Dispatch<SetStateAction<boolean>>;
  setStatusModalMessage: Dispatch<SetStateAction<string>>;
}

export function SQLCommandBox(props: SQLCommandBoxProps) {
  const { open, setOpen, setOpenStatusModal, setStatusModalMessage } = props;
  const apiUrl = String(import.meta.env.VITE_PROD_API_URL);

  // Create a dictionary to store state variables for input fields
  const [inputFieldState, setInputFieldState] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (inputFieldState === null || inputFieldState === undefined || inputFieldState === '') {
      return;
    }

    sendSQLCommand(`${apiUrl}/executeSqlQuery`, inputFieldState)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setOpenStatusModal(true);
        setStatusModalMessage(`Error executing SQL query: ${String(error.message)}`);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <DialogTitle> {'Edit row'}</DialogTitle>
        <DialogContent>
          <TextField
            name='SQL Command'
            label='SQL Command'
            value={inputFieldState}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setInputFieldState(event.target.value);
            }}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
