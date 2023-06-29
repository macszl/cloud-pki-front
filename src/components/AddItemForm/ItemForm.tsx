import { FormEvent, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Switch } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { ItemsTableDTO } from '../TableItems/TableItems.types';
import { CategoriesTableDTO } from '../TableCategories/TableCategories.types';
import { UserTableDTO } from '../TableUser/TableUser.types';
import axios from 'axios';
import { addCell, editCell } from '../../common/cellService';

export interface ItemFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditMode: boolean;
  id?: string;
  itemName?: string;
  category?: CategoriesTableDTO;
  belongsTo?: UserTableDTO;
  isItemReady?: boolean;
}

export function ItemForm(props: ItemFormProps) {
  const { open, setOpen, isEditMode } = props;

  const [categoryList, setCategoryList] = useState<CategoriesTableDTO[]>([]);
  const [userList, setUserList] = useState<UserTableDTO[]>([]);
  const [itemList, setItemList] = useState<ItemsTableDTO[]>([]);
  const [id, setId] = useState<string>(isEditMode && props.id ? props.id : '');
  const [itemName, setName] = useState<string>('');
  const [category, setCategory] = useState<CategoriesTableDTO>();
  const [user, setUser] = useState<UserTableDTO>();
  const [isItemReady, setIsReady] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
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
    axios
      .get(`${import.meta.env.VITE_PROD_API_URL}/users`)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_PROD_API_URL}/items`)
      .then((response) => {
        setItemList(response.data);
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

    if (itemList.length > 0) {
      setId(itemList[0].id);
      setName(itemList[0].itemName);
      setCategory(itemList[0].category);
      setUser(itemList[0].belongsTo);
      setIsReady(itemList[0].isItemReady);
    }
  }, [categoryList, userList, itemList]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const formData: ItemsTableDTO = {
      id: id,
      itemName: itemName,
      category: category,
      belongsTo: user,
      isItemReady: isItemReady,
    } as ItemsTableDTO;

    console.log(formData);

    if (isEditMode) {
      editCell(formData, '/items', Number(id))
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addCell(formData, '/items')
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event: React.SyntheticEvent, value: CategoriesTableDTO | null) => {
    void event;
    if (value) {
      setCategory(value);
    }
  };

  const handleUserChange = (event: React.SyntheticEvent, value: UserTableDTO | null) => {
    void event;
    if (value) {
      setUser(value);
    }
  };

  const handleIdChangeAutocomplete = (event: React.SyntheticEvent, value: string | null) => {
    void event;
    if (value) {
      setId(value);

      const index = itemList.findIndex((user) => user.id == value);
      if (index === -1) {
        return;
      }
      setName(itemList[index].itemName);
      setCategory(itemList[index].category);
      setUser(itemList[index].belongsTo);
      setIsReady(itemList[index].isItemReady);
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
        <DialogTitle>{isEditMode ? 'Edit item' : 'Add item'}</DialogTitle>
        <DialogContent>
          {/* If we're currently in edit mode, we'll want this to select from available IDs */}
          {isEditMode ? (
            <Autocomplete
              id='id'
              options={
                itemList
                  ? itemList.map((user) => {
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
          <TextField
            name='itemName'
            label='itemName'
            value={itemName}
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
          <Switch
            name='isItemReady'
            checked={isItemReady}
            onChange={() => setIsReady(!isItemReady)}
          />
          <label
            htmlFor='isItemReady'
            style={{ fontFamily: 'Roboto', color: 'rgba(0,0,0,0.85)' }}
          >
            Is Ready
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type='submit'
            disabled={!id || !itemName || !category || !user}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
