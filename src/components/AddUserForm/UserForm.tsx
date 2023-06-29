import { FormEvent, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addCell, editCell } from '../../common/cellService';
import axios from 'axios';

export type UserTableDTO = {
  id: string;
  name: string;
  joined: Date;
  lastVisit: Date;
  counter: number;
  password: string;
};

export interface UserFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditMode: boolean;
  name?: string | null;
  id?: string | null;
  joined?: Date | null;
  lastVisit?: Date | null;
  counter?: number | null;
  password?: string | null;
}

export function UserForm(props: UserFormProps) {
  const { open, isEditMode, setOpen } = props;

  const [userList, setUserList] = useState<UserTableDTO[]>([]);
  const [name, setName] = useState<string>(isEditMode && props.name ? props.name : '');
  const [id, setId] = useState<string>(isEditMode && props.id ? props.id : '');
  const [joined, setJoined] = useState<Date | null>(isEditMode && props.joined ? props.joined : new Date());
  const [lastVisit, setLastVisit] = useState<Date | null>(isEditMode && props.lastVisit ? props.lastVisit : new Date());
  const [counter, setCounter] = useState<number>(isEditMode && props.counter ? props.counter : 0);
  const [password, setPassword] = useState<string>(isEditMode && props.password ? props.password : '');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (joined === null || lastVisit === null) return;

    const formData: UserTableDTO = {
      id: id,
      name: name,
      joined: joined,
      lastVisit: lastVisit,
      counter: counter,
      password: password,
    };

    if (isEditMode) {
      editCell(formData, '/users', Number(formData.id))
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      addCell(formData, '/users')
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
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
    if (userList.length > 0) {
      setId(userList[0].id);
      setName(userList[0].name);
      setCounter(userList[0].counter);
      setPassword(userList[0].password);
    }
  }, [userList]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleCounterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounter(Number(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleIdChangeAutocomplete = (event: React.SyntheticEvent, value: string | null) => {
    void event;
    if (value) {
      setId(value);

      const index = userList.findIndex((user) => user.id == value);
      if (index === -1) {
        return;
      }
      setName(userList[index].name);
      setCounter(userList[index].counter);
      setPassword(userList[index].password);
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
        <DialogTitle> {isEditMode ? 'Edit user' : 'Add user'}</DialogTitle>
        {/* If we're currently in edit mode, we'll want this to select from available IDs */}
        <DialogContent>
          {isEditMode ? (
            <Autocomplete
              id='id'
              options={
                userList
                  ? userList.map((user) => {
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
            name='name'
            label='Name'
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin='normal'
          />
          <DatePicker
            label='Joined'
            value={joined}
            onChange={(newValue) => {
              setJoined(newValue);
            }}
          />
          <DatePicker
            label='Last Visit'
            value={lastVisit}
            onChange={(newValue) => {
              setLastVisit(newValue);
            }}
          />
          <TextField
            name='counter'
            label='Visit Counter'
            type='number'
            value={counter}
            onChange={handleCounterChange}
            fullWidth
            margin='normal'
          />
          <TextField
            name='password'
            label='Password'
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin='normal'
          />
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
