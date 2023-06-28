import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { CategoriesTableDTO } from '../TableCategories/TableCategories.types';

interface AddCategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoriesTableDTO) => void;
}

export function AddCategoryForm(props: AddCategoryFormProps) {
  const { open, onClose, onSave } = props;
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const handleSubmit = () => {
    const formData: CategoriesTableDTO = {
      id: id,
      name: name,
    };
    axios
      .post(`${import.meta.env.VITE_PROD_API_URL}/categories`, formData)
      .then(() => {
        onSave(formData);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            name='name'
            label='Name'
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='id'
            label='ID'
            value={id}
            onChange={handleIdChange}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type='submit'
            disabled={!name}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
