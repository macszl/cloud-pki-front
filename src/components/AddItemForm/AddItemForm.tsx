import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { ItemsTableDTO } from '../TableItems/TableItems.types';
import { CategoriesTableDTO } from '../TableCategories/TableCategories.types';
import { UserTableDTO } from '../TableUser/TableUser.types';
import axios from 'axios';

interface AddItemFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ItemsTableDTO) => void;
}

export function AddItemForm(props: AddItemFormProps) {
  const { open, onClose } = props;

  const [categoryList, setCategoryList] = useState<CategoriesTableDTO[]>([]);
  const [userList, setUserList] = useState<UserTableDTO[]>([]);
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<CategoriesTableDTO>();
  const [user, setUser] = useState<UserTableDTO>();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PROD_API_URL}/categories`)
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_PROD_API_URL}/users`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categoryList.length > 0) {
      setCategory(categoryList[0]);
    }

    if (userList.length > 0) {
      setUser(userList[0]);
    }
  }, [categoryList, userList]);

  const handleSubmit = () => {
    const formData: ItemsTableDTO = {
      id: id,
      name: name,
      category: category,
      belongsTo: user,
      isReady: isReady,
    } as ItemsTableDTO;
    axios
      .post(`${import.meta.env.VITE_PROD_API_URL}/items`, formData)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    onClose();
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event: React.SyntheticEvent, value: CategoriesTableDTO | null) => {
    if (value) {
      setCategory(value);
    }
  };

  const handleUserChange = (event: React.SyntheticEvent, value: UserTableDTO | null) => {
    if (value) {
      setUser(value);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            name='id'
            label='ID'
            value={id}
            onChange={handleIdChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='name'
            label='Name'
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin='normal'
          />
          <Autocomplete
            id='category-select'
            options={categoryList ? categoryList : []} // Provide the options for categories
            getOptionLabel={(option) => option.name}
            value={category}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Category'
                fullWidth
                margin='normal'
              />
            )}
          />
          <Autocomplete
            id='user-select'
            options={userList ? userList : []} // Provide the options for users
            getOptionLabel={(option) => option.name}
            value={user}
            onChange={handleUserChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Belongs To'
                fullWidth
                margin='normal'
              />
            )}
          />
          <Checkbox
            name='isReady'
            value={isReady}
            onChange={() => setIsReady(!isReady)}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type='submit'
            disabled={!id || !name || !category || !user}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
