import { FormEvent, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import { CategoriesTableDTO } from '../TableCategories/TableCategories.types';
import { addCell, editCell } from '../../common/cellService';

export interface CategoryFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditMode: boolean;
  id?: string;
  name?: string;
}

export function CategoryForm(props: CategoryFormProps) {
  const { open, setOpen, isEditMode } = props;

  const [categoryList, setCategoryList] = useState<CategoriesTableDTO[]>([]);
  const [name, setName] = useState<string>(isEditMode && props.name ? props.name : '');
  const [id, setId] = useState<string>(isEditMode && props.id ? props.id : '');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const formData: CategoriesTableDTO = {
      id: id,
      name: name,
    };

    if (isEditMode) {
      editCell(formData, '/categories', Number(formData.id))
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    } else {
      addCell(formData, '/categories')
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PROD_API_URL}/categories`)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categoryList.length > 0) {
      setId(categoryList[0].id);
      setName(categoryList[0].name);
    }
  }, [categoryList]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIdChangeAutocomplete = (event: React.SyntheticEvent, value: string | null) => {
    if (value) {
      setId(value);

      const index = categoryList.findIndex((user) => user.id == value);
      if (index === -1) {
        return;
      }

      setName(categoryList[index].name);
    }
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
        <DialogTitle>{isEditMode ? 'Edit category' : 'Add category'}</DialogTitle>
        <DialogContent>
          <TextField
            name='name'
            label='Name'
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin='normal'
          />
          {/* If we're currently in edit mode, we'll want this to select from available IDs */}
          {isEditMode ? (
            <Autocomplete
              id='id'
              options={
                categoryList
                  ? categoryList.map((user) => {
                      return String(user.id);
                    })
                  : []
              } // Provide the options for categories
              getOptionLabel={(option) => {
                return String(option);
              }}
              value={id}
              onChange={handleIdChangeAutocomplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='ID'
                  fullWidth
                  margin='normal'
                />
              )}
            />
          ) : (
            <TextField
              name='id'
              label='ID'
              value={id}
              onChange={handleIdChange}
              fullWidth
              margin='normal'
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
