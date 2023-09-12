/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { editCell } from '../../common/cellService';

export interface ColumnInfo {
  name: string;
  type: string;
}

export interface EditRowFormProps {
  open: boolean;
  tableName: string;
  setOpen: (open: boolean) => void;
  setOpenStatusModal: Dispatch<SetStateAction<boolean>>;
  setStatusModalMessage: Dispatch<SetStateAction<string>>;
}

export function EditRowForm(props: EditRowFormProps) {
  const { open, tableName, setOpen, setOpenStatusModal, setStatusModalMessage } = props;
  const apiUrl = String(import.meta.env.VITE_PROD_API_URL);

  const [columnDefs, setColumnDefs] = useState<ColumnInfo[]>([]);
  const [columnDefinitionsDoneFetching, setColumnDefinitionsDoneFetching] = useState<boolean>(false);

  // Create a dictionary to store state variables for input fields
  const [inputFieldStates, setInputFieldStates] = useState<Record<string, any>>({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (inputFieldStates.id === null || inputFieldStates.id === undefined || inputFieldStates.id === '') {
      return;
    }

    editCell(`${apiUrl}/executeSqlQuery`, `${tableName}`, columnDefs, inputFieldStates, Number(inputFieldStates.id))
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setOpenStatusModal(true);
        setStatusModalMessage(`Error editing row: ${String(error.message)}`);
      });
  };

  const fetchAndParseColumnDefinitions = async () => {
    try {
      setColumnDefinitionsDoneFetching(false);
      const tableDefsUrl = `${apiUrl}/getTableDetails/${tableName}`;
      const tableDefsResponse = await axios.get(tableDefsUrl);
      const columnNamesAndTypes: ColumnInfo[] = tableDefsResponse.data.map((rawJsonArrayItem: any) => {
        return {
          name: rawJsonArrayItem.column_name,
          type: rawJsonArrayItem.data_type,
        };
      });
      //set row values based on the column names and types we got

      // Initialize state variables for input fields
      const initialInputFieldStates: Record<string, any> = {};
      columnNamesAndTypes.forEach((columnDef) => {
        initialInputFieldStates[columnDef.name] = '';
      });

      setInputFieldStates(initialInputFieldStates);

      setColumnDefs(columnNamesAndTypes);
      setColumnDefinitionsDoneFetching(true);
    } catch (error) {
      console.error('Error fetching and parsing column definitions:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAndParseColumnDefinitions().catch((error) => {
      console.error('Error fetching and parsing column definitions:', error);
    });
  }, [open, tableName]);

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
          {columnDefinitionsDoneFetching &&
            columnDefs.map((columnDef: ColumnInfo, index) => {
              if (columnDef.type === 'character varying' || columnDef.type === 'boolean') {
                return (
                  <TextField
                    key={index}
                    name={columnDef.name}
                    label={columnDef.name}
                    value={inputFieldStates[columnDef.name]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setInputFieldStates({
                        ...inputFieldStates,
                        [columnDef.name]: event.target.value,
                      });
                    }}
                    fullWidth
                    margin='normal'
                  />
                );
              } else if (columnDef.type === 'integer') {
                return (
                  <TextField
                    key={index}
                    name={columnDef.name}
                    label={columnDef.name}
                    type='number'
                    value={inputFieldStates[columnDef.name]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setInputFieldStates({
                        ...inputFieldStates,
                        [columnDef.name]: event.target.value,
                      });
                    }}
                    fullWidth
                    margin='normal'
                  />
                );
              } else if (columnDef.type === 'date') {
                return (
                  <DatePicker
                    key={index}
                    label={columnDef.name}
                    value={inputFieldStates[columnDef.name]}
                    onChange={(newValue) => {
                      setInputFieldStates({
                        ...inputFieldStates,
                        [columnDef.name]: newValue,
                      });
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
